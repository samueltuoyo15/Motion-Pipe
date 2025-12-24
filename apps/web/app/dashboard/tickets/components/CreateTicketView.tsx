"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CreateTicketView({ onBack }: { onBack: () => void }) {
    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("technical");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject.trim()) {
            toast.error("Please enter a subject.");
            return;
        }
        if (!message.trim()) {
            toast.error("Please describe your issue.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Ticket created successfully!");
            onBack();
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col">
            <header className="h-16 border-b border-[#27272a] flex items-center gap-4 px-6 bg-[#0c0c0e]">
                <button onClick={onBack} className="text-[#a1a1aa] hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-white tracking-tight">Create New Ticket</h1>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl mx-auto bg-[#18181b] border border-[#27272a] rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-white mb-2">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-[#09090b] border border-[#27272a] p-3 text-white text-sm rounded focus:border-[#3b82f6] outline-none transition-colors"
                                placeholder="E.g. Rendering failed..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-white mb-2">Department</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#09090b] border border-[#27272a] p-3 text-white text-sm rounded focus:border-[#3b82f6] outline-none transition-colors"
                            >
                                <option value="technical">Technical Support</option>
                                <option value="billing">Billing & Escrow</option>
                                <option value="feature">Feature Request</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-white mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full h-48 bg-[#09090b] border border-[#27272a] p-3 text-white text-sm rounded focus:border-[#3b82f6] outline-none transition-colors resize-none"
                                placeholder="Describe the issue in detail..."
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button type="button" onClick={onBack} className="px-6 py-2 text-[#a1a1aa] hover:text-white text-sm font-medium">Cancel</button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#3b82f6] hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? "Creating..." : "Create Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
