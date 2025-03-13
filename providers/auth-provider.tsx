
"use client"

import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { createContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
    user: any | null
    loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)

            if (user) {
                // User is logged in
                if (pathname === "/login") {
                    router.push("/quiz")
                }
            } else {
                // User is not logged in
                if (pathname.startsWith("/quiz")) {
                    router.push("/login")
                }
            }
        })

        return () => unsubscribe()
    }, [router, pathname])

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

