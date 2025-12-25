"use client";

import { HelpCircle, MessageSquare, Book, Mail, ExternalLink, Search } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    return (
        <div className="p-6 md:p-12 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
                <p className="text-[#a1a1aa] text-sm">Get help with Motion Pipe</p>
            </div>

            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#52525b]" />
                    <input
                        type="text"
                        placeholder="Search for help articles, guides, and FAQs..."
                        className="w-full bg-[#0c0c0e] border border-[#27272a] pl-12 pr-4 py-3 text-white text-sm rounded-lg focus:border-[#3b82f6] outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Link href="/dashboard/tickets" className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg hover:border-[#3b82f6] transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-[#18181b] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3b82f6]/10 transition-colors">
                        <MessageSquare className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-white font-bold mb-2 group-hover:text-[#3b82f6] transition-colors">Create Support Ticket</h3>
                    <p className="text-[#a1a1aa] text-sm mb-4">Get personalized help from our support team</p>
                    <span className="text-[#3b82f6] text-sm font-medium inline-flex items-center gap-1">
                        Open Tickets <ExternalLink className="w-4 h-4" />
                    </span>
                </Link>

                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg hover:border-[#3b82f6] transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-[#18181b] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#3b82f6]/10 transition-colors">
                        <Book className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-white font-bold mb-2 group-hover:text-[#3b82f6] transition-colors">Documentation</h3>
                    <p className="text-[#a1a1aa] text-sm mb-4">Browse our comprehensive guides and tutorials</p>
                    <span className="text-[#3b82f6] text-sm font-medium inline-flex items-center gap-1">
                        View Docs <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <FAQItem
                        question="How does the escrow system work?"
                        answer="Funds are held securely in escrow until you approve the final video. Once approved, payment is released to complete the transaction."
                    />
                    <FAQItem
                        question="What file formats are supported?"
                        answer="We support PNG, JPG, WEBP for images and MP4 for video outputs. Maximum file size is 50MB for uploads."
                    />
                    <FAQItem
                        question="How long does video generation take?"
                        answer="Most videos are generated within 5-15 minutes depending on complexity. You'll receive an email notification when complete."
                    />
                    <FAQItem
                        question="Can I cancel a generation in progress?"
                        answer="Yes, you can cancel any generation before it completes. Funds in escrow will be automatically refunded to your account."
                    />
                    <FAQItem
                        question="What happens if my generation fails?"
                        answer="If a generation fails, you won't be charged. Our team will investigate the issue and you can retry or contact support for assistance."
                    />
                </div>
            </div>

            <div className="bg-gradient-to-r from-[#3b82f6]/10 to-[#ea580c]/10 border border-[#3b82f6]/20 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2">Still need help?</h3>
                        <p className="text-[#a1a1aa] text-sm mb-4">Our support team is available 24/7 to assist you with any questions or issues.</p>
                        <a href="mailto:support@motionpipe.com" className="text-[#3b82f6] text-sm font-medium hover:underline">
                            support@motionpipe.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-5 hover:border-[#3b82f6]/50 transition-all">
            <h3 className="text-white font-medium mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                {question}
            </h3>
            <p className="text-[#a1a1aa] text-sm pl-7">{answer}</p>
        </div>
    );
}
