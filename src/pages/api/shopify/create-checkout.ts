/* // src/pages/api/shopify/create-checkout.ts
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Leer el body de la petición
    const body = await request.text();
    const orderData = JSON.parse(body);

    // Construir origen y URL de retorno
    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/?venta=true`;

    // Mutación GraphQL: cartCreate
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

    // Construcción de variables para Shopify
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
          })) || [])
        ],

        note: orderData.note || '',

        buyerIdentity: {
          email: orderData.customer?.email || '1@letraviva.com',
          phone: orderData.customer?.phone || '3132948434',
          countryCode: 'CO'
        }
      }
    };

    // Llamado a Shopify Storefront API
    const response = await fetch(
      `https://${import.meta.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token':
            import.meta.env.SHOPIFY_STOREFRONT_TOKEN
        },
        body: JSON.stringify({ query: mutation, variables })
      }
    );

    // Respuesta del API
    const result = await response.json();
    const cart = result.data?.cartCreate?.cart;

    // Validación de checkoutUrl
    if (!cart || !cart.checkoutUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No se pudo obtener la URL del checkout'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Respuesta final
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: cart.checkoutUrl,
        cartId: cart.id,
        returnUrl
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en create-checkout:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Error al crear el checkout'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
 */

// src/pages/api/shopify/create-checkout.ts
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const orderData = JSON.parse(body);

    // Construir URL de retorno
    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/?venta=true`;

    // Mutación GraphQL para crear DraftOrder
    const mutation = `
      mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
            name
            invoiceUrl
            totalPrice
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Construir variables - SIN el campo "customer"
    const variables = {
      input: {
        // Line Items (productos)
        lineItems: orderData.line_items.map((item: any) => ({
          variantId: `gid://shopify/ProductVariant/${item.variant_id}`,
          quantity: item.quantity
        })),
        
        // Email del cliente (Shopify busca o crea el cliente automáticamente)
        email: orderData.customer.email,

        // Dirección de envío
        shippingAddress: {
          firstName: orderData.shipping_address.first_name,
          lastName: orderData.shipping_address.last_name,
          address1: orderData.shipping_address.address1,
          address2: orderData.shipping_address.address2 || '',
          city: orderData.shipping_address.city,
          province: orderData.shipping_address.province,
          country: orderData.shipping_address.country,
          zip: orderData.shipping_address.zip,
          phone: orderData.shipping_address.phone
        },

        // Dirección de facturación
        billingAddress: {
          firstName: orderData.billing_address.first_name,
          lastName: orderData.billing_address.last_name,
          address1: orderData.billing_address.address1,
          address2: orderData.billing_address.address2 || '',
          city: orderData.billing_address.city,
          province: orderData.billing_address.province,
          country: orderData.billing_address.country,
          zip: orderData.billing_address.zip,
          phone: orderData.billing_address.phone
        },

        // Atributos personalizados
        customAttributes: orderData.note_attributes.map((attr: any) => ({
          key: attr.name,
          value: String(attr.value || '')
        })),

        // Nota del pedido
        note: orderData.note || '',

        // Tags para identificar
        tags: ['web', 'letra-viva', 'pago-online']
      }
    };

    // Llamada a Shopify Admin API
    const response = await fetch(
      `https://${import.meta.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': import.meta.env.SHOPIFY_ADMIN_TOKEN
        },
        body: JSON.stringify({ query: mutation, variables })
      }
    );

    const result = await response.json();
   /*  console.log('📥 Respuesta de Shopify:', JSON.stringify(result, null, 2));
 */
    // Verificar errores generales de GraphQL
    if (result.errors) {
      /* console.error('❌ Errores de GraphQL:', result.errors); */
      throw new Error(`Error de GraphQL: ${JSON.stringify(result.errors)}`);
    }

    const draftOrder = result.data?.draftOrderCreate?.draftOrder;
    const userErrors = result.data?.draftOrderCreate?.userErrors;

    // Verificar errores de validación
    if (userErrors && userErrors.length > 0) {
      throw new Error(userErrors.map((e: any) => `${e.field}: ${e.message}`).join(', '));
    }

    // Verificar que se creó el DraftOrder
    if (!draftOrder) {
      throw new Error('No se pudo crear el pedido en Shopify');
    }

    // Verificar que existe el invoiceUrl
    if (!draftOrder.invoiceUrl) {
      throw new Error('No se generó el link de pago. Verifica la configuración de Shopify.');
    }

    // Agregar return_url al invoiceUrl
    const invoiceUrlWithReturn = `${draftOrder.invoiceUrl}?return_url=${encodeURIComponent(returnUrl)}`;
/* 
    console.log('✅ DraftOrder creado:', draftOrder.name);
    console.log('🔗 Invoice URL:', invoiceUrlWithReturn);
 */
    // Respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: invoiceUrlWithReturn,
        orderNumber: draftOrder.name,
        draftOrderId: draftOrder.id,
        status: draftOrder.status,
        totalPrice: draftOrder.totalPrice,
        returnUrl: returnUrl
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    /* console.error('❌ Error en create-checkout:', error); */

    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Error desconocido al crear el pedido',
        error: error instanceof Error ? error.stack : String(error)
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};