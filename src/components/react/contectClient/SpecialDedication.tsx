type Props = {
    dedicatoria_especial: string;
}


export default function SpecialDedication({dedicatoria_especial}: Props) {
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-file-text w-5 h-5 text-[#0d4a4a]"
                            ><path
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                            ></path><path d="M14 2v4a2 2 0 0 0 2 2h4"
                            ></path><path d="M10 9H8"></path><path d="M16 13H8"
                            ></path><path d="M16 17H8"></path></svg>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-[#0d4a4a]">Dedicatoria Especial</h3>
                </div>
                <div className="bg-gradient-to-br from-[#f5f9f9] to-white rounded-xl p-5 border border-[#0d4a4a]/10">
                 <p className="text-[#0d4a4a]/80 font-sans leading-relaxed text-base">
                        {dedicatoria_especial}
                    </p>
                </div>
            </section>
    );
}