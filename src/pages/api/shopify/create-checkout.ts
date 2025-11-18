// src/pages/api/shopify/create-checkout.ts

// IMPORTANTE: Marcar como server-rendered
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parsear el body correctamente
    const body = await request.text();
    
    if (!body) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se recibieron datos'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const orderData = JSON.parse(body);

    // Validar que existan los datos necesarios
    if (!orderData.line_items || orderData.line_items.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se especificaron productos'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // GraphQL mutation ACTUALIZADA - Usar cartCreate en lugar de checkoutCreate
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
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
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

    // Preparar las variables con la nueva estructura
    const variables = {
      input: {
        lines: orderData.line_items.map((item: any) => ({
          merchandiseId: `gid://shopify/ProductVariant/${item.variant_id}`,
          quantity: item.quantity
        })),
        attributes: orderData.note_attributes?.map((attr: any) => ({
          key: attr.name,
          value: attr.value
        })) || [],
        note: orderData.note || '',
        // Información del comprador - PRE-LLENAR DATOS DEL CHECKOUT
        buyerIdentity: {
          email: orderData.customer?.email || '',
          phone: orderData.customer?.phone || '',
          countryCode: orderData.customer?.country_code || 'CO',
          // Dirección de envío pre-llenada
          ...(orderData.customer?.address && {
            deliveryAddressPreferences: [{
              deliveryAddress: {
                address1: orderData.customer.address.address1 || '',
                address2: orderData.customer.address.address2 || '',
                city: orderData.customer.address.city || '',
                company: orderData.customer.address.company || '',
                country: orderData.customer.address.country || 'Colombia',
                firstName: orderData.customer.first_name || '',
                lastName: orderData.customer.last_name || '',
                phone: orderData.customer.phone || '',
                province: orderData.customer.address.province || '',
                zip: orderData.customer.address.zip || ''
              }
            }]
          })
        }
      }
    };

    // Obtener variables de entorno
    const storeDomain = import.meta.env.SHOPIFY_STORE_DOMAIN;
    const storefrontToken = import.meta.env.SHOPIFY_STOREFRONT_TOKEN;

    if (!storeDomain || !storefrontToken) {
      console.error('Faltan variables de entorno de Shopify');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error de configuración del servidor'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Hacer la petición a Shopify Storefront API
    const response = await fetch(
      `https://${storeDomain}/api/2025-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        body: JSON.stringify({ 
          query: mutation, 
          variables 
        })
      }
    );

    const result = await response.json();

    // Verificar errores en la respuesta
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return new Response(
        JSON.stringify({
          success: false,
          message: result.errors[0]?.message || 'Error al crear el carrito'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Verificar errores de usuario
    if (result.data?.cartCreate?.userErrors?.length > 0) {
      const userError = result.data.cartCreate.userErrors[0];
      console.error('Cart user error:', userError);
      return new Response(
        JSON.stringify({
          success: false,
          message: userError.message
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const cart = result.data?.cartCreate?.cart;

    if (!cart || !cart.checkoutUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se pudo obtener la URL del checkout'
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Retornar éxito
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: cart.checkoutUrl,
        cartId: cart.id,
        totalPrice: cart.cost?.totalAmount?.amount
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error en create-checkout:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Error al crear el checkout'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};