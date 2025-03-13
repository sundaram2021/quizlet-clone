"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

export default function Login() {

    const router = useRouter();
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google login result:", result);
            router.push("/quiz");
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.7)",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
                            <CardDescription className="text-white/70">Sign in to your account to continue</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <Button
                                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90"
                                onClick={handleGoogleLogin}
                            >
                                <Chrome className="h-4 w-4" />
                                <span>Continue with Google</span>
                            </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-center text-center text-sm text-white/50">
                            <div className="mt-2">By continuing, you agree to our Terms of Service and Privacy Policy.</div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

