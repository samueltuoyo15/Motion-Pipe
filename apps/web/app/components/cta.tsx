"use client";

import Link from "next/link";
import { useLanguage } from "../context/language-context";

export default function CTA() {
    const { t } = useLanguage();
    return (
        <div className="py-24 px-4 bg-[#09090b]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                    {t('cta_title')}
                </h2>
                <p className="text-[#a1a1aa] text-lg mb-10 max-w-xl mx-auto">
                    {t('cta_desc')}
                </p>
                <Link href="/register">
                    <button className="bg-[#3b82f6] hover:bg-blue-600 text-white text-lg font-bold px-10 py-5 rounded-lg transition-all">
                        {t('cta_button')}
                    </button>
                </Link>
            </div>
        </div>
    );
}
