import Link from "next/link";

export default function Pricing() {
    return (
        <div className="py-24 px-4 bg-[#0c0c0e]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Transparent <span className="text-[#ea580c]">Pricing</span>
                    </h2>
                    <p className="text-[#a1a1aa] text-lg">No hidden fees. Pay for output.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a]">

                    <div className="bg-[#09090b] p-8 flex flex-col items-start">
                        <div className="inline-block px-3 py-1 bg-[#27272a] text-[#muted] text-xs font-mono mb-6 uppercase tracking-widest">Single Asset</div>
                        <h3 className="text-white text-2xl font-bold mb-2">On-Demand</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">₦5,000</span>
                            <span className="text-[#a1a1aa] text-sm">/video</span>
                        </div>
                        <p className="text-[#a1a1aa] text-sm mb-8 leading-relaxed">
                            Perfect for rapid testing and one-off campaigns. Includes full escrow protection.
                        </p>
                        <button className="w-full py-4 border border-[#27272a] text-white hover:bg-[#18181b] transition-colors font-medium text-sm">
                            Start New Project
                        </button>
                        <ul className="mt-8 space-y-4 w-full">
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> ₦500 Rejection Fee</li>
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> 1080p Export</li>
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> Standard Assets</li>
                        </ul>
                    </div>


                    <div className="bg-[#09090b] p-8 flex flex-col items-start relative">
                        <div className="absolute top-0 right-0 bg-[#ea580c] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Best Value</div>
                        <div className="inline-block px-3 py-1 bg-[#ea580c]/10 text-[#ea580c] text-xs font-mono mb-6 uppercase tracking-widest">Subscription</div>
                        <h3 className="text-white text-2xl font-bold mb-2">Creator</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">₦20,000</span>
                            <span className="text-[#a1a1aa] text-sm">/month</span>
                        </div>
                        <p className="text-[#a1a1aa] text-sm mb-8 leading-relaxed">
                            For agencies shipping volume. Priority queue and higher quality renders.
                        </p>
                        <button className="w-full py-4 bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors font-medium text-sm">
                            Subscribe Now
                        </button>
                        <ul className="mt-8 space-y-4 w-full">
                            <li className="flex gap-3 text-sm text-white items-center"><Check active /> 5 Videos Included</li>
                            <li className="flex gap-3 text-sm text-white items-center"><Check active /> 4K Ultra HD</li>
                            <li className="flex gap-3 text-sm text-white items-center"><Check active /> Custom Brand Kit</li>
                        </ul>
                    </div>


                    <div className="bg-[#09090b] p-8 flex flex-col items-start">
                        <div className="inline-block px-3 py-1 bg-[#27272a] text-[#muted] text-xs font-mono mb-6 uppercase tracking-widest">Organization</div>
                        <h3 className="text-white text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">Custom</span>
                        </div>
                        <p className="text-[#a1a1aa] text-sm mb-8 leading-relaxed">
                            Full API access, dedicated account management, and custom model fine-tuning.
                        </p>
                        <button className="w-full py-4 border border-[#27272a] text-white hover:bg-[#18181b] transition-colors font-medium text-sm">
                            Contact Sales
                        </button>
                        <ul className="mt-8 space-y-4 w-full">
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> API Access</li>
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> Custom AI Models</li>
                            <li className="flex gap-3 text-sm text-[#d4d4d8] items-center"><Check /> SLA Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Check({ active }: { active?: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#ea580c" : "#52525b"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
