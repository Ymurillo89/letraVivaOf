import type { ShopifyVariantResponse, ShopifyVariant } from "../types/shopify";

const SHOP_DOMAIN = import.meta.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = import.meta.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2025-01";

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  throw new Error("Faltan variables de entorno: SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN");
}

export async function fetchProductVariants(productId: string): Promise<ShopifyVariant[]> {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/products/${productId}/variants.json`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error(`Shopify Admin API error ${res.status}: ${await res.text()}`);
  }

  const json: ShopifyVariantResponse = await res.json();
  
  return json.variants;
}


export async function createOrder(body: any): Promise<any> {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/orders.json`;
  
  console.log('===== SHOPIFY CREATE ORDER =====');
  console.log('URL:', url);
  console.log('Body recibido:', JSON.stringify(body, null, 2));
  
  const orderData = {
    order: {
      line_items: body.line_items,
      customer: {
        first_name: body.customer.first_name,
        last_name: "-",
        email: body.customer.email || `${body.customer.phone}@letraviva.com`,
        phone: body.customer.phone
      },
      billing_address: {
        first_name: body.customer.first_name,
        last_name: "-",
        address1: body.customer.address || 'Dirección pendiente',
        phone: body.customer.phone,
        city: body.customer.city || 'Ciudad pendiente',
        province: body.customer.province || 'Departamento pendiente',
        country: 'Colombia',
        zip: body.customer.zip || '000000'
      },
      shipping_address: {
        first_name: body.customer.first_name,
        last_name: "-",
        address1: body.customer.address || 'Dirección pendiente',
        phone: body.customer.phone,
        city: body.customer.city || 'Ciudad pendiente',
        province: body.customer.province || 'Departamento pendiente',
        country: 'Colombia',
        zip: body.customer.zip || '000000'
      },
      financial_status: body.financial_status || 'pending',
      note_attributes: body.note_attributes,
      tags: body.tags || 'contra-entrega',
      note: body.note || ''
    }
  };

  console.log('Order data a enviar a Shopify:', JSON.stringify(orderData, null, 2));
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN,
      },
      body: JSON.stringify(orderData),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error('❌ Error de Shopify:', responseText);
      throw new Error(`Shopify API error ${res.status}: ${responseText}`);
    }

    if (!responseText || responseText.trim() === '') {
      throw new Error('Shopify retornó una respuesta vacía');
    }

    let json;
    try {
      json = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Error parseando respuesta de Shopify:', e);
      throw new Error(`Respuesta inválida de Shopify: ${responseText}`);
    }

    return json;
    
  } catch (error) {
    console.error('❌ Error en createOrder:', error);
    throw error;
  }
}