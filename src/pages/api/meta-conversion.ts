import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const pixelId = import.meta.env.META_PIXEL_ID;
    const accessToken = import.meta.env.META_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      return new Response(
        JSON.stringify({ error: "Pixel ID o Access Token no configurados" }),
        { status: 500 }
      );
    }

    // 🔹 Obtener IP REAL del usuario
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") || "127.0.0.1";

    const payload = {
      data: [
        {
          event_name: body.event_name, // "Lead"
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: body.event_source_url,
          event_id: body.event_id,

          user_data: {
            client_ip_address: ip,
            client_user_agent: body.user_agent,
          },

          custom_data: body.custom_data || {},
        },
      ],
      //test_event_code: "TEST36797",
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    // 🔍 Log temporal para depuración
    console.log("META RESPONSE:", result);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("META ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Error enviando evento a Meta" }),
      { status: 500 }
    );
  }
};
