import Link from "next/link";

export default function Pricing() {
    return (
        <div className="mt-32 px-4 max-w-7xl mx-auto mb-20">
            <h2 className="text-center text-[48px] text-[#FFFFFF]">
                Simple, Risk-Free <span className="text-[#FF6C00]">Pricing</span>
            </h2>
            <p className="text-center text-[20px] text-[#A1A1A1] mt-2 mb-16">
                No hidden fees. Pay for what you keep.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="bg-[#1C1C1C] border border-[#333] hover:border-[#FF6C00]/50 rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-[#A1A1A1] text-lg font-medium">On-Demand</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl text-white font-bold">$50</span>
                        <span className="text-[#A1A1A1]">/video</span>
                    </div>
                    <p className="mt-4 text-[#A1A1A1] text-sm">
                        Perfect for one-off campaigns and testing.
                    </p>

                    <ul className="mt-8 space-y-4 flex-1">
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> Pay $1 if rejected
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> 1080p Resolution
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> Standard Assets
                        </li>
                    </ul>

                    <button className="mt-8 w-full border border-[#FF6C00] text-[#FF6C00] py-3 rounded-full hover:bg-[#FF6C00] hover:text-white transition-colors">
                        Start Project
                    </button>
                </div>


                <div className="bg-[#FF6C00]/10 border border-[#FF6C00] rounded-2xl p-8 flex flex-col relative scale-105 shadow-[0_0_30px_rgba(255,108,0,0.1)]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6C00] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                    </div>
                    <h3 className="text-[#FF6C00] text-lg font-medium">Creator</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl text-white font-bold">$99</span>
                        <span className="text-[#A1A1A1]">/month</span>
                    </div>
                    <p className="mt-4 text-[#A1A1A1] text-sm">
                        For agencies and frequent shippers.
                    </p>

                    <ul className="mt-8 space-y-4 flex-1">
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon main /> 5 Videos Included
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon main /> 4K Ultra HD Export
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon main /> Priority Generation Queue
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon main /> Custom Brand Kit
                        </li>
                    </ul>

                    <button className="mt-8 w-full bg-[#FF6C00] text-white py-3 rounded-full hover:bg-[#FF8833] transition-colors shadow-lg">
                        Subscribe Now
                    </button>
                </div>


                <div className="bg-[#1C1C1C] border border-[#333] hover:border-[#FF6C00]/50 rounded-2xl p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-[#A1A1A1] text-lg font-medium">Enterprise</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl text-white font-bold">Custom</span>
                    </div>
                    <p className="mt-4 text-[#A1A1A1] text-sm">
                        High volume API access and dedicated support.
                    </p>

                    <ul className="mt-8 space-y-4 flex-1">
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> Unlimited Concurrent Jobs
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> Dedicated Account Manager
                        </li>
                        <li className="flex items-center gap-3 text-white text-sm">
                            <CheckIcon /> Custom AI Models
                        </li>
                    </ul>

                    <button className="mt-8 w-full border border-[#333] text-white py-3 rounded-full hover:bg-[#333] transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    );
}

function CheckIcon({ main = false }: { main?: boolean }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={main ? "#FF6C00" : "#A1A1A1"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
