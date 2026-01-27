import type { APIRoute } from 'astro';

const SHOP_API_VERSION = '2025-01';
const SHOP_DOMAIN = 'vjvdwh-gf.myshopify.com'; 
const FALLBACK_EMAIL = 'pagos@letravivaoficial.com';

export const POST: APIRoute = async ({ params, request }) => {
  const { orderId } = params;
  const adminToken = import.meta.env.SHOPIFY_ADMIN_TOKEN;
  const origin = new URL(request.url).origin;
  const returnUrl = `${origin}/card/${orderId}`;
  
  if (!orderId || !adminToken) {
    return new Response(JSON.stringify({ error: 'Faltan datos' }), { 
      status: 400, headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    // 1. Obtener orden original
    const orderRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/orders/${orderId}.json`, {
      headers: shopifyHeaders(adminToken)
    });
    const { order } = await orderRes.json();

    if (order.financial_status === 'paid') {
      return new Response(JSON.stringify({ error: 'Orden ya pagada.' }), { 
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Recuperar Metacampos y crear respaldo
    let metafields = [];
    try {
      const metaRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/orders/${orderId}/metafields.json`, {
        headers: shopifyHeaders(adminToken)
      });
      const metaJson = await metaRes.json();
      metafields = metaJson.metafields || [];
    } catch (e) { console.log("Sin metacampos"); }

    const backupAttributes = metafields.map((m: any) => ({
      name: `meta_${m.key}`, value: String(m.value)
    }));
    
    // 3. ESTRATEGIA DE TAGS (Más segura que la nota)
    // Tomamos los tags existentes y le pegamos el nuestro
    const existingTags = order.tags || "";
    // Creamos la etiqueta maestra: "OldID:12345"
    const newTags = `${existingTags}, OldID:${order.id}`;

    const payload = {
      draft_order: {
        line_items: order.line_items.map((i: any) => ({
          variant_id: i.variant_id, quantity: i.quantity, properties: i.properties
        })),
        email: order.email || FALLBACK_EMAIL,
        note: `Pago Web ${Date.now()} - Ref: ${order.name}`, // La nota ya queda limpia
        tags: newTags, // <--- AQUÍ VA LA ETIQUETA DE RASTREO
        note_attributes: [...(order.note_attributes || []), ...backupAttributes],
        metafields: metafields.map((m: any) => ({
          namespace: m.namespace, key: m.key, value: m.value, type: m.type
        })),
        shipping_address: order.shipping_address,
        billing_address: order.billing_address || order.shipping_address
      }
    };

    // Crear Draft
    const createRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/draft_orders.json`, {
      method: 'POST', headers: shopifyHeaders(adminToken), body: JSON.stringify(payload)
    });
    const createJson = await createRes.json();
    const newDraft = createJson.draft_order;

    if (!newDraft?.id) throw new Error("Error creando borrador");

    // Activar Factura
    await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/draft_orders/${newDraft.id}/send_invoice.json`, {
      method: 'POST', headers: shopifyHeaders(adminToken),
      body: JSON.stringify({ draft_order_invoice: { to: payload.draft_order.email } })
    });

    // Obtener URL final
    await new Promise(r => setTimeout(r, 1500));
    const finalRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/draft_orders/${newDraft.id}.json`, {
      headers: shopifyHeaders(adminToken)
    });
    const finalJson = await finalRes.json();
    
    return new Response(JSON.stringify({
      success: true,
      checkoutUrl: `${finalJson.draft_order?.invoice_url}?return_url=${encodeURIComponent(returnUrl)}`,
      draftOrderId: newDraft.id
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, headers: { 'Content-Type': 'application/json' } 
    });
  }
};

function shopifyHeaders(token: string) {
  return { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' };
}