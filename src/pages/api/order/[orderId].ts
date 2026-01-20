import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  try {
    // 1️⃣ Validar orderId
    const orderId = params.orderId;
    if (!orderId) {
      return new Response(
        JSON.stringify({ message: "orderId es requerido" }),
        { status: 400 }
      );
    }

    // 2️⃣ Validar variables de entorno
    const token = import.meta.env.SHOPIFY_ADMIN_TOKEN;
    const shop = "shop.letravivaoficial.com";

    if (!token) {
      return new Response(
        JSON.stringify({ message: "SHOPIFY_ADMIN_TOKEN no configurado" }),
        { status: 500 }
      );
    }

    // 3️⃣ Obtener pedido
    const orderRes = await fetch(
      `https://${shop}/admin/api/2024-01/orders/${orderId}.json?fields=financial_status,line_items`,
      {
        headers: {
          "X-Shopify-Access-Token": token,
        },
      }
    );

    if (!orderRes.ok) {
      const text = await orderRes.text();
      return new Response(
        JSON.stringify({
          message: "Error obteniendo el pedido desde Shopify",
          status: orderRes.status,
          detail: text,
        }),
        { status: orderRes.status }
      );
    }

    const orderData = await orderRes.json();

    // 4️⃣ Validar estructura del pedido
    if (!orderData?.order) {
      return new Response(
        JSON.stringify({ message: "Pedido no encontrado" }),
        { status: 404 }
      );
    }

    // 5️⃣ Obtener metafields
    const metaRes = await fetch(
      `https://${shop}/admin/api/2024-01/orders/${orderId}/metafields.json`,
      {
        headers: {
          "X-Shopify-Access-Token": token,
        },
      }
    );

    if (!metaRes.ok) {
      const text = await metaRes.text();
      return new Response(
        JSON.stringify({
          message: "Error obteniendo metafields",
          status: metaRes.status,
          detail: text,
        }),
        { status: metaRes.status }
      );
    }

    const metaData = await metaRes.json();

    // 6️⃣ Procesar metafields de forma segura
    const metafields =
      Array.isArray(metaData?.metafields)
        ? Object.fromEntries(
            metaData.metafields.map((m: any) => [m.key, m.value])
          )
        : {};

    // 7️⃣ Respuesta exitosa
    return new Response(
      JSON.stringify({
        paid: orderData.order.financial_status ?? null,
        package: orderData.order.line_items?.[0]?.variant_title ?? null,
        metafields,
      }),
      { status: 200 }
    );

  } catch (error: any) {
    // 8️⃣ Catch global
    console.error("Error en GET /order:", error);

    return new Response(
      JSON.stringify({
        message: "Error interno del servidor",
        error: error?.message ?? "Unknown error",
      }),
      { status: 500 }
    );
  }
};
