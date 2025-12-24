"use client";

import { useState } from "react";

export default function FAQ() {
    const faqs = [
        {
            question: "What happens if I don't like the video?",
            answer:
                "That's exactly why we built the Escrow system. If the AI output doesn't meet your standards, you can reject the delivery. You will only be charged a small $1 processing fee to cover basic compute costs, and the rest of your funds are returned instantly.",
        },
        {
            question: "Do I own the rights to the video and music?",
            answer:
                "Yes! Once payment is released, you get full commercial rights to the video, voiceover, and the licensed background music used in your ad.",
        },
        {
            question: "How does the 'Smart Asset Discovery' work?",
            answer:
                "We use custom Selenium agents to scan your provided website URL. They identify high-quality logos, product images, and brand colors to ensure the video matches your brand identity without you manually uploading files.",
        },
        {
            question: "How long does generation take?",
            answer:
                "On average, a 30-second ad takes about 2-5 minutes to generate. This includes video synthesis, voiceover rendering, and audio mixing.",
        },
    ];

    return (
        <div className="mt-20 px-4 max-w-3xl mx-auto mb-32">
            <h2 className="text-center text-[48px] text-[#FFFFFF] mb-12">
                Frequent <span className="text-[#FF6C00]">Questions</span>
            </h2>

            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-[#1C1C1C] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="p-6 flex justify-between items-center">
                <h3 className="text-white text-lg font-medium">{question}</h3>
                <span className={`text-[#FF6C00] text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    +
                </span>
            </div>
            <div
                className={`px-6 text-[#A1A1A1] overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {answer}
            </div>
        </div>
    );
}
