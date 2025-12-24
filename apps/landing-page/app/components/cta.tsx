import Image from "next/image";

export default function CTA() {
    return (
        <div className="py-24 px-4 bg-[#09090b]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                    Start Broadcasting.
                </h2>
                <p className="text-[#a1a1aa] text-lg mb-10 max-w-xl mx-auto">
                    Join the agencies producing high-conversion ads without the studio costs.
                </p>
                <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white text-lg font-bold px-10 py-5 rounded-lg transition-all">
                    Create Ad - ₦5000
                </button>
            </div>
        </div>
    );
}
