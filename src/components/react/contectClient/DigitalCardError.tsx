export default function DigitalCardError() {
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