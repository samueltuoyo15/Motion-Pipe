import Link from "next/link";

export default function Pricing() {
    return (
        <div className="py-24 px-4 bg-[#0c0c0e]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Transparent <span className="text-[#3b82f6]">Pricing</span>
                    </h2>
                    <p className="text-[#a1a1aa] text-lg">No hidden fees. Pay for output.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a]">

                    <div className="bg-[#09090b] p-8 flex flex-col items-start">
                        <h3 className="text-white font-bold text-xl mb-2">Starter</h3>
                        <p className="text-[#a1a1aa] text-sm mb-6 h-10">For testing the waters.</p>
                        <div className="text-3xl font-bold text-white mb-6">Free</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>Watermarked Previews</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>Standard Asset Discovery</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 border border-[#27272a] text-white font-bold text-sm hover:bg-[#18181b] transition-colors">
                            Try Now
                        </button>
                    </div>

                    <div className="bg-[#09090b] p-8 flex flex-col items-start relative group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#3b82f6]" />
                        <h3 className="text-white font-bold text-xl mb-2">Pay-As-You-Go</h3>
                        <p className="text-[#a1a1aa] text-sm mb-6 h-10">For agencies & brands.</p>
                        <div className="text-3xl font-bold text-white mb-6">₦5,000 <span className="text-sm font-normal text-[#52525b]">/ Video</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>4K Broadcast Quality</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>AI Voiceover (ElevenLabs)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>No Watermark</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>Escrow Protection</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-sm transition-colors">
                            Start Project
                        </button>
                    </div>

                    <div className="bg-[#09090b] p-8 flex flex-col items-start">
                        <h3 className="text-white font-bold text-xl mb-2">Enterprise</h3>
                        <p className="text-[#a1a1aa] text-sm mb-6 h-10">High volume infrastructure.</p>
                        <div className="text-3xl font-bold text-white mb-6">Custom</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>Dedicated GPU Instances</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>Custom Brand Models</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>SLA & Support</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 border border-[#27272a] text-white font-bold text-sm hover:bg-[#18181b] transition-colors">
                            Contact Sales
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function CheckIcon({ active }: { active?: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#3b82f6" : "#52525b"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
