import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-md border-white/10 rounded-lg p-6">
                    <div className="space-y-6">
                        {/* Header */}
                        <Skeleton className="h-8 w-48 mb-6" />

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-24 rounded-lg" />
                            ))}
                        </div>

                        {/* Chart */}
                        <Skeleton className="h-64 w-full rounded-lg mt-6" />

                        {/* Summary */}
                        <Skeleton className="h-32 w-full rounded-lg mt-6" />

                        {/* Button */}
                        <div className="flex justify-center mt-8">
                            <Skeleton className="h-14 w-48 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
