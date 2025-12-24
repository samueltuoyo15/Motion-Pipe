"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Register() {
    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center relative overflow-hidden">

            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-md px-6">
                <Link href="/" className="flex items-center text-[#a1a1aa] hover:text-white mb-8 transition-colors text-sm font-mono">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK TO HOME
                </Link>

                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <img src="/logo.png" alt="Motion Pipe Logo" className="w-16 h-16 rounded-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Create Workspace</h1>
                    <p className="text-[#a1a1aa] text-sm">Initialize new motion design environment.</p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-8 shadow-sm">
                    <button className="w-full bg-[#18181b] border border-[#27272a] text-white py-3 flex items-center justify-center gap-2 hover:bg-[#27272a] transition-all mb-6 font-medium text-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#27272a]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#09090b] px-2 text-[#a1a1aa] font-mono tracking-widest">Or Register</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-[#a1a1aa] mb-2 uppercase tracking-widest">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#52525b]"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#a1a1aa] mb-2 uppercase tracking-widest">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#52525b]"
                                placeholder="user@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#a1a1aa] mb-2 uppercase tracking-widest">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-[#18181b] border border-[#27272a] rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#52525b]"
                                placeholder="••••••••"
                            />
                        </div>

                        <button className="w-full bg-[#ea580c] text-white font-bold py-3 hover:bg-[#c2410c] transition-all">
                            Initialize Workspace
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#27272a] text-center">
                        <p className="text-[#a1a1aa] text-sm">
                            Already initialized?{" "}
                            <Link href="/login" className="text-[#ea580c] hover:underline">
                                Access System
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
