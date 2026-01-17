import Header from "./Header";
import { useEffect, useState } from "react";
import SpecialDedication from "./SpecialDedication";
import YourSong from "./YourSong";


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

                    <YourSong title={dataMetafieldsKeyValue?.metafields.titulo_cancion ?? ''} paid={dataMetafieldsKeyValue?.paid ?? ''} short_song_url={dataMetafieldsKeyValue?.metafields.short_song_url ?? ''} long_song_url={dataMetafieldsKeyValue?.metafields.long_song_url ?? ''} />
                </div>
            </div>
        </div>
    );
}
