import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background with gradient overlay */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.7)",
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

            {/* Animated pattern overlay */}
            <div className="absolute inset-0 opacity-20 z-10">
                <div className="absolute right-0 top-0 bottom-0 w-1/2">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white/30"
                            style={{
                                width: "1px",
                                height: `${Math.random() * 60 + 40}%`,
                                right: `${i * 5}%`,
                                top: `${Math.random() * 40}%`,
                                opacity: 0.5 + Math.random() * 0.5,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
                <Skeleton className="w-full max-w-md h-80 rounded-lg" />
            </div>
        </div>
    )
}

