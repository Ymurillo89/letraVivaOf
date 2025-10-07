// src/components/ProductList.tsx
import { For, createSignal, Show } from "solid-js";
import type { ShopifyProduct, ShopifyVariant } from "../../types/shopify";


interface Props {
  products: ShopifyProduct[];
}

export default function ProductList(props: Props) {
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
          <div class="grid lg:grid-cols-2 min-h-screen">
            <div class="bg-teal-dark text-white p-8  flex flex-col justify-between">
                <div class="flex-1 flex flex-col items-center justify-center">
                {/* Main Image and Vinyl */}
                <div class="relative w-full max-w-3xl mb-8">
                  <div class="flex items-center justify-center gap-4">
                  <img
                    src={p.image?.src}
                    alt="Celebration"
                    class="w-full h-auto rounded-lg shadow-2xl"
                    
                  />
                  {/*  <div class="relative w-1/2">
                  <div class="w-full aspect-square rounded-full bg-zinc-900 shadow-2xl flex items-center justify-center">
                  <div class="w-3/4 aspect-square rounded-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                    <div class="w-1/4 aspect-square rounded-full bg-zinc-900" />
                  </div>
                  </div> */}
                  </div>
                </div>
                </div>

              {/* Song Title */}
              <div class="text-center mb-6">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <span class="text-sm">•••</span>
                </div>
                <h2 class="text-2xl font-bold mb-1">Celebra Su Cumpleaños 🎉</h2>
              </div>

              {/* Progress Bar */}
              <div class="w-full max-w-md mb-6">
                {/*    <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                class="w-full [&_[role=slider]]:bg-orange [&_[role=slider]]:border-orange [&_.bg-primary]:bg-orange"
              /> */}
              </div>

              {/* Player Controls */}
              <div class="flex items-center justify-center gap-6 mb-8">
                {/*        <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <Shuffle class="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <SkipBack class="w-6 h-6" />
              </Button>
              <Button size="icon" class="w-14 h-14 rounded-full bg-orange hover:bg-orange/90 text-white">
                <Play class="w-6 h-6 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <SkipForward class="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <Menu class="w-6 h-6" />
              </Button> */}
              </div>
            </div>


          </div>



        )}

      </For>

      <div class="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Music Player */}
        <div class="bg-teal-dark text-white p-8 lg:p-12 flex flex-col justify-between">

          <div class="flex-1 flex flex-col items-center justify-center">
            {/* Main Image and Vinyl */}
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

            {/* Song Title */}
            <div class="text-center mb-6">
              <div class="flex items-center justify-center gap-2 mb-2">
                <span class="text-sm">•••</span>
              </div>
              <h2 class="text-2xl font-bold mb-1">Celebra Su Cumpleaños 🎉</h2>
            </div>

            {/* Progress Bar */}
            <div class="w-full max-w-md mb-6">
              {/*    <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                class="w-full [&_[role=slider]]:bg-orange [&_[role=slider]]:border-orange [&_.bg-primary]:bg-orange"
              /> */}
            </div>

            {/* Player Controls */}
            <div class="flex items-center justify-center gap-6 mb-8">
              {/*        <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <Shuffle class="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <SkipBack class="w-6 h-6" />
              </Button>
              <Button size="icon" class="w-14 h-14 rounded-full bg-orange hover:bg-orange/90 text-white">
                <Play class="w-6 h-6 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <SkipForward class="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" class="text-orange hover:text-orange hover:bg-orange/10">
                <Menu class="w-6 h-6" />
              </Button> */}
            </div>
          </div>

          {/* Theme Thumbnails */}
          <div class="flex items-center justify-center gap-3">
            {/*    {themes.map((theme, index) => (
              <div
                key={index}
                class={`w-16 h-24 ${theme.color} rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
              >
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-10 h-10 rounded-full bg-zinc-900/50 flex items-center justify-center">
                    <div class="w-6 h-6 rounded-full bg-red-700/80" />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div class="bg-white p-8 lg:p-12 overflow-y-auto">
          <div class="max-w-2xl mx-auto">
            {/* Header */}
            <div class="mb-6">
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>🎁</span>
                <span>Paquetes Letra Viva - Elige El Tuyo 🔥</span>
              </div>

              {/* Package Options */}
              <div class="space-y-3 mb-6">
                {/*  {packages.map((pkg, index) => (
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
                ))} */}
              </div>

              {/* Banner */}
              <div class="bg-red-banner text-white text-center py-3 rounded-lg mb-6 font-bold">
                YA ES VIRAL! ¡PIDE TU CANCIÓN AHORA!
              </div>

              {/* Main Title */}
              <h1 class="text-4xl font-bold mb-4 text-balance">Regala una canción personalizada única</h1>

              {/* Rating */}
              <div class="flex items-center gap-2 mb-6">
                <div class="flex">
                  {/*  {[...Array(5)].map((_, i) => (
                    <Star key={i} class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))} */}
                </div>
                <span class="font-bold">4.9/5</span>
                <span class="text-muted-foreground">Basado en 712 Reseñas</span>
              </div>

              {/* Pricing */}
              <div class="flex items-center gap-4 mb-6">
                <span class="text-2xl text-muted-foreground line-through">$179.900,00</span>
                <span class="text-4xl font-bold">$129.900.00</span>
                {/*  <Badge class="bg-teal-dark text-white">Oferta 28%</Badge> */}
              </div>

              {/* Features */}
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-2 text-sm">
                  {/* <Clock class="w-5 h-5 text-orange" /> */}
                  <span>
                    Cupos Limitados Por Día <strong>(Ordena Hoy)</strong>
                  </span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  {/* <Heart class="w-5 h-5 text-pink-500" /> */}
                  <span>
                    100% <strong>Personalizada</strong> Para Ti
                  </span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  {/*  <Mic class="w-5 h-5 text-orange" /> */}
                  <span>
                    Voz Profesional, <strong>Emoción Real</strong>
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              {/*    <Button class="w-full bg-teal-dark hover:bg-teal-dark/90 text-white py-6 text-lg mb-6">
                🎵 Pide tu canción personalizada | Paga al recibir
              </Button> */}

              {/* Additional Options */}
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
                  {/*   <Switch checked={additionalReviews} onCheckedChange={setAdditionalReviews} /> */}
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
                  {/*  <Switch checked={extraSong} onCheckedChange={setExtraSong} /> */}
                </div>
              </div>

              {/* Add to Cart */}
              {/*  <Button class="w-full bg-orange hover:bg-orange/90 text-white py-6 text-lg font-bold">
                AGREGAR AL CARRITO
              </Button>
 */}
              {/* Testimonial */}
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
                      {/*   {[...Array(5)].map((_, i) => (
                        <Star key={i} class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))} */}
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
