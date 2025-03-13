export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center z-50">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-30 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

