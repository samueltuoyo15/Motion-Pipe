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
    AlertCircle,
    FolderOpen,
    Image as ImageIcon,
    HelpCircle,
    User,
    LogOutIcon,
    Menu,
    X
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [activeTab, setActiveTab] = useState("editor");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <div className="min-h-screen bg-[#09090b] flex font-sans text-[#a1a1aa]">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-[#0c0c0e] border-b border-[#27272a] flex items-center justify-between px-4 md:hidden z-50">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
                    <span className="text-white font-bold tracking-tight">Motion Pipe</span>
                </div>
                <button onClick={toggleMenu} className="text-white p-2">
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar (Desktop + Mobile) */}
            <aside className={`w-64 border-r border-[#27272a] flex flex-col fixed h-full bg-[#0c0c0e] transition-transform duration-300 z-40 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 pt-16 md:pt-0`}>
                <div className="h-16 hidden md:flex items-center px-6 border-b border-[#27272a]">
                    <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm mr-3" />
                    <span className="text-white font-bold tracking-tight">Motion Pipe</span>
                </div>

                <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Workspace</p>
                        <NavItem icon={LayoutTemplate} label="Ad Editor" active={activeTab === "editor"} onClick={() => { setActiveTab("editor"); setMobileMenuOpen(false); }} />
                        <NavItem icon={FolderOpen} label="Assets" active={activeTab === "assets"} onClick={() => { setActiveTab("assets"); setMobileMenuOpen(false); }} />
                        <NavItem icon={ImageIcon} label="Templates" active={activeTab === "templates"} onClick={() => { setActiveTab("templates"); setMobileMenuOpen(false); }} />
                        <NavItem icon={History} label="History" active={activeTab === "history"} onClick={() => { setActiveTab("history"); setMobileMenuOpen(false); }} />
                    </div>

                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Finance</p>
                        <NavItem icon={CreditCard} label="Escrow & Billing" active={activeTab === "billing"} onClick={() => { setActiveTab("billing"); setMobileMenuOpen(false); }} />
                    </div>

                    <div>
                        <p className="px-2 text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">System</p>
                        <NavItem icon={User} label="Profile" active={activeTab === "profile"} onClick={() => { setActiveTab("profile"); setMobileMenuOpen(false); }} />
                        <NavItem icon={Settings} label="Settings" active={activeTab === "settings"} onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }} />
                        <NavItem icon={HelpCircle} label="Support" active={activeTab === "support"} onClick={() => { setActiveTab("support"); setMobileMenuOpen(false); }} />
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
                            <p className="text-xs text-[#52525b]">Free Plan</p>
                        </div>
                    </div>
                </div>
            </aside>


            <main className="flex-1 md:pl-64 pt-16 md:pt-0">
                {activeTab === "editor" && children}
                {activeTab === "billing" && <BillingPage />}
                {activeTab === "profile" && <ProfilePage />}
                {activeTab === "settings" && <SettingsPage />}
                {/* Fallback for other tabs */}
                {["assets", "templates", "history", "support"].includes(activeTab) && (
                    <div className="flex items-center justify-center h-full text-[#52525b] flex-col">
                        <Settings className="w-12 h-12 mb-4 opacity-20" />
                        <p>Module Under Construction</p>
                    </div>
                )}
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
            <Icon className={`w-4 h-4 ${active ? "text-[#3b82f6]" : "text-[#52525b]"}`} />
            {label}
        </button>
    )
}

// Inline Page Components for simplicity in this artifact
// Luhn Algorithm for credit card validation
function luhnCheck(val: string) {
    let checksum = 0;
    let j = 1;
    for (let i = val.length - 1; i >= 0; i--) {
        let calc = 0;
        calc = Number(val.charAt(i)) * j;
        if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
        }
        checksum = checksum + calc;
        if (j == 1) { j = 2 } else { j = 1 };
    }
    return (checksum % 10) == 0;
}

