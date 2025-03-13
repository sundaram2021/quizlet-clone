"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Lightbulb, GraduationCap } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function AboutPage() {
    const router = useRouter()

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.7)"
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

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

            <div className="relative z-20 flex flex-col h-full w-full px-8 md:px-16 lg:px-24 py-12">

                <div className="flex flex-col items-center justify-center flex-1 gap-8 py-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">PDF Quiz Generator</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-white/80 text-lg text-center max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our platform leverages advanced AI technology to transform any PDF document into interactive quizzes instantly.
                        We're dedicated to making learning more engaging and effective for educators, students, and professionals alike.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
                        {[
                            {
                                icon: <BookOpen className="h-10 w-10 text-blue-400" />,
                                title: "Easy Learning",
                                description: "Transform any educational material into interactive quizzes with just a few clicks."
                            },
                            {
                                icon: <Lightbulb className="h-10 w-10 text-purple-500" />,
                                title: "AI-Powered",
                                description: "Our advanced AI analyzes your documents to create relevant and challenging questions."
                            },
                            {
                                icon: <GraduationCap className="h-10 w-10 text-blue-500" />,
                                title: "Track Progress",
                                description: "Monitor your learning journey with detailed performance analytics and progress tracking."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full"
                            onClick={() => router.push("/quiz")}
                        >
                            Try It Now
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
