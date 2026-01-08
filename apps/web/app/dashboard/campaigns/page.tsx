"use client";

import { useState } from "react";
import { Upload, Video, Image as ImageIcon, Calendar, Clock, CheckCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState<"create" | "scheduled">("create");
    const [selectedType, setSelectedType] = useState<"video" | "image">("image");
    const [prompt, setPrompt] = useState("");
    const [frequency, setFrequency] = useState("one-time");

    const handleCreate = () => {
        if (!prompt) return toast.error("Please enter a prompt or brief");
        toast.success("Campaign scheduled successfully!");
        setActiveTab("scheduled");
    };

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Marketing Studio</h1>
                    <p className="text-[#a1a1aa]">Create and schedule AI-generated marketing campaigns.</p>
                </div>
                <div className="flex bg-[#18181b] p-1 rounded-lg border border-[#27272a] w-fit">
                    <button
                        onClick={() => setActiveTab("create")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "create" ? "bg-[#27272a] text-white shadow-sm" : "text-[#a1a1aa] hover:text-white"}`}
                    >
                        Create New
                    </button>
                    <button
                        onClick={() => setActiveTab("scheduled")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "scheduled" ? "bg-[#27272a] text-white shadow-sm" : "text-[#a1a1aa] hover:text-white"}`}
                    >
                        Scheduled
                    </button>
                </div>
            </div>

            {activeTab === "create" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#27272a] flex items-center justify-center text-xs">1</span>
                                Select Asset Type
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedType("video")}
                                    className={`relative p-4 rounded-xl border transition-all text-left group overflow-hidden ${selectedType === "video" ? "border-[#3b82f6] bg-[#3b82f6]/10" : "border-[#27272a] bg-[#18181b] hover:border-[#52525b]"}`}
                                >
                                    <Video className={`w-6 h-6 mb-3 ${selectedType === "video" ? "text-[#3b82f6]" : "text-[#a1a1aa]"}`} />
                                    <h4 className="text-white font-medium mb-1">Motion Video</h4>
                                    <p className="text-[#a1a1aa] text-xs leading-relaxed">30s commercial with AI voiceover & music.</p>
                                    {selectedType === "video" && <div className="absolute top-2 right-2 text-[#3b82f6]"><CheckCircle className="w-4 h-4" /></div>}
                                </button>
                                <button
                                    onClick={() => setSelectedType("image")}
                                    className={`relative p-4 rounded-xl border transition-all text-left group overflow-hidden ${selectedType === "image" ? "border-[#3b82f6] bg-[#3b82f6]/10" : "border-[#27272a] bg-[#18181b] hover:border-[#52525b]"}`}
                                >
                                    <ImageIcon className={`w-6 h-6 mb-3 ${selectedType === "image" ? "text-[#3b82f6]" : "text-[#a1a1aa]"}`} />
                                    <h4 className="text-white font-medium mb-1">Marketing Image</h4>
                                    <p className="text-[#a1a1aa] text-xs leading-relaxed">High-res poster, social post, or ad banner.</p>
                                    {selectedType === "image" && <div className="absolute top-2 right-2 text-[#3b82f6]"><CheckCircle className="w-4 h-4" /></div>}
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#27272a] flex items-center justify-center text-xs">2</span>
                                Creative Brief
                            </h3>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`Describe your ${selectedType === 'video' ? 'video commercial' : 'marketing image'}... \nExample: A futuristic sneaker advertisement with neon lights, urban background, energetic mood.`}
                                className="w-full h-40 bg-[#18181b] border border-[#27272a] rounded-lg p-4 text-white placeholder-[#52525b] focus:outline-none focus:border-[#3b82f6] resize-none"
                            />
                            <div className="flex justify-between items-center mt-3">
                                <button className="text-xs text-[#3b82f6] hover:underline flex items-center gap-1">
                                    <Upload className="w-3 h-3" /> Upload Brand Assets
                                </button>
                                <span className="text-xs text-[#52525b]">{prompt.length} chars</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-xl p-6 sticky top-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#27272a] flex items-center justify-center text-xs">3</span>
                                Distribution & Schedule
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider mb-3 block">Post to Channels</label>
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 bg-[#18181b] border border-[#27272a] rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#3b82f6] transition-colors group">
                                            <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            <span className="text-xs text-[#a1a1aa] group-hover:text-white">X / Twitter</span>
                                        </button>
                                        <button className="flex-1 py-3 bg-[#18181b] border border-[#27272a] rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#0077b5] transition-colors group">
                                            <svg className="w-5 h-5 text-white group-hover:text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            <span className="text-xs text-[#a1a1aa] group-hover:text-white">LinkedIn</span>
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-[#52525b] mt-2 text-center">
                                        <Link href="/dashboard/settings" className="hover:text-[#3b82f6] underline">Connect accounts</Link> in Settings
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-[#a1a1aa] uppercase tracking-wider mb-3 block">Frequency</label>
                                    <select
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#3b82f6]"
                                    >
                                        <option value="one-time">Post Once (Immediately)</option>
                                        <option value="weekly">Every Week</option>
                                        <option value="bi-weekly">Every 2 Weeks</option>
                                        <option value="monthly">Every Month</option>
                                    </select>
                                </div>

                                {frequency !== "one-time" && (
                                    <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg p-3 flex gap-3 items-start">
                                        <Calendar className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
                                        <p className="text-xs text-[#3b82f6]">
                                            Campaign will automatically generate and post new content every week. You can review before posting in Settings.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-[#27272a]">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-[#a1a1aa]">Estimated Cost</span>
                                        <span className="text-white font-mono">₦{selectedType === 'video' ? '10,000' : '2,500'}</span>
                                    </div>
                                    <button
                                        onClick={handleCreate}
                                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Smartphone className="w-4 h-4" />
                                        Start Campaign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#0c0c0e] border border-[#27272a] rounded-xl overflow-hidden group hover:border-[#3b82f6]/50 transition-all">
                            <div className="h-40 bg-[#18181b] relative flex items-center justify-center">
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-medium uppercase border border-white/10 flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-orange-400" /> Scheduled
                                </div>
                                {i % 2 === 0 ? <Video className="w-8 h-8 text-[#52525b]" /> : <ImageIcon className="w-8 h-8 text-[#52525b]" />}
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 rounded bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-bold uppercase">Weekly</span>
                                    <span className="text-xs text-[#52525b]">• Next post: Tues, 10:00 AM</span>
                                </div>
                                <h4 className="text-white font-medium mb-1">Product Launch Series {i}</h4>
                                <p className="text-sm text-[#a1a1aa] line-clamp-2 mb-4">Focus on modern aesthetics, dark mode vibes, and high energy...</p>

                                <div className="flex items-center justify-between pt-4 border-t border-[#27272a]">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                                            <svg className="w-3 h-3 text-[#52525b]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                                            <svg className="w-3 h-3 text-[#52525b]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className="text-xs text-white hover:text-[#3b82f6]">Manage</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
