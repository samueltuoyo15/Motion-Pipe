"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/language-context";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const consent = document.cookie
            .split("; ")
            .find((row) => row.startsWith("motion_pipe_consent="));

        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        document.cookie = "motion_pipe_consent=true; path=/; max-age=31536000; SameSite=Lax";
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[100] max-w-sm w-[calc(100vw-3rem)] md:w-full animate-in slide-in-from-bottom-10 fade-in duration-700 ease-out fill-mode-forwards">
            <div className="bg-[#0c0c0e]/90 backdrop-blur-md border border-[#27272a] p-6 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6] opacity-[0.03] blur-[60px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl shrink-0 text-[#3b82f6]">
                            <Cookie className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-base mb-1">{t('cookie_title')}</h3>
                            <p className="text-[#a1a1aa] text-sm leading-relaxed">
                                {t('cookie_text')}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={acceptCookies}
                            className="bg-[#white] bg-white hover:bg-gray-200 text-black font-semibold text-sm px-6 py-2.5 rounded-lg transition-all active:scale-95"
                        >
                            {t('cookie_accept')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
