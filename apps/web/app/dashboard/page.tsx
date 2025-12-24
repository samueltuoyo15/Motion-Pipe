"use client";

import { useState } from "react";
import { Terminal, Play, Loader2, Globe, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function EditorPage() {
    return (
        <div className="h-screen flex flex-col">

            <header className="h-16 border-b border-[#27272a] flex items-center justify-between px-6 bg-[#09090b]">
                <div className="flex items-center gap-4">
                    <h1 className="text-white font-bold tracking-tight">Project: Black Friday Promo</h1>
                    <span className="px-2 py-0.5 rounded bg-[#27272a] text-[#a1a1aa] text-xs font-mono">DRAFT</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#3b82f6] bg-[#3b82f6]/10 px-3 py-1.5 rounded animate-pulse">
                        <span className="w-2 h-2 bg-[#3b82f6] rounded-full" />
                        SYSTEM ONLINE
                    </div>
                    <button className="bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded transition-all">
                        Export to Escrow
                    </button>
                </div>
            </header>


            <div className="flex-1 flex overflow-hidden">


                <div className="w-80 border-r border-[#27272a] bg-[#0c0c0e] flex flex-col">
                    <div className="p-4 border-b border-[#27272a]">
                        <h2 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-4">Command Center</h2>
                        <div className="space-y-4">
                            <div className="bg-[#18181b] border border-[#27272a] p-3 rounded">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-white font-medium">Auto-Discovery</span>
                                    <Globe className="w-3 h-3 text-[#ea580c]" />
                                </div>
                                <p className="text-xs text-[#a1a1aa]">Selenium Active. Crawling product assets...</p>
                            </div>
                            <div className="bg-[#18181b] border border-[#27272a] p-3 rounded opacity-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-white font-medium">Generation</span>
                                    <Loader2 className="w-3 h-3 text-[#a1a1aa]" />
                                </div>
                                <p className="text-xs text-[#a1a1aa]">Waiting for brief approval.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2">
                        <p className="text-[#52525b] border-b border-[#27272a] pb-2 mb-2">SYSTEM LOGS</p>
                        <div className="text-[#a1a1aa]"><span className="text-[#3b82f6]">[19:42:01]</span> Connection established</div>
                        <div className="text-[#a1a1aa]"><span className="text-[#3b82f6]">[19:42:02]</span> Loading cached assets...</div>
                        <div className="text-white"><span className="text-[#3b82f6]">[19:42:05]</span> Ready for input.</div>
                    </div>
                </div>


                <div className="flex-1 bg-[#050505] relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />


                    <div className="w-[80%] aspect-video bg-[#09090b] border border-[#27272a] rounded flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 bg-[#18181b] rounded-full flex items-center justify-center mb-4">
                            <Play className="w-6 h-6 text-[#27272a] ml-1" />
                        </div>
                        <h3 className="text-white font-medium mb-2">No Preview Generated</h3>
                        <p className="text-[#52525b] text-sm max-w-md">Initialize the generation sequence from the right panel to begin construction.</p>
                    </div>
                </div>


                <div className="w-96 border-l border-[#27272a] bg-[#0c0c0e] flex flex-col overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-6">Brief Configuration</h2>

                        <div className="space-y-6">

                            <div>
                                <label className="block text-xs text-[#a1a1aa] mb-2 font-medium">Product Asset</label>
                                <div className="border border-dashed border-[#27272a] bg-[#18181b] p-4 rounded text-center hover:border-[#ea580c] transition-colors cursor-pointer group">
                                    <div className="mb-3 flex justify-center">
                                        <div className="w-full h-32 bg-[#09090b] rounded overflow-hidden relative border border-[#27272a]">
                                            <Image src="/water_bottle_mockup.png" width={200} height={200} alt="Product Preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs text-white font-medium">Change Asset</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#a1a1aa]">Drag & drop product image or <span className="text-[#ea580c]">Browse</span></p>
                                    <p className="text-[10px] text-[#52525b] mt-1">Supports PNG, JPG, WEBP (Max 10MB)</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-[#a1a1aa] mb-2 font-medium">Product URL</label>
                                <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#ea580c] focus:outline-none" placeholder="https://..." />
                            </div>

                            <div>
                                <label className="block text-xs text-[#a1a1aa] mb-2 font-medium">Ad Goal</label>
                                <textarea className="w-full h-32 bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] focus:outline-none resize-none" placeholder="Describe the desired outcome (e.g. 'High energy launch video for sneakers')..." />
                            </div>

                            <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/20 p-4 rounded">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-4 h-4 text-[#3b82f6] mt-0.5" />
                                    <div>
                                        <p className="text-xs text-[#3b82f6] font-bold mb-1">Escrow Estimation</p>
                                        <p className="text-[#a1a1aa] text-xs">Based on this brief, estimated cost is <span className="text-white font-mono">₦5,000</span>. Funds held safely until approval.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-3 text-sm transition-all">
                                Generate Proposal
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
