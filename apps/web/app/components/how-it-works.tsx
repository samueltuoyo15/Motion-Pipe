"use client";

import Image from "next/image";
import { useLanguage } from "../context/language-context";

export default function HowItWorks() {
    const { t } = useLanguage();
    const steps = [
        {
            step: 1,
            title: "Submit Context",
            description:
                "Provide your product link or upload assets. Our smart bots trigger automated agents to scrape necessary brand assets automatically.",
        },
        {
            step: 2,
            title: "AI Production",
            description:
                "Advanced AI generates the video while our audio engine handles voiceovers. Everything is orchestrated in parallel for speed.",
        },
        {
            step: 3,
            title: "Review Preview",
            description:
                "Watch a watermarked, low-res preview of your generated ad. Request minor tweaks or regenerate sections.",
        },
        {
            step: 4,
            title: "Escrow Release",
            description:
                "Love it? Release the payment from escrow to download the 4k broadcast-ready file. Hate it? Reject and pay only a ₦1,000 processing fee.",
        },
    ];

    return (
        <div className="mt-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-center text-[48px] text-[#FFFFFF] mb-16">
                {t('how_it_works').split(' ').slice(0, -1).join(' ')} <span className="text-[#3b82f6]">{t('how_it_works').split(' ').slice(-1)}</span>
            </h2>

            <div className="relative">

                <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/50 to-[#3b82f6]/0" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">

                            <div className="w-12 h-12 rounded-full bg-[#1C1C1C] border border-[#3b82f6] flex items-center justify-center text-[#3b82f6] font-bold text-xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                                {item.step}
                            </div>

                            <h3 className="text-[#FFFFFF] text-xl font-semibold mb-3">
                                {item.title}
                            </h3>
                            <p className="text-[#A1A1A1] text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
