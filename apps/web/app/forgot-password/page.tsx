"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-md px-6">
                <Link href="/login" className="flex items-center text-[#a1a1aa] hover:text-white mb-8 transition-colors text-sm font-mono">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK TO LOGIN
                </Link>

                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-[#ea580c] rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white text-xl">M</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Recovery Mode</h1>
                    <p className="text-[#a1a1aa] text-sm">Initiate password reset sequence.</p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] p-8 shadow-sm">
                    <form className="space-y-6">
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

                        <button className="w-full bg-[#ea580c] text-white font-bold py-3 hover:bg-[#c2410c] transition-all">
                            Send Recovery Token
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
