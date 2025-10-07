// src/lib/shopify.server.ts
import type { ShopifyProduct } from "../types/shopify";

const SHOP_DOMAIN = import.meta.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = import.meta.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2025-01"; // o la versión que uses

if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
  throw new Error("Faltan variables de entorno: SHOPIFY_STORE_DOMAIN o SHOPIFY_ADMIN_TOKEN");
}

export async function fetchAdminProducts(): Promise<ShopifyProduct[]> {
  const url = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/products.json`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Admin API error ${res.status}: ${text}`);
  } 
  
  const json = await res.json();
  console.log(json.products[4]);
  return json.products ?? [];
}
