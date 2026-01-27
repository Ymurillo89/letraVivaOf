import type { APIRoute } from 'astro';

const SHOP_API_VERSION = '2025-01';
const SHOP_DOMAIN = 'vjvdwh-gf.myshopify.com';

export const GET: APIRoute = async ({ params }) => {
  const { orderId } = params;
  const adminToken = import.meta.env.SHOPIFY_ADMIN_TOKEN;

  if (!orderId || !adminToken) {
    return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
  }

  try {
    // =================================================================
    // PASO 1: INTENTO DE REDIRECCIÓN (BUSCAR POR ETIQUETA)
    // =================================================================
    debugger
    try {
      const graphQLUrl = `https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/graphql.json`;
      const query = `
        {
          orders(first: 5, sortKey: CREATED_AT, reverse: true, query: "tag:'OldID:${orderId}' AND status:open") {
            edges {
              node {
                legacyResourceId
                cancelledAt
              }
            }
          }
        }
      `;

      const graphqlResponse = await fetch(graphQLUrl, {
        method: 'POST', headers: shopifyHeaders(adminToken), body: JSON.stringify({ query })
      });
      const graphqlJson = await graphqlResponse.json();
      const candidates = graphqlJson.data?.orders?.edges || [];

      const validSuccessor = candidates.find((edge: any) => {
        const node = edge.node;
        if (node.legacyResourceId === orderId) return false;
        if (node.cancelledAt) return false;
        return true;
      });

      if (validSuccessor) {
        return new Response(JSON.stringify({
          redirect_to_new_order_id: validSuccessor.node.legacyResourceId
        }), { 
          status: 200, headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (e) { console.log("⚠️ Error no crítico en redirección:", e); }

    // =================================================================
    // PASO 2: CARGA NORMAL (EL ARREGLO ESTÁ AQUÍ)
    // =================================================================
    
    // A) Cargar la Orden
    const orderUrl = `https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/orders/${orderId}.json`;
    const orderRes = await fetch(orderUrl, { headers: shopifyHeaders(adminToken) });   

    if (!orderRes.ok) return new Response(JSON.stringify({ error: 'Pedido no encontrado' }), { status: 404 });
    const { order } = await orderRes.json();

    // B) 🔥 RECUPERAR METACAMPOS NATIVOS (ESTO FALTABA)
    // Es vital para pedidos viejos que no tienen atributos de respaldo
    let rawMetafields: any[] = [];
    try {
      const metaRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/${SHOP_API_VERSION}/orders/${orderId}/metafields.json`, {
        headers: shopifyHeaders(adminToken)
      });
      const metaJson = await metaRes.json();
      rawMetafields = metaJson.metafields || [];
     
    } catch (e) { console.log("No se pudieron cargar metacampos nativos"); }


    // C) FUNCIÓN DE BÚSQUEDA HÍBRIDA (Busca en los 2 lados)
    const getAttr = (key: string) => {
      // 1. Intentar buscar en Atributos de Nota (Respaldo nuevo)
      const attr = order.note_attributes?.find((a: any) => 
        a.name === `meta_${key}` || a.name === key
      );
      if (attr && attr.value) return attr.value;

      // 2. Si falla, buscar en Metacampos Nativos (Sistema viejo/original)
      const meta = rawMetafields.find((m: any) => m.key === key);
      if (meta && meta.value) return meta.value;

      return ""; // No se encontró en ningún lado
    };

     const variantTitle = order.line_items?.[0]?.variant_title ?? "";
    
    let packageName = "standard"; // valor por defecto
    
    if (variantTitle) {
      const lowerTitle = variantTitle.toLowerCase();
      
      if (lowerTitle.includes("premium")) {
        packageName = "premium";
      } else if (lowerTitle.includes("mini")) {
        packageName = "mini";
      } else if (lowerTitle.includes("estándar") || lowerTitle.includes("estandar") || lowerTitle.includes("standard")) {
        packageName = "standard";
      }
    }


    const responseData = {
      paid: order.financial_status === 'paid' ? 'paid' : 'pending',
      packageName: packageName,
      
      metafields: {
        para_quien_es: getAttr('para_quien_es'),
        titulo_cancion: getAttr('titulo_cancion'),
        de_quien_es: getAttr('de_quien_es'),
        dedicatoria_especial: getAttr('dedicatoria_especial'),
        ocasion: getAttr('ocasion'),
        imagen_generica: getAttr('imagen_generica'),
        short_song_url: getAttr('short_song_url') || getAttr('cancion_corta_url'),
        long_song_url: getAttr('long_song_url') || getAttr('cancion_completa_url'),
        targeta_digital_url: getAttr('targeta_digital_url') || getAttr('tarjeta_digital_url'),
        video_url: getAttr('video_url'),
        letra_cancion: getAttr('letra_cancion')
      }
    };

    console.log(order.line_items);

    return new Response(JSON.stringify(responseData), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

function shopifyHeaders(token: string) {
  return { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' };
}