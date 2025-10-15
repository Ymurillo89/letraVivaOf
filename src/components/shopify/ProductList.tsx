// src/components/ProductList.tsx
import { For, createSignal, Show } from "solid-js";
//import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";


/* interface Props {
  products: ShopifyProduct[];
} */

/* export default function ProductList(props: Props) {
  const [selected, setSelected] = createSignal<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = createSignal<ShopifyVariant | null>(null);

  const openProduct = (p: ShopifyProduct) => {
    setSelected(p);
    setSelectedVariant(p.variants?.[0] ?? null);
  };

  return (
    <div class="container mx-auto">
      <For each={props.products}>
        {(p) => (
          <div class="grid lg:grid-cols-2 min-h-screen gap-x-6">

            <div>
              <div class="flex-1 flex flex-col items-center justify-center mb-6">
                <div class="relative w-full  ">
                  <div class="flex items-center justify-center ">
                    <img
                      src={p.image?.src}
                      alt="Celebration"
                      class="w-full h-auto rounded-lg shadow-md" />
                  </div>
                </div>
              </div>
              

       
              <div class="flex items-center justify-center gap-2 mb-8">
                <For each={p.images}>
                  {(image) => (
                    <img
                      src={image.src}
                      alt="Celebration"
                      class=" rounded-lg object-cover h-32 w-32 cursor-pointer hover:scale-110 transition-transform" />
                  )}
                </For>

              </div>
            </div>

            <div class="overflow-y-auto">
              <div class="w-full">
                <div class="mb-6">
                  <div class="flex items-start justify-start  text-sm text-muted-foreground mb-4">
                    <span>🎁</span>
                    <span>Paquetes Letra Viva - Elige El Tuyo 🔥</span>
                  </div>
                </div>
              </div>
              <div class="space-y-3 mb-2">
                <For each={p.variants}>
                  {(variant) => (
                    <div class="p-4 rounded-xl border border-gray-200 hover:border-green-900 hover:bg-green-50 cursor-pointer transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div>
                          <p class="font-medium text-gray-800 text-sm">{variant.title}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>

              <div class="bg-red-700 text-white text-center py-2 rounded-lg font-bold mb-4">
                YA ES VIRAL! ¡PIDE TU CANCIÓN AHORA!
              </div>

              <h1 class="text-4xl font-bold mb-4 text-balance">Regala una canción personalizada única</h1>

              <div class="flex items-center  mb-6">
                <div class="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                  </svg>
                </div>
                <div class="flex me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-yellow-400 text-yellow-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-yellow-400 text-yellow-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-yellow-400 text-yellow-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-yellow-400 text-yellow-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 fill-yellow-400 text-yellow-400"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                
                </div>

                <span class="font-bold">4.9/5</span>
                <span class="text-muted-foreground">Basado en 712 Reseñas</span>
              </div>

            </div>

          </div>
        )}

      </For>

      <div class="grid lg:grid-cols-2 min-h-screen">
    
        <div class=" text-white p-8 lg:p-12 flex flex-col justify-between">

          <div class="flex-1 flex flex-col items-center justify-center">
    
            <div class="relative w-full max-w-md mb-8">
              <div class="flex items-center justify-center gap-4">
                <img src="/birthday-celebration-with-cake-and-friends.jpg" alt="Celebration" class="w-1/2 rounded-lg shadow-2xl" />
                <div class="relative w-1/2">
                  <div class="w-full aspect-square rounded-full bg-zinc-900 shadow-2xl flex items-center justify-center">
                    <div class="w-3/4 aspect-square rounded-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                      <div class="w-1/4 aspect-square rounded-full bg-zinc-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mb-6">
              <div class="flex items-center justify-center gap-2 mb-2">
                <span class="text-sm">•••</span>
              </div>
              <h2 class="text-2xl font-bold mb-1">Celebra Su Cumpleaños 🎉</h2>
            </div>

  
            <div class="w-full max-w-md mb-6">
           
            </div>

       
            <div class="flex items-center justify-center gap-6 mb-8">
             
            </div>
          </div>

          
          <div class="flex items-center justify-center gap-3">
           
          </div>
        </div>

   
        <div class="bg-white p-8 lg:p-12 overflow-y-auto">
          <div class="max-w-2xl mx-auto">
        
            <div class="mb-6">
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>🎁</span>
                <span>Paquetes Letra Viva - Elige El Tuyo 🔥</span>
              </div>

           
              <div class="space-y-3 mb-6">
                
                  <div
                    key={index}
                    class={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      index === 0
                        ? "bg-teal-dark text-white border-teal-dark"
                        : "bg-white border-border hover:border-teal-dark"
                    }`}
                  >
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">{pkg.icon}</span>
                      <div class="flex-1">
                        <h3 class="font-bold text-sm mb-1">
                          {pkg.title} - {pkg.subtitle}
                        </h3>
                        <p class="text-xs opacity-90 mb-2">{pkg.description}</p>
                        <p class="font-bold">{pkg.price}</p>
                      </div>
                    </div>
                  </div>
                
              </div>

             
              <div class="bg-red-700 text-white text-center py-3 rounded-lg mb-6 font-bold">
                YA ES VIRAL! ¡PIDE TU CANCIÓN AHORA!
              </div>

              
              <h1 class="text-4xl font-bold mb-4 text-balance">Regala una canción personalizada única</h1>

              
              <div class="flex items-center gap-2 mb-6">
                <div class="flex">
                  
                </div>
                <span class="font-bold">4.9/5</span>
                <span class="text-muted-foreground">Basado en 712 Reseñas</span>
              </div>

              
              <div class="flex items-center gap-4 mb-6">
                <span class="text-2xl text-muted-foreground line-through">$179.900,00</span>
                <span class="text-4xl font-bold">$129.900.00</span>
                
              </div>

              
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-2 text-sm">
                  
                  <span>
                    Cupos Limitados Por Día <strong>(Ordena Hoy)</strong>
                  </span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span>
                    100% <strong>Personalizada</strong> Para Ti
                  </span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span>
                    Voz Profesional, <strong>Emoción Real</strong>
                  </span>
                </div>
              </div>            
              

              
              <div class="space-y-4 mb-6">
                <div class="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-teal-dark/10 rounded-full flex items-center justify-center">
                      <span class="text-2xl">🔄</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm">🎁 3 revisiones adicionales</p>
                      <p class="text-xs text-muted-foreground">
                        <span class="line-through">$49.900</span>{" "}
                        <span class="text-green-600 font-bold">¡GRATIS!</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-teal-dark/10 rounded-full flex items-center justify-center">
                      <span class="text-2xl">🎵</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm">🎁 Recibe una canción extra</p>
                      <p class="text-xs text-muted-foreground">
                        <span class="line-through">$99.900</span>{" "}
                        <span class="text-green-600 font-bold">¡GRATIS!</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              


                AGREGAR AL CARRITO
              </Button>
 
 
              <div class="mt-8 p-6 bg-muted/30 rounded-lg">
                <div class="flex items-start gap-4">
                  <img src="/happy-customer-profile.jpg" alt="Customer" class="w-12 h-12 rounded-full" />
                  <div class="flex-1">
                    <p class="text-sm mb-2 italic">
                      "Es increíble lo emocionada que estaba mi mamá al escuchar su canción, nunca la había visto así,
                      de verdad gracias por que se nota que lo hacen con el corazón"
                    </p>
                    <p class="text-sm font-semibold">Daniela Montoya R.</p>
                    <div class="flex mt-1">
 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
 */