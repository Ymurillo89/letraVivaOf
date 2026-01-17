


type Props = {
    title: string;
    short_song_url: string;
    long_song_url: string;
    paid: string;
}
export default function YourSong({ short_song_url, long_song_url, paid, title }: Props) {
    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
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
                        className="lucide lucide-music w-5 h-5 text-[#f5a623]"
                    >
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-[#0d4a4a]">Tu Canción</h3>

                    {paid === "pending" && (
                        <span className="text-xs text-[#f5a623] font-sans flex items-center gap-1">
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
                            className="lucide lucide-clock w-3 h-3"
                        ><circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Vista previa: 30 segundos
                    </span>
                    )}
                </div>
            </div>
            <div className="bg-gradient-to-br from-[#0d4a4a] to-[#0f5555] rounded-xl p-5 shadow-lg">
                {paid === "paid" && (
                <audio src={short_song_url}></audio> 
                )}
                {paid === "pending" && (
                <audio src={long_song_url}></audio> 
                )}
                <div className="flex items-center gap-4 mb-4">
                    <button className="w-14 h-14 rounded-full bg-[#f5a623] hover:bg-[#e69516] transition-colors flex items-center justify-center shadow-lg">
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
                            className="lucide lucide-play w-6 h-6 text-white ml-1"
                        >
                            <polygon points="6 3 20 12 6 21 6 3"></polygon>
                        </svg>
                    </button>
                    <div className="flex-1">
                        <p className="text-white font-serif font-semibold text-lg">
                            {title}
                        </p><p className="text-white/60 font-sans text-sm">
                            Letra Viva Studios
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div
                            aria-valuemax={100}
                            aria-valuemin={0}
                            role="progressbar"
                            data-state="indeterminate"
                            data-max={100}
                            data-slot="progress"
                            className="relative w-full overflow-hidden rounded-full h-2 bg-white/20"
                        >
                            <div
                                data-state="indeterminate"
                                data-max={100}
                                data-slot="progress-indicator"
                                className="bg-primary h-full w-full flex-1 transition-all"
                                style={{transform: 'translateX(-100%)'}}
                            >
                            </div>
                        </div>
                    <div className="flex justify-between text-xs text-white/60 font-sans">
                        <span>0:00</span><span>0:00</span>
                    </div>
                </div>
               
              
                <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="flex items-center gap-2 text-white/90 text-sm font-sans">
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
                            className="lucide lucide-lock w-4 h-4 text-[#f5a623]"
                        >
                            <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"></rect><path
                                    d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg
                        ><span
                        >Realiza tu pago para escuchar la canción
                            completa</span>
                    </div>
                </div>
             
                
                
                
            </div>  
        </section>
    );
}