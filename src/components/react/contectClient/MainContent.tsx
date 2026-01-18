import Header from "./Header";
import { useEffect, useState } from "react";
import SpecialDedication from "./SpecialDedication";
import YourSong from "./YourSong";
import LyricsSong from "./LyricsSong";
import YourVideo from "./YourVideo";


export default function MainContent() {

    const [dataMetafieldsKeyValue, setDataMetafieldsKeyValue] = useState<{
        paid: string,
        package: string,
        metafields: {
            para_quien_es: string,
            titulo_cancion: string,
            de_quien_es: string,
            dedicatoria_especial: string,
            ocasion: string,
            imagen_generica: string,
            short_song_url: string,
            long_song_url: string,
            targeta_digital_url: string,
            video_url: string,
            letra_cancion: string
        },

    } | null>(null);


    useEffect(() => {
        handleOrderId();
    }, []);

    const handleOrderId = async () => {

        const orderId = new URLSearchParams(window.location.search).get("orderId");
        const dataMetafieldsKeyValue = await fetch(`/api/order/${orderId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            });
        setDataMetafieldsKeyValue(dataMetafieldsKeyValue);

        console.log(dataMetafieldsKeyValue);

    }

    return (
        <div className="min-h-screen bg-[#0E5050]  py-8 px-4 ">
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
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
                        className="lucide lucide-music w-8 h-8 text-[#f5a623]"
                    ><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"
                    ></circle><circle cx="18" cy="16" r="3"></circle>
                    </svg>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">Letra<span className="text-[#f5a623]">Viva</span>
                    </h1>
                </div>
                <p className="text-center text-white/70 font-sans text-sm">Canciones personalizadas que cuentan tu historia</p>

            </div>

            <div className="text-card-foreground flex flex-col gap-6 rounded-xl py-6 max-w-4xl mx-auto overflow-hidden shadow-2xl border-0 bg-white backdrop-blur">

                <Header imagen_generica={dataMetafieldsKeyValue?.metafields.imagen_generica ?? ''} ocasion={dataMetafieldsKeyValue?.metafields.ocasion ?? ''} para_quien_es={dataMetafieldsKeyValue?.metafields.para_quien_es ?? ''} titulo_cancion={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ''} de_quien_es={dataMetafieldsKeyValue?.metafields.de_quien_es ?? ''} />

                <div className="px-6 md:px-8 space-y-8">
                    <SpecialDedication dedicatoria_especial={dataMetafieldsKeyValue?.metafields.dedicatoria_especial ?? ''} />

                    <YourSong title={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ''} paid={dataMetafieldsKeyValue?.paid ?? ''} short_song_url={dataMetafieldsKeyValue?.metafields.short_song_url ?? ''} long_song_url={dataMetafieldsKeyValue?.metafields.long_song_url ?? ''} digital_card_url={dataMetafieldsKeyValue?.metafields.targeta_digital_url ?? ''} chance={dataMetafieldsKeyValue?.metafields.ocasion ?? ''}/>

                    <LyricsSong paid={dataMetafieldsKeyValue?.paid ?? ''} letra_cancion={dataMetafieldsKeyValue?.metafields.letra_cancion ?? ''} />

                    <YourVideo paid={dataMetafieldsKeyValue?.paid ?? ''} video_url={dataMetafieldsKeyValue?.metafields.video_url ?? ''} />

                    {dataMetafieldsKeyValue?.paid === "pending" && (
                        <div className="bg-gradient-to-r from-[#f5a623] to-[#ffc107] rounded-xl p-6 text-center shadow-lg mt-6">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
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
                                    className="lucide lucide-credit-card w-7 h-7 text-white"
                                >
                                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                    <line x1="2" x2="22" y1="10" y2="10"></line>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-white mb-2">
                                ¡Desbloquea tu Experiencia Completa!
                            </h3>
                            <p className="text-white/90 font-sans text-sm mb-5 max-w-md mx-auto">Realiza tu pago para acceder a la canción completa</p>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 bg-white text-[#f5a623] hover:bg-white/90 font-semibold px-8 py-3 text-base shadow-lg">Completar Pago</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
