import Header from "./Header";
import { useEffect, useState } from "react";
import SpecialDedication from "./SpecialDedication";
import YourSong from "./YourSong";
import LyricsSong from "./LyricsSong";
import YourVideo from "./YourVideo";
import DigitalCardSkeleton from "./DigitalCardSkeleton";



export default function MainContent() {
  const [dataMetafieldsKeyValue, setDataMetafieldsKeyValue] = useState<{
    paid: string;
    package: string;
    packageName: string;
    metafields: {
      para_quien_es: string;
      titulo_cancion: string;
      de_quien_es: string;
      dedicatoria_especial: string;
      ocasion: string;
      imagen_generica: string;
      short_song_url: string;
      long_song_url: string;
      targeta_digital_url: string;
      video_url: string;
      letra_cancion: string;
    };
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleOrderId();
  }, []);

  const handleOrderId = async () => {
    try {
      setIsLoading(true);
      setError(null);
       const pathParts = window.location.pathname.split('/');
    const orderId = pathParts[pathParts.length - 1]; // Obtiene el último segmento
    

      if (!orderId) {
        setError("No se proporcionó un ID de orden válido");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/order/${orderId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          `Error ${response.status}: No se pudo cargar la información de tu orden`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Verificar si la respuesta contiene un error del servidor
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      // Validar que la data no esté vacía o incompleta
      if (!data || !data.metafields) {
        throw new Error(
          "La información del pedido está incompleta. Por favor, contacta con soporte.",
        );
      }

      // Validar que los campos críticos existan
      const hasRequiredFields =
        data.metafields.titulo_cancion ||
        data.metafields.para_quien_es ||
        data.metafields.de_quien_es;

      if (!hasRequiredFields) {
        throw new Error(
          "El pedido no contiene la información necesaria. Por favor, contacta con soporte.",
        );
      }

      setDataMetafieldsKeyValue(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al cargar tu pedido. Por favor, intenta de nuevo.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <DigitalCardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0E5050]  py-8 px-4 ">
        <div className="relative z-10 max-w-md mx-auto ">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#f5a623]/20 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#f5a623]/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-headphones w-8 h-8 text-[#f5a623]"
                    >
                      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#f5a623]/30 animate-ping"></div>
              </div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 text-balance">
                Tu canción está en camino
              </h2>
              <p className="text-white/70 font-sans leading-relaxed text-balance">
                Hubo un problema al cargar tu tarjeta digital. Por favor
                verifica tu conexión a internet o intenta más tarde.
              </p>
            </div>
           {/*  <div className="flex justify-center mb-8">
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 bg-[#f5a623] hover:bg-[#e69516] text-white font-semibold px-8 py-6 rounded-full shadow-lg shadow-[#f5a623]/30 transition-all hover:scale-105 text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-refresh-cw w-5 h-5 mr-2"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
                Intentar de nuevo
              </button>
            </div> */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/20"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-heart w-4 h-4 text-[#f5a623] fill-[#f5a623]"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
            <div className="text-center mb-6">
              <p className="text-white/60 font-sans text-sm mb-1">
                Estamos para ayudarte
              </p>
              <p className="text-white font-serif text-lg">
                Contacta a nuestro equipo
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <a
                href="https://wa.me/573243798334?text=Hola,%20necesito%20ayuda%20con%20mi%20tarjeta%20digital%20de%20LetraViva"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-message-circle w-6 h-6 text-white"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">WhatsApp</span>
              </a>
              <a
                href="mailto:contactoletraviva@gmail.com?subject=Ayuda con mi tarjeta digital LetraViva"
                className="group flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-mail w-6 h-6 text-white"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">Email</span>
              </a>
              <a
                href="tel:+573243798334"
                className="group flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-[#f5a623]/20 border border-white/10 hover:border-[#f5a623]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#f5a623] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-phone w-6 h-6 text-white"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">Llamar</span>
              </a>
            </div>
            <a
              href="https://wa.me/573243798334?text=Hola,%20necesito%20ayuda%20con%20mi%20tarjeta%20digital%20de%20LetraViva"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-message-circle w-5 h-5 text-[#25D366]"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Respuesta inmediata
                    </p>
                    <p className="text-white/60 text-xs">+57 324 379 8334</p>
                  </div>
                </div>
                <span className="text-[#25D366] text-xs font-semibold bg-[#25D366]/20 px-3 py-1 rounded-full">
                  En linea
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E5050]  py-8 px-4 ">
      <div className="max-w-4xl mx-auto mb-2">
        <div className="flex items-center justify-center gap-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-music w-8 h-8 text-[#f5a623]"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Letra<span className="text-[#f5a623]">Viva</span>
          </h1>
        </div>
        <p className="text-center text-white/70 font-sans text-sm">
          Canciones personalizadas que cuentan tu historia 
        </p>
      </div>

      <div className="flex justify-center py-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg bg-[#0f5555]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-music w-4 h-4"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          Plan {dataMetafieldsKeyValue?.packageName == "standard" ? "Estándar" : dataMetafieldsKeyValue?.packageName}
          
        </span>
      </div>

      <div className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 max-w-4xl mx-auto overflow-hidden shadow-2xl border-0 bg-white backdrop-blur">
        <Header
          imagen_generica={dataMetafieldsKeyValue?.metafields.imagen_generica ?? ""}
          ocasion={dataMetafieldsKeyValue?.metafields.ocasion ?? ""}
          para_quien_es={dataMetafieldsKeyValue?.metafields.para_quien_es ?? ""}
          titulo_cancion={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ""}
          de_quien_es={dataMetafieldsKeyValue?.metafields.de_quien_es ?? ""}
        />

        <div className="px-6 md:px-8 space-y-8">
          <SpecialDedication
            paid={dataMetafieldsKeyValue?.paid ?? ""}
            dedicatoria_especial={dataMetafieldsKeyValue?.metafields.dedicatoria_especial ?? ""}
          />

          <YourSong
            title={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ""}
            paid={dataMetafieldsKeyValue?.paid ?? ""}
            short_song_url={dataMetafieldsKeyValue?.metafields.short_song_url ?? ""}
            long_song_url={dataMetafieldsKeyValue?.metafields.long_song_url ?? ""}
            digital_card_url={dataMetafieldsKeyValue?.metafields.targeta_digital_url ?? ""}
            chance={dataMetafieldsKeyValue?.metafields.ocasion ?? ""}
            packageName={dataMetafieldsKeyValue?.packageName ?? ""}
          />

          {(dataMetafieldsKeyValue?.packageName === "premium" || dataMetafieldsKeyValue?.packageName === "standard") && (
            <LyricsSong
              paid={dataMetafieldsKeyValue?.paid ?? ""}
              letra_cancion={dataMetafieldsKeyValue?.metafields.letra_cancion ?? ""}
            />
          )}

          {dataMetafieldsKeyValue?.packageName === "premium" && (
            <YourVideo
              paid={dataMetafieldsKeyValue?.paid ?? ""}
              video_url={dataMetafieldsKeyValue?.metafields.video_url ?? ""}
            />
          )}

          {dataMetafieldsKeyValue?.paid === "pending" && (
            <div className="bg-gradient-to-r from-[#f5a623] to-[#ffc107] rounded-xl p-6 text-center shadow-lg mt-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-credit-card w-7 h-7 text-white"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                ¡Desbloquea tu Experiencia Completa!
              </h3>
              <p className="text-white/90 font-sans text-sm mb-5 max-w-md mx-auto">
                Realiza tu pago para acceder a la canción completa
              </p>
              <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 bg-white text-[#f5a623] hover:bg-white/90 font-semibold px-8 py-3 text-base shadow-lg">
                Completar Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
