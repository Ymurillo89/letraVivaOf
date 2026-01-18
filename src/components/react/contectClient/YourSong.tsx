


type Props = {
    title: string;
    short_song_url: string;
    long_song_url: string;
    digital_card_url: string;
    chance: string; 
    paid: string;
}
export default function YourSong({ short_song_url, long_song_url, paid, title, digital_card_url, chance }: Props) {
    return (
        <div className="relative bg-gradient-to-br from-[#0d4a4a] via-[#0f5555] to-[#0d4a4a] rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#f5a623]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f5a623]/5 rounded-full blur-2xl"></div>
            <div className="absolute top-4 right-4 text-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-music w-12 h-12">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            </div>
            <div className="absolute bottom-4 left-4 text-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-music w-8 h-8">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            </div>
            <div className="relative flex flex-col md:flex-row gap-6 items-center">

                {paid === "pending" && (
                    <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#f5a623] to-[#ffc107] rounded-2xl blur opacity-10"></div>
                        <div className="relative bg-white p-2 rounded-xl shadow-xl">
                            <div className="relative overflow-hidden rounded-lg">
                                <img alt="Foto de María García" className="w-44 h-44 md:w-52 md:h-52 object-cover transition-all duration-300 blur-md scale-105" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/happy-couple-coffee-shop-warm-lighting-6aoBmNTC0ThKsMJLWhcTRPcCHJ3q4E.jpg" />
                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] rounded-lg"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d4a4a]/40 backdrop-blur-sm rounded-lg">
                                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock w-7 h-7 text-[#0d4a4a]">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <span className="text-white text-xs font-semibold font-sans bg-[#0d4a4a]/60 px-3 py-1 rounded-full">Foto bloqueada</span>
                                </div>
                            </div>
                            <div className="mt-2 text-center pb-1">
                                <p className="font-serif text-sm font-semibold truncate px-2 text-[#0d4a4a]/50">????????</p>
                                <div className="flex items-center justify-center gap-1 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-3 h-3 text-[#0d4a4a]/30 fill-[#0d4a4a]/30">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                    <span className="text-xs font-sans text-[#0d4a4a]/40">???</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-3 h-3 text-[#0d4a4a]/30 fill-[#0d4a4a]/30">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl border-[#0d4a4a]/30"></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr border-[#0d4a4a]/30"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl border-[#0d4a4a]/30"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 rounded-br border-[#0d4a4a]/30"></div>
                    </div>
                )}

                {paid === "paid" && (
                    <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#f5a623] to-[#ffc107] rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white p-2 rounded-xl shadow-xl">
                            <div className="relative overflow-hidden rounded-lg">
                                <img alt="Foto de Laura Rodríguez" className="w-44 h-44 md:w-52 md:h-52 object-cover" src={digital_card_url} />
                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] rounded-lg"></div>
                            </div>
                            <div className="mt-2 text-center pb-1">
                                {/* <p className="text-[#0d4a4a] font-serif text-sm font-semibold truncate px-2">Laura Rodríguez</p> */}
                                <div className="flex items-center justify-center gap-1 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-3 h-3 text-[#f5a623] fill-[#f5a623]">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                    <span className="text-[#0d4a4a]/60 text-xs font-sans">{chance}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-3 h-3 text-[#f5a623] fill-[#f5a623]">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#f5a623] rounded-tl"></div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#f5a623] rounded-tr"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#f5a623] rounded-bl"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#f5a623] rounded-br"></div>
                    </div>
                )}

                <div className="flex-1 w-full">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/10">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-music w-5 h-5 text-white">
                                    <path d="M9 18V5l12-2v13"></path>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <circle cx="18" cy="16" r="3"></circle>
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#f5a623] font-sans text-xs font-medium uppercase tracking-wider mb-1">Canción Personalizada</p>
                                <h4 className="text-white font-serif font-bold text-xl md:text-2xl leading-tight text-balance">{title}</h4>
                                {/* <p className="text-white/60 font-sans text-sm mt-1">De <span className="text-[#f5a623]">Miguel</span> con amor</p> */}
                            </div>
                        </div>
                    </div>
                    {paid === "paid" && (
                        <audio src={long_song_url}></audio>
                    )}
                    {paid === "pending" && (
                        <audio src={short_song_url}></audio>
                    )}
                    <div className="flex items-center gap-4">
                        <button className="w-16 h-16 rounded-full bg-[#f5a623] hover:bg-[#e69516] transition-all hover:scale-105 flex items-center justify-center shadow-lg shadow-[#f5a623]/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play w-7 h-7 text-white ml-1">
                                <polygon points="6 3 20 12 6 21 6 3"></polygon>
                            </svg>
                        </button>
                        <div className="flex-1 space-y-2">
                            <div className="relative w-full overflow-hidden rounded-full h-2 bg-white/20">
                                <div className="bg-primary h-full w-full flex-1 transition-all" style={{ transform: "translateX(-100%)" }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-white/60 font-sans">
                                <span>0:00</span>
                                <span>0:00</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-white/40 text-xs font-sans">Producido por</span>
                        <span className="text-white font-serif text-sm">Letra<span className="text-[#f5a623]">Viva</span> Studios</span>
                    </div>
                </div>
            </div>

            {paid === "pending" && (
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 text-white/90 font-sans">
                    <div className="w-10 h-10 rounded-full bg-[#f5a623]/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock w-5 h-5 text-[#f5a623]">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium text-sm">Vista previa limitada</p>
                        <p className="text-white/60 text-xs">Realiza tu pago para escuchar la canción completa</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}