"use client";

import { useState } from "react";
import { luhnCheck } from "@/lib/utils/luhn";

export default function BillingPage() {
    const [showAddCard, setShowAddCard] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setCardNumber(val);
        if (val.length > 12) {
            setIsValid(luhnCheck(val));
        } else {
            setIsValid(true);
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
                    <button className="px-3 py-1.5 text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/50 rounded transition-all">Remove</button>
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
                                        value={cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
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
