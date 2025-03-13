import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-md border-white/10 rounded-lg p-6">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-24" />
                        </div>

                        {/* Question */}
                        <Skeleton className="h-10 w-full" />

                        {/* Options */}
                        <div className="space-y-4 mt-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <Skeleton className="h-16 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-8">
                            <Skeleton className="h-10 w-28" />
                            <div className="flex space-x-2">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
