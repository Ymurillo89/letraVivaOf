import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const orderId = params.id;
  const token = import.meta.env.SHOPIFY_ADMIN_TOKEN;
  const shop = "shop.letravivaoficial.com";

  // Pedido
  const orderRes = await fetch(
    `https://${shop}/admin/api/2024-01/orders/${orderId}.json?fields=financial_status,line_items`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    }
  );

  const orderData = await orderRes.json();

  // Metafields
  const metaRes = await fetch(
    `https://${shop}/admin/api/2024-01/orders/${orderId}/metafields.json`,
    {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    }
  );

  const metaData = await metaRes.json();

  const metafields = Object.fromEntries(
    metaData.metafields.map((m: any) => [m.key, m.value])
  );

  return new Response(
    JSON.stringify({
      paid: orderData.order.financial_status,
      package: orderData.order.line_items[0]?.variant_title,
      metafields,
    }),
    { status: 200 }
  );
};
