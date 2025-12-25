"use client";

import { useState } from "react";
import Link from 'next/link';
import {
    Settings,
    LayoutTemplate,
    CreditCard,
    History,
    FolderOpen,
    ImageIcon,
    HelpCircle,
    User,
    LogOutIcon,
    Menu,
    X,
    Ticket,
    UserPlus,
} from "lucide-react";
import { Toaster } from "sonner";

import { useLanguage } from "../context/language-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const { t } = useLanguage();

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleInvite = () => {
        if (inviteEmail) {
            alert(`Invitation sent to ${inviteEmail}`);
            setInviteEmail("");
        }
    }

    return (
        <div className="min-h-screen bg-[#09090b] flex font-sans text-[#a1a1aa] relative">
            <Toaster position="top-right" theme="dark" />

            <div className="fixed top-0 left-0 right-0 h-16 bg-[#0c0c0e] border-b border-[#27272a] flex items-center justify-between px-4 md:hidden z-40">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
                    <span className="text-white font-bold tracking-tight">Motion Pipe</span>
                </Link>
            </div>

            <aside className={`w-64 border-r border-[#27272a] flex flex-col fixed h-full bg-[#0c0c0e] transition-transform duration-300 z-50 ${mobileMenuOpen ? "translate-x-0 bg-black/95 backdrop-blur-xl w-full" : "-translate-x-full"
                } md:translate-x-0 pt-16 md:pt-0 w-64`}>

                <button onClick={toggleMenu} className="absolute top-4 right-4 md:hidden text-white p-2">
                    <X />
                </button>

                <Link href="/" className="h-16 hidden md:flex items-center px-6 border-b border-[#27272a]">
                    <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm mr-3" />
                    <span className="text-white font-bold tracking-tight">Motion Pipe</span>
                </Link>

                <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Workspace</p>
                        <NavItem href="/dashboard" icon={LayoutTemplate} label={t('dash_home')} onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/assets" icon={FolderOpen} label={t('dash_assets')} onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/tickets" icon={Ticket} label={t('dash_tickets')} onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/templates" icon={ImageIcon} label={t('dash_templates')} onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/history" icon={History} label={t('dash_history')} onClick={() => setMobileMenuOpen(false)} />
                    </div>

                    <div className="px-2 mb-4">
                        <p className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Collaborate</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="teammate@email.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className="bg-[#18181b] border border-[#27272a] rounded px-2 py-1.5 text-xs text-white w-full outline-none focus:border-[#3b82f6]"
                            />
                            <button onClick={handleInvite} className="bg-[#3b82f6] text-white p-1.5 rounded hover:bg-blue-600">
                                <UserPlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Finance</p>
                        <NavItem href="/dashboard/billing" icon={CreditCard} label={t('dash_billing')} onClick={() => setMobileMenuOpen(false)} />
                    </div>

                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">System</p>
                        <NavItem href="/dashboard/profile" icon={User} label="Profile" onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/settings" icon={Settings} label={t('dash_settings')} onClick={() => setMobileMenuOpen(false)} />
                        <NavItem href="/dashboard/support" icon={HelpCircle} label={t('dash_support')} onClick={() => setMobileMenuOpen(false)} />
                    </div>
                </nav>

                <div className="p-4 border-t border-[#27272a]">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium hover:bg-[#18181b] hover:text-red-500 text-[#a1a1aa] mb-2">
                        <LogOutIcon className="w-4 h-4" />
                        Log Out
                    </button>
                    <div className="flex items-center gap-3 px-2 py-2">
                        <img src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full bg-[#27272a]" alt="User" />
                        <div>
                            <p className="text-sm text-white font-medium">John Doe</p>
                            <p className="text-xs text-[#52525b]">Pay-As-You-Go</p>
                        </div>
                    </div>
                </div>
            </aside>

            {!mobileMenuOpen && (
                <button
                    onClick={toggleMenu}
                    className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#3b82f6] rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:scale-110 transition-transform"
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, href, onClick }: { icon: any, label: string, href: string, onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium hover:bg-[#18181b] hover:text-white"
        >
            <Icon className="w-4 h-4 text-[#52525b]" />
            {label}
        </Link>
    )
}
