type Props = {
   imagen_generica: string;
   ocasion: string;
   para_quien_es: string;
   titulo_cancion: string;
   de_quien_es: string;
}


export default function Header({ imagen_generica, ocasion, para_quien_es, titulo_cancion, de_quien_es }: Props) {
    return (
        <div className="relative h-64 md:h-80 overflow-hidden">
            <img
                alt="Imagen personalizada"
                className="w-full h-full object-cover"
                src={imagen_generica}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a4a]/90 via-[#0d4a4a]/40 to-transparent"></div>

            <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5a623] text-white text-xs font-semibold shadow-lg">
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
                        className="lucide lucide-heart w-3 h-3">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    {ocasion}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[#f5a623] font-sans text-sm font-medium mb-1">{para_quien_es}</p>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 text-balance">{titulo_cancion}</h2>
                <p className="text-white/80 font-sans text-sm">{de_quien_es}</p>
            </div>
        </div>
    );
}   