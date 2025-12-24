import Image from "next/image";

export default function CTA() {
    return (
        <div className="mt-20 px-4 max-w-6xl mx-auto mb-20">
            <div className="relative rounded-3xl overflow-hidden bg-[#FF6C00] px-6 py-16 sm:px-16 sm:py-24 text-center">

                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute left-0 bottom-0 w-64 h-64 bg-black rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                </div>

                <h2 className="relative z-10 text-3xl sm:text-5xl font-bold text-white mb-6">
                    Ready to hire your AI Freelancer?
                </h2>
                <p className="relative z-10 text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                    Join thousands of marketers creating broadcast-quality ads at a fraction of the cost. No risk. Escrow protected.
                </p>

                <button className="relative z-10 bg-white text-[#FF6C00] font-bold text-lg px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all transform hover:scale-105 shadow-xl">
                    Create Your First Ad
                </button>
            </div>
        </div>
    );
}
