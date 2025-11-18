// src/pages/api/shopify/create-order.ts
import type { APIRoute } from 'astro';
import { createOrder } from '../../../lib/shopify.server';

// 🔥 AGREGA ESTA LÍNEA - MUY IMPORTANTE
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('===== INICIO DE PETICIÓN =====');
    
    const body = await request.json(); 
    const response = await createOrder(body);
  
    if (!response || !response.order) {
      throw new Error('Respuesta inválida de Shopify');
    }

    const result = {
      success: true,
      orderId: response.order.id,
      orderNumber: response.order.name,
      checkoutUrl: response.order.order_status_url
    };

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('===== ERROR EN API ROUTE =====');
    console.error('Error completo:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
        error: String(error)
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};