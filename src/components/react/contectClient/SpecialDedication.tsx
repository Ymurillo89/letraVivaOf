type Props = {
  dedicatoria_especial: string;
  paid: string;
};

export default function SpecialDedication({ dedicatoria_especial, paid }: Props) {
  const isPaid = paid === "paid";
  
  // Función para truncar el texto si no está pago
  const getDisplayText = () => {
    if (isPaid) return dedicatoria_especial;
    
    // Mostrar solo los primeros 300 caracteres aproximadamente
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
              <button className="bg-[#0d4a4a] cursor-pointer text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0d4a4a]/90 transition-all shadow-lg flex items-center gap-2 hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Completar pago para ver todo
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}