type Props = {
    paid: string;
    video_url: string;
}

export default function YourVideo({ paid, video_url }: Props) {
    return (

        <section>

            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-video w-5 h-5 text-[#f5a623]">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock w-8 h-8 text-[#0d4a4a]/50"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <p className="text-[#0d4a4a]/70 font-sans font-medium">Video bloqueado</p>
                        <p className="text-[#0d4a4a]/50 font-sans text-sm mt-1">Completa tu pago para desbloquear</p>
                    </div>
                </div>                
            )}


            {paid === "paid" && (
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <div className="w-full h-full bg-[#0d4a4a] flex items-center justify-center">
                    <img alt="Video thumbnail" className="w-full h-full object-cover opacity-50" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/romantic-proposal-sunset-beach-engagement-ring-Gg80ecDQKkjwnpILF8zp4P3e6OMEqU.jpg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-[#f5a623] flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play w-8 h-8 text-white ml-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </section>
    );
}