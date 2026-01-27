import { useState, useRef } from "react";

type Props = {
    paid: string;
    video_url: string;
}

export default function YourVideo({ paid, video_url }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isPaid = paid === "paid";

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play();
            setIsPlaying(true);
            setShowControls(true);
        }

        // Mostrar controles temporalmente en móvil
        showControlsTemporarily();
    };

    const showControlsTemporarily = () => {
        setControlsVisible(true);

        // Limpiar timeout anterior
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        // Ocultar controles después de 3 segundos
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setControlsVisible(false);
            }
        }, 3000);
    };

    const handleVideoClick = () => {
        if (isPlaying) {
            // Si está reproduciendo, mostrar/ocultar controles
            showControlsTemporarily();
        } else {
            // Si está pausado, reproducir
            togglePlayPause();
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    const toggleFullscreen = async () => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        try {
            // Detectar si estamos en móvil
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
                // Entrar en pantalla completa
                if (isMobile && 'webkitEnterFullscreen' in video) {
                    // iOS Safari - usar el método nativo del video
                    (video as any).webkitEnterFullscreen();
                } else if (container.requestFullscreen) {
                    await container.requestFullscreen();
                } else if ((container as any).webkitRequestFullscreen) {
                    // Safari
                    await (container as any).webkitRequestFullscreen();
                } else if ((container as any).mozRequestFullScreen) {
                    // Firefox
                    await (container as any).mozRequestFullScreen();
                } else if ((container as any).msRequestFullscreen) {
                    // IE/Edge
                    await (container as any).msRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                // Salir de pantalla completa
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    await (document as any).webkitExitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    await (document as any).mozCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    await (document as any).msExitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch (error) {
            console.error('Error al cambiar pantalla completa:', error);
        }
    };

    // Listener para detectar cuando se sale de pantalla completa con ESC
    useState(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement
            );
            setIsFullscreen(isCurrentlyFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    });

    const handleDownloadVideo = async () => {
        if (!isPaid || !video_url) return;

        try {
            setIsDownloading(true);

            // Agregamos un timestamp para evitar problemas de caché del CDN
            const urlWithCacheBust = `${video_url}${video_url.includes('?') ? '&' : '?'}t=${Date.now()}`;

            const response = await fetch(urlWithCacheBust, {
                method: 'GET',
                mode: 'cors',
            });

            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Video_LetraViva.mp4';
            document.body.appendChild(link);
            link.click();

            // Limpieza de memoria
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            setIsDownloading(false);

        } catch (error) {
            console.error('Error al descargar el video:', error);
            alert('Hubo un error al descargar el video. Asegúrate de que el CDN haya sido purgado en DigitalOcean.');
            setIsDownloading(false);
        }
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video w-5 h-5 text-[#f5a623]">
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                    </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0d4a4a]">Video Emotivo</h3>
            </div>

            {paid === "pending" && (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0d4a4a]/10 border-2 border-dashed border-[#0d4a4a]/20">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-[#0d4a4a]/10 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-8 h-8 text-[#0d4a4a]/50">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <p className="text-[#0d4a4a]/70 font-sans font-medium">Video bloqueado</p>
                        <p className="text-[#0d4a4a]/50 font-sans text-sm mt-1">Completa tu pago para desbloquear</p>
                    </div>
                </div>
            )}

            {paid === "paid" && (
                <div className="space-y-4">
                    <div
                        ref={containerRef}
                        className="relative aspect-video rounded-xl overflow-hidden shadow-lg group bg-black"
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            src={video_url}
                            onEnded={handleVideoEnded}
                            onClick={handleVideoClick}
                            playsInline
                            preload="metadata"
                        />

                        {/* Overlay con botón de play cuando no está reproduciendo */}
                        {!isPlaying && (
                            <div
                                className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/40"
                                onClick={togglePlayPause}
                            >
                                <div className="w-20 h-20 rounded-full bg-[#f5a623] hover:bg-[#e69516] flex items-center justify-center shadow-lg transition-all hover:scale-105">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play w-8 h-8 text-white ml-1">
                                        <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Controles de video personalizados */}
                        {showControls && (
                            <div
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${controlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                                    }`}
                                onMouseEnter={() => setControlsVisible(true)}
                                onMouseLeave={() => isPlaying && setControlsVisible(false)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePlayPause();
                                        }}
                                        className="text-white hover:text-[#f5a623] transition-colors p-2"
                                    >
                                        {isPlaying ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                                                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFullscreen();
                                        }}
                                        className="text-white hover:text-[#f5a623] transition-colors p-2"
                                        title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                                    >
                                        {isFullscreen ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                                                <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                                                <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                                                <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                                <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                                                <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                                                <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                                                <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón de descarga */}
                    <button
                        onClick={handleDownloadVideo}
                        disabled={isDownloading}
                        className="w-full bg-[#0d4a4a]/5 hover:bg-[#0d4a4a]/10 border border-[#0d4a4a]/20 text-[#0d4a4a] font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-[#0d4a4a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Descargando video...</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" x2="12" y1="15" y2="3"></line>
                                </svg>
                                <span>Descargar Video</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
}