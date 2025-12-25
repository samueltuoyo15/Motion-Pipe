"use client";
import { useState } from "react";
import { useLanguage } from "../context/language-context";

export default function FAQ() {
    const { t } = useLanguage();

    const faqs = [
        {
            question: t('faq_1_q'),
            answer: t('faq_1_a')
        },
        {
            question: t('faq_2_q'),
            answer: t('faq_2_a')
        },
        {
            question: t('faq_3_q'),
            answer: t('faq_3_a')
        },
        {
            question: t('faq_4_q'),
            answer: t('faq_4_a')
        }
    ];

    return (
        <div className="py-24 bg-[#0c0c0e] border-b border-[#27272a] px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 tracking-tight">{t('faq_title')}</h2>
                <div className="space-y-px bg-[#27272a] border border-[#27272a]">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-[#09090b] p-6 hover:bg-[#18181b] transition-colors">
                            <h3 className="text-white font-bold mb-2">{faq.question}</h3>
                            <p className="text-[#a1a1aa] text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
