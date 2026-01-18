type Props = {
    paid: string;
    letra_cancion: string;
}

export default function LyricsSong({ paid, letra_cancion }: Props) {
    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0d4a4a]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-text w-5 h-5 text-[#0d4a4a]">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        <path d="M10 9H8"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0d4a4a]">Letra de tu Canción</h3>
                {paid === "pending" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock w-4 h-4 text-[#f5a623]">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                )}
            </div>

            {paid === "pending" && (
                <div className="relative rounded-xl overflow-hidden bg-[#0d4a4a]/5 border-2 border-dashed border-[#0d4a4a]/20 p-8">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-[#0d4a4a]/10 flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock w-6 h-6 text-[#0d4a4a]/50">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <p className="text-[#0d4a4a]/70 font-sans font-medium">Letra bloqueada</p>
                        <p className="text-[#0d4a4a]/50 font-sans text-sm mt-1">Completa tu pago para ver la letra completa</p>
                    </div>
                </div>
            )}

            {paid === "paid" && (
                <div className="bg-gradient-to-br from-[#f5f9f9] to-white rounded-xl p-6 border border-[#0d4a4a]/10 shadow-inner">
                    <p className="text-[#0d4a4a]/80 font-sans leading-loose whitespace-pre-line text-center italic">{letra_cancion}
                    </p>
                </div>
            )}
        </section>
    );
}