function BillingPage() {
    const [showAddCard, setShowAddCard] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setCardNumber(val);
        if (val.length > 12) {
            setIsValid(luhnCheck(val));
        } else {
            setIsValid(true); // Reset validity if card number is too short
        }
    };

    return (
        <div className="p-6 md:p-12 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Billing & Escrow</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Escrow Balance</p>
                    <p className="text-3xl font-bold text-white">₦ 0.00</p>
                </div>
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Pending Release</p>
                    <p className="text-3xl font-bold text-[#3b82f6]">₦ 0.00</p>
                </div>
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Total Spent</p>
                    <p className="text-3xl font-bold text-white">₦ 15,000</p>
                </div>
            </div>

            <h2 className="text-lg font-bold text-white mb-4">Payment Methods</h2>
            <div className="glass-panel border border-[#27272a] rounded-lg p-6 mb-12 bg-[#0c0c0e]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-[#18181b] rounded border border-[#27272a] flex items-center justify-center">
                            <span className="font-mono text-xs text-white">VISA</span>
                        </div>
                        <div>
                            <p className="text-white text-sm">Visa ending in 4242</p>
                            <p className="text-xs text-[#52525b]">Expires 12/28</p>
                        </div>
                    </div>
                    <button className="text-[#a1a1aa] hover:text-red-500 text-sm">Remove</button>
                </div>

                {!showAddCard ? (
                    <button onClick={() => setShowAddCard(true)} className="text-[#3b82f6] text-sm font-medium hover:underline">+ Add New Card</button>
                ) : (
                    <div className="mt-6 pt-6 border-t border-[#27272a] animate-slide-up-fade">
                        <h3 className="text-white text-sm font-bold mb-4">New Card Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Card Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        maxLength={19}
                                        value={cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')} // Format card number with spaces
                                        onChange={handleCardChange}
                                        className={`w-full bg-[#18181b] border ${isValid ? 'border-[#27272a] focus:border-[#3b82f6]' : 'border-red-500 focus:border-red-500'} px-3 py-2 text-white text-sm outline-none transition-colors`}
                                        placeholder="0000 0000 0000 0000"
                                    />
                                    {!isValid && cardNumber.length >= 13 && <span className="absolute right-3 top-2.5 text-red-500 text-xs">Invalid Card</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Expires</label>
                                    <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">CVV</label>
                                    <input type="text" maxLength={3} className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" placeholder="123" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button className="bg-[#3b82f6] text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-600 transition-colors">Save Card</button>
                            <button onClick={() => setShowAddCard(false)} className="text-[#a1a1aa] px-4 py-2 rounded text-sm font-medium hover:text-white transition-colors">Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <h2 className="text-lg font-bold text-white mb-4">Transaction History</h2>
            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#18181b] text-[#a1a1aa] font-mono text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Project</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a]">
                        <tr>
                            <td className="px-6 py-4 text-white">Dec 24, 2024</td>
                            <td className="px-6 py-4 text-[#a1a1aa]">Sneaker Launch Ad</td>
                            <td className="px-6 py-4"><span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-xs">Released</span></td>
                            <td className="px-6 py-4 text-right text-white">₦5,000</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-white">Dec 20, 2024</td>
                            <td className="px-6 py-4 text-[#a1a1aa]">Holiday Promo</td>
                            <td className="px-6 py-4"><span className="text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-0.5 rounded text-xs">Escrow</span></td>
                            <td className="px-6 py-4 text-right text-white">₦5,000</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-white">Dec 18, 2024</td>
                            <td className="px-6 py-4 text-[#a1a1aa]">Tech Demo #2</td>
                            <td className="px-6 py-4"><span className="text-[#a1a1aa] bg-[#27272a] px-2 py-0.5 rounded text-xs">Refunded</span></td>
                            <td className="px-6 py-4 text-right text-white">₦5,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SettingsPage() {
    return (
        <div className="p-6 md:p-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 mb-6">
                <h3 className="text-white font-bold mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#a1a1aa]">Email me when generation is complete</span>
                        <div className="w-10 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#a1a1aa]">Escrow release alerts</span>
                        <div className="w-10 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">API Access</h3>
                <p className="text-sm text-[#a1a1aa] mb-4">Manage your personal access tokens.</p>
                <div className="flex gap-2">
                    <input type="text" value="mp_live_..." disabled className="flex-1 bg-[#18181b] border border-[#27272a] px-3 py-2 text-[#52525b] text-sm font-mono cursor-not-allowed" />
                    <button className="border border-[#27272a] text-white px-4 py-2 rounded text-sm hover:bg-[#18181b]">Regenerate</button>
                </div>
            </div>
        </div>
    )
}

function ProfilePage() {
    return (
        <div className="p-6 md:p-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">UserProfile</h1>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="w-24 h-24 bg-[#18181b] rounded-full flex-shrink-0 relative group cursor-pointer">
                        <img src="https://github.com/shadcn.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white">Edit</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">First Name</label>
                                <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Last Name</label>
                                <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Email Address</label>
                            <input type="email" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="john@example.com" disabled />
                        </div>

                        <div className="pt-4">
                            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-600 transition-colors">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-lg">
                <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
                <p className="text-[#a1a1aa] text-sm mb-4">Permanently delete your account and all generated videos.</p>
                <button className="text-red-500 text-sm hover:underline font-medium">Delete Workspace</button>
            </div>
        </div>
    )
}
