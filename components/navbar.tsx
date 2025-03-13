"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/hooks/use-auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { signOutWithGoogle } from "@/lib/auth";
import { removeSession } from "@/lib/auth-actions";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const { user } = useAuthContext();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    };

    const handleSignOut = async () => {
        await signOutWithGoogle();
        await removeSession();
      };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/80 via-black/60 to-transparent backdrop-blur-md transition-all duration-300"
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-white font-bold text-xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Quizzo
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="/quiz" className="text-white/80 hover:text-white transition-colors">
                        Take a Quiz
                    </Link>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer hover:opacity-90 transition-opacity">
                                    <AvatarImage src={user.photoURL || ""} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-md">
                                <DropdownMenuLabel className="text-white/80">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem
                                    className="text-white/80 hover:bg-white/10 cursor-pointer"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white transition-all duration-300 rounded-full px-6 py-2"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden fixed top-0 right-0 h-screen w-3/4 bg-black   p-6 z-50"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={mobileMenuVariants}
                        >
                            <div className="flex justify-end">
                                <button
                                    className="text-white mb-6 mr-7 rounded-full hover:bg-white/10 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/about"
                                    className="text-white/80 hover:text-white transition-colors py-2 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/quiz"
                                    className="text-white/80 hover:text-white transition-colors py-2 text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Take a Quiz
                                </Link>
                                {user ? (
                                    <div className="flex flex-col space-y-4 mt-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={user.photoURL || ""} />
                                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-white/80 text-lg">{user.displayName || user.email}</span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-full px-6 py-2"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2 text-lg"
                                        onClick={() => {
                                            router.push("/login");
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}