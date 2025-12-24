"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import {
    Terminal,
    Settings,
    LogOut,
    Play,
    Pause,
    CheckCircle2,
    Smartphone,
    LayoutTemplate,
    CreditCard,
    History,
    AlertCircle
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [activeTab, setActiveTab] = useState("editor");

    return (
        <div className="min-h-screen bg-[#09090b] flex font-sans text-[#a1a1aa]">

            <aside className="w-64 border-r border-[#27272a] flex flex-col fixed h-full bg-[#0c0c0e]">
                <div className="h-16 flex items-center px-6 border-b border-[#27272a]">
                    <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm mr-3" />
                    <span className="text-white font-bold tracking-tight">Motion Pipe</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <div className="mb-6">
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Workspace</p>
                        <NavItem icon={LayoutTemplate} label="Ads Editor" active={activeTab === "editor"} onClick={() => setActiveTab("editor")} />
                        <NavItem icon={History} label="History" active={activeTab === "history"} onClick={() => setActiveTab("history")} />
                    </div>

                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Finance</p>
                        <NavItem icon={CreditCard} label="Escrow" active={activeTab === "escrow"} onClick={() => setActiveTab("escrow")} />
                    </div>
                </nav>

                <div className="p-4 border-t border-[#27272a]">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 bg-[#27272a] rounded-full flex items-center justify-center text-xs font-bold text-white">
                            JD
                        </div>
                        <div>
                            <p className="text-sm text-white font-medium">John Doe</p>
                            <p className="text-xs text-[#52525b]">Free Plan</p>
                        </div>
                    </div>
                </div>
            </aside>


            <main className="flex-1 pl-64">
                {children}
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${active
                ? "bg-[#27272a] text-white"
                : "hover:bg-[#18181b] hover:text-white"
                }`}
        >
            <Icon className={`w-4 h-4 ${active ? "text-[#ea580c]" : "text-[#52525b]"}`} />
            {label}
        </button>
    )
}
