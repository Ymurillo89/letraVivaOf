import type { ShopifyVariantResponse, ShopifyVariant } from "../types/shopify";

const SHOP_DOMAIN = import.meta.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = import.meta.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2025-01";

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  throw new Error("Faltan variables de entorno: SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN");
}

console.log("Shop Domain:", SHOP_DOMAIN);
console.log("Admin Token:", ADMIN_TOKEN);


export async function fetchProductVariants(productId: string): Promise<ShopifyVariant[]> {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/products/${productId}/variants.json`;
debugger;
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
