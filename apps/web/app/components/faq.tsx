"use client";
import { useState } from "react";

export default function FAQ() {
    const faqs = [
        {
            question: "Escrow Protection Policy",
            answer: "Funds are held by Paystack Escrow. You inspect the video preview. Approve to release, or reject to get refunded minus a ₦1,000 compute fee."
        },
        {
            question: "Commercial Rights & Asset Usage",
            answer: "You own full rights to the generated video upon payment release. We use licensed stock music and cleared voiceovers."
        },
        {
            question: "Automated Asset Discovery",
            answer: "Our Selenium bot crawls your provided URL for logos and product shots. You can manually override these in the dashboard."
        },
        {
            question: "Average Generation Latency",
            answer: "Standard: 2-5 minutes. Priority (Creator Plan): <90 seconds. We use parallel processing nodes."
        }
    ];

    return (
        <div className="py-24 bg-[#0c0c0e] border-b border-[#27272a] px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 tracking-tight">System FAQ</h2>
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
