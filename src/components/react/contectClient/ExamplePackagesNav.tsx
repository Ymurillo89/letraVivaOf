// ExamplePackagesNav.tsx

const EXAMPLE_ORDERS = {
  "6721246658709": "premium",
  "6721174798485": "standard",
  "6721211138197": "mini",
} as const;

const EXAMPLE_LINKS = {
  premium: {
    label: "Premium",
    url: "https://www.letravivaoficial.com/card/6721246658709",
    icon: "⭐",
    description: "Video + Letra + Dedicatoria",
  },
  standard: {
    label: "Estándar",
    url: "https://www.letravivaoficial.com/card/6721174798485",
    icon: "🎵",
    description: "Letra + Dedicatoria",
  },
  mini: {
    label: "Mini",
    url: "https://www.letravivaoficial.com/card/6721211138197",
    icon: "🎶",
    description: "Canción personalizada",
  },
};

interface ExamplePackagesNavProps {
  currentOrderId: string;
}

export default function ExamplePackagesNav({ currentOrderId }: ExamplePackagesNavProps) {
  // Solo renderiza si el pedido actual es uno de los ejemplos
  if (!Object.keys(EXAMPLE_ORDERS).includes(currentOrderId)) return null;

  const currentPackage = EXAMPLE_ORDERS[currentOrderId as keyof typeof EXAMPLE_ORDERS];

  return (
    <div className="w-full rounded-2xl bg-[#0E5050] border border-[#0E5050] p-4 md:p-5">
      {/* Encabezado */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 rounded-full bg-[#f5a623]" />
        <p className="text-sm font-semibold text-white">
          Ver ejemplos de otros paquetes
        </p>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-2">
        {(Object.entries(EXAMPLE_LINKS) as [keyof typeof EXAMPLE_LINKS, typeof EXAMPLE_LINKS[keyof typeof EXAMPLE_LINKS]][]).map(
          ([key, pkg]) => {
            const isCurrent = key === currentPackage;
            return (
              <a
                key={key}
                href={pkg.url}
                className={`
                  flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 no-underline
                  ${
                    isCurrent
                      ? "bg-[#f5a623] border-white/10 cursor-default pointer-events-none"
                      : "scale-100 bg-white border-[#0E5050]/20  active:scale-[0.98] transition-all duration-200 hover:scale-105 text-[#0E5050]"
                  }
                `}
                onClick={isCurrent ? (e) => e.preventDefault() : undefined}
              >
                <span className="text-xl leading-none">{pkg.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-bold leading-tight ${
                      isCurrent ? "text-white" : "text-[#0E5050]"
                    }`}
                  >
                    {pkg.label}
                    {isCurrent && (
                      <span className="ml-2 text-[10px] font-semibold bg-[#0E5050] text-white px-1.5 py-0.5 rounded-full align-middle">
                        Actual
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-xs leading-tight mt-0.5 truncate ${
                      isCurrent ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {pkg.description}
                  </span>
                </div>
                {!isCurrent && (
                  <svg
                    className="ml-auto w-4 h-4 text-[#0E5050]/40 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </a>
            );
          }
        )}
      </div>
    </div>
  );
}