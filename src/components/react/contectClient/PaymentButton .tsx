import { useState } from "react";

export default function PaymentButton({ orderId }: { orderId: string }) {
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

  return (
    <div className="bg-gradient-to-r from-[#f5a623] to-[#ffc107] rounded-xl p-6 text-center shadow-lg mt-6">
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
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
        Realiza tu pago para acceder a la canción completa, la letra y todos los beneficios de tu plan
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
          <p className="text-white text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleCompletePayment}
        disabled={isLoading}
        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 bg-white text-[#f5a623] hover:bg-white/90 font-semibold px-8 py-6 text-base shadow-lg"
      >
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
            <span>Completar Pago</span>
          </>
        )}
      </button>

    </div>
  );
}