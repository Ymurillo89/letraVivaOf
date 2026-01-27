import Header from "./Header";
import { useEffect, useState } from "react";
import SpecialDedication from "./SpecialDedication";
import YourSong from "./YourSong";
import LyricsSong from "./LyricsSong";
import YourVideo from "./YourVideo";
import DigitalCardSkeleton from "./DigitalCardSkeleton";
import PaymentButton from "./PaymentButton ";
import DigitalCardError from "./DigitalCardError";

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
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    handleOrderId();
  }, []);

  const handleOrderId = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const pathParts = window.location.pathname.split('/');
      const currentOrderId = pathParts[pathParts.length - 1]; // Obtiene el último segmento
      setOrderId(currentOrderId);

      if (!currentOrderId) {
        setError("No se proporcionó un ID de orden válido");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/order/${currentOrderId}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          `Error ${response.status}: No se pudo cargar la información de tu orden`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // =========================================================
      // 🚀 REDIRECCIÓN AUTOMÁTICA
      // Si el backend nos dice que hay un ID nuevo (porque ya pagaron), vamos allá.
      // =========================================================
      if (data.redirect_to_new_order_id) {
        console.log(`🔄 Pedido actualizado. Redirigiendo a: ${data.redirect_to_new_order_id}`);
        window.location.href = `/card/${data.redirect_to_new_order_id}`;
        return;
      }

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
    return <DigitalCardError />;
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-music w-4 h-4"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          Paquete {dataMetafieldsKeyValue?.packageName == "standard" ? "Estándar" : dataMetafieldsKeyValue?.packageName}
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

          {(dataMetafieldsKeyValue?.packageName === "premium" || dataMetafieldsKeyValue?.packageName === "standard") && (
          <SpecialDedication
            paid={dataMetafieldsKeyValue?.paid ?? ""}
            dedicatoria_especial={dataMetafieldsKeyValue?.metafields.dedicatoria_especial ?? ""}
            orderId={orderId ?? ""}
          />
          )}

          <YourSong
            title={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ""}
            paid={dataMetafieldsKeyValue?.paid ?? ""}
            short_song_url={dataMetafieldsKeyValue?.metafields.short_song_url ?? ""}
            long_song_url={dataMetafieldsKeyValue?.metafields.long_song_url ?? ""}
            digital_card_url={dataMetafieldsKeyValue?.metafields.targeta_digital_url ?? ""}
            generic_image={dataMetafieldsKeyValue?.metafields.imagen_generica ?? ""}
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

          {/* Botón de Pago: Solo se muestra si está pendiente */}
          {dataMetafieldsKeyValue?.paid === "pending" && (
            <PaymentButton orderId={orderId || ""} />
          )}
        </div>
      </div>
    </div>
  );
}