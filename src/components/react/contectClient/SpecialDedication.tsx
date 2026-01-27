import { useState } from "react";

type Props = {
  dedicatoria_especial: string;
  paid: string;
  orderId: string;
};

export default function SpecialDedication({ dedicatoria_especial, paid, orderId }: Props) {
  const isPaid = paid === "paid";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompletePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);


      const requesUrl = `/api/payOrder/${orderId}`;

      const response = await fetch(requesUrl, { method: 'POST' });

      // Intentamos leer el JSON, si falla leemos texto para el error
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Error del servidor: ${text}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Error al conectar con el servidor");
      }

      console.log("Datos de pago recibidos:", data);

      if (!data.checkoutUrl) {
        throw new Error("El servidor no devolvió una URL de pago válida.");
      }

      // 🚀 REDIRECCIÓN
      window.location.href = data.checkoutUrl;

    } catch (err: any) {
      console.error("Error en el pago:", err);
      setError(err.message || "Ocurrió un error al procesar el pago");
      setIsLoading(false);
    }
  };

  const getDisplayText = () => {
    if (isPaid) return dedicatoria_especial;

    const maxLength = 300;
    return dedicatoria_especial.length > maxLength
      ? dedicatoria_especial.substring(0, maxLength)
      : dedicatoria_especial;
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#0d4a4a]/10 flex items-center justify-center">
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
            className="lucide lucide-file-text w-5 h-5 text-[#0d4a4a]"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
          </svg>
        </div>
        <h3 className="text-xl font-serif font-semibold text-[#0d4a4a]">
          Dedicatoria Especial
        </h3>
      </div>

      <div className="bg-gradient-to-br from-[#f5f9f9] to-white rounded-xl p-5 border border-[#0d4a4a]/10 relative overflow-hidden">
        <p className="text-[#0d4a4a]/80 font-sans leading-relaxed text-base">
          {getDisplayText()}
        </p>

        {!isPaid && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-20% via-white/70 via-60% to-white pointer-events-none rounded-xl"></div>

            {/* Botón de desbloqueo cuando no está pago */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center pointer-events-auto">
              <button onClick={handleCompletePayment} disabled={isLoading} className="bg-[#0d4a4a] cursor-pointer text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0d4a4a]/90 transition-all shadow-lg flex items-center gap-2 hover:scale-105">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-[#f5a623]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Redirigiendo...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-lock-open"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                    </svg>
                    <span>Completar Pago Para Ver Todo</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}