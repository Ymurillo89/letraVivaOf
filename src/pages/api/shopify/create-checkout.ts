// src/pages/api/shopify/create-checkout.ts
export const prerender = false;

import type { APIRoute } from 'astro';

// src/pages/api/shopify/create-checkout.ts

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const orderData = JSON.parse(body);
    
    // Obtener la URL de origen desde el request
    const origin = new URL(request.url).origin;
    
    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: orderData.line_items.map((item: any) => ({
          merchandiseId: `gid://shopify/ProductVariant/${item.variant_id}`,
          quantity: item.quantity
        })),
        attributes: [
          ...(orderData.note_attributes?.map((attr: any) => ({
            key: attr.name,
            value: attr.value
          })) || []),
          // Agregar URL de retorno como atributo
          {
            key: '_return_url',
            value: `${origin}/gracias`  // o la página que quieras
          }
        ],
        note: orderData.note || '',
        buyerIdentity: {
          email: orderData.customer?.email || '1@letraviva.com',
          phone: orderData.customer?.phone || '3132948434',
          countryCode: 'CO'
        }
      }
    };

    const response = await fetch(
      `https://${import.meta.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': import.meta.env.SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: mutation, variables })
      }
    );

    const result = await response.json();
    const cart = result.data?.cartCreate?.cart;

    if (!cart || !cart.checkoutUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se pudo obtener la URL del checkout'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Agregar parámetros de retorno a la URL del checkout
    const checkoutUrl = new URL(cart.checkoutUrl);
    checkoutUrl.searchParams.set('return_to', `${origin}/gracias`);
    
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: checkoutUrl.toString(),
        cartId: cart.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en create-checkout:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Error al crear el checkout'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};