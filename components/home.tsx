

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PDFQuizGeneratorHeader() {
    const [scrollY, setScrollY] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="relative mt-16 w-full min-h-screen overflow-hidden">
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

            {/* Content container */}
            <div className="relative z-20 flex flex-col h-full w-full px-8 md:px-16 lg:px-24">
                {/* Navbar */}

                {/* Main content */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center flex-1 gap-8 md:gap-16 py-12">
                    <div className="md:w-1/2 space-y-6 md:space-y-8 mt-8 md:mt-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                PDF to Quiz <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                    Generator
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-white/80 text-lg md:text-xl max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Transform any PDF document into interactive quizzes instantly. Perfect for educators, students, and
                            professionals looking to test knowledge retention.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full"
                                onClick={() => router.push("/quiz")}
                            >
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                                onClick={() => router.push("/about")}
                            >
                                Learn More
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden md:block md:w-1/2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
                            <div className="absolute -top-4 -left-4 bg-blue-500 rounded-full p-3">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-purple-600 rounded-full p-3">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-8 bg-white/10 rounded-md w-3/4"></div>
                                <div className="h-4 bg-white/10 rounded-md w-full"></div>
                                <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
                                <div className="h-4 bg-white/10 rounded-md w-4/5"></div>
                                <div className="pt-4">
                                    <div className="h-12 bg-white/10 rounded-md w-full mb-3"></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="h-10 bg-white/10 rounded-md"></div>
                                        <div className="h-10 bg-white/10 rounded-md"></div>
                                        <div className="h-10 bg-white/10 rounded-md"></div>
                                        <div className="h-10 bg-white/10 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom feature indicators */}
                <div className="hidden md:flex justify-center gap-8 pb-12">
                    {["AI-Powered", "Customizable", "Instant Results"].map((feature, index) => (
                        <motion.div
                            key={feature}
                            className="flex items-center gap-2 text-white/70"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        >
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"></div>
                            {feature}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

