

export default function DigitalCardSkeleton() {
 return (
        <div className="min-h-screen bg-[#0E5050] py-8 px-4">
            {/* Header Skeleton */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
                    <div className="h-10 w-48 bg-white/10 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center">
                    <div className="h-4 w-64 bg-white/10 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Main Card Skeleton */}
            <div className="max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-xl bg-white backdrop-blur">
                {/* Cover Image Skeleton */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    
                    {/* Occasion Badge Skeleton */}
                    <div className="absolute top-4 left-4">
                        <div className="h-7 w-28 rounded-full bg-gray-300 animate-pulse"></div>
                    </div>

                    {/* Title Overlay Skeleton */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#0d4a4a]/90 to-transparent">
                        <div className="h-4 w-32 mb-2 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-10 w-3/4 mb-2 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-4 w-40 bg-white/20 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="p-6 md:p-8 space-y-8">
                    {/* Story Section Skeleton */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="rounded-xl p-5 border border-gray-200 bg-gray-50">
                            <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-5/6 mb-2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Audio Player Section Skeleton */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#f5a623]/20 animate-pulse"></div>
                            <div>
                                <div className="h-6 w-28 mb-1 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Audio Player Card Skeleton */}
                        <div className="bg-gradient-to-br from-[#0d4a4a] via-[#0f5555] to-[#0d4a4a] rounded-2xl p-6 md:p-8 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#f5a623]/30 animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-2 w-full bg-white/20 rounded animate-pulse"></div>
                                    <div className="flex justify-between">
                                        <div className="h-3 w-10 bg-white/20 rounded animate-pulse"></div>
                                        <div className="h-3 w-10 bg-white/20 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Section Skeleton */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#f5a623]/20 animate-pulse"></div>
                            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="aspect-video w-full rounded-xl bg-gray-200 animate-pulse"></div>
                    </div>

                    {/* Lyrics Section Skeleton */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="h-6 w-44 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="rounded-xl p-6 border border-gray-200 bg-gray-50">
                            <div className="space-y-3">
                                <div className="h-4 w-4/5 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}