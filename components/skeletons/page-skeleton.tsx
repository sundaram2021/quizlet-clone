import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 w-full h-full"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.7)"
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

            {/* Animated pattern overlay */}
            <div className="absolute inset-0 opacity-20 z-10">
                <div className="absolute right-0 top-0 bottom-0 w-1/2">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute bg-white/30"
                            style={{
                                width: "1px",
                                height: `${Math.random() * 60 + 40}%`,
                                right: `${i * 5}%`,
                                top: `${Math.random() * 40}%`,
                                opacity: 0.5 + Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content container */}
            <div className="relative z-20 flex flex-col h-full w-full px-8 md:px-16 lg:px-24 py-12">
                {/* Header skeleton */}
                <div className="pt-6 flex justify-between items-center w-full">
                    <Skeleton className="h-10 w-28" />
                </div>

                {/* Main content skeleton */}
                <div className="flex flex-col md:flex-row items-center justify-center flex-1 gap-8 py-12">
                    <div className="md:w-1/2 space-y-6 md:space-y-8 mt-8 md:mt-16">
                        <Skeleton className="h-16 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Skeleton className="h-12 w-40" />
                            <Skeleton className="h-12 w-40" />
                        </div>
                    </div>
                    <div className="hidden md:block md:w-1/2">
                        <Skeleton className="h-80 w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
