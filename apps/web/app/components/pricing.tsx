import Link from "next/link";
import { useLanguage } from "../context/language-context";

export default function Pricing() {
    const { t } = useLanguage();

    return (
        <div className="py-24 px-4 bg-[#0c0c0e]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        {t('pricing_title')} <span className="text-[#3b82f6]">{t('pricing_subtitle')}</span>
                    </h2>
                    <p className="text-[#a1a1aa] text-lg">{t('pricing_desc')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#27272a] border border-[#27272a]">

                    <div className="bg-[#09090b] p-8 flex flex-col items-start relative group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#3b82f6]" />
                        <h3 className="text-white font-bold text-xl mb-2">{t('pay_go')}</h3>
                        <p className="text-[#a1a1aa] text-sm mb-6 h-10">{t('pay_go_desc')}</p>
                        <div className="text-3xl font-bold text-white mb-6">₦10,000 <span className="text-sm font-normal text-[#52525b]">{t('pay_go_price')}</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>{t('feat_4k')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>{t('feat_voice')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>{t('feat_watermark')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white">
                                <CheckIcon active /> <span>{t('feat_protection')}</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-sm transition-colors">
                            {t('start_project')}
                        </button>
                    </div>

                    <div className="bg-[#09090b] p-8 flex flex-col items-start">
                        <h3 className="text-white font-bold text-xl mb-2">{t('enterprise')}</h3>
                        <p className="text-[#a1a1aa] text-sm mb-6 h-10">{t('enterprise_desc')}</p>
                        <div className="text-3xl font-bold text-white mb-6">{t('enterprise_price')}</div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>{t('feat_gpu')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>{t('feat_models')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                                <CheckIcon /> <span>{t('feat_support')}</span>
                            </li>
                        </ul>
                        <button className="w-full py-3 border border-[#27272a] text-white font-bold text-sm hover:bg-[#18181b] transition-colors">
                            {t('btn_contact')}
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
