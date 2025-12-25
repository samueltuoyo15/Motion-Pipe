import Header from "../components/header";
import Footer from "../components/footer";

export default function EscrowAgreement() {
    return (
        <main className="flex flex-col w-full bg-[#09090b] min-h-screen">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Escrow Agreement
                </h1>
                <p className="text-[#52525b] text-sm mb-12 font-mono">Last Updated: December 25, 2024</p>

                <div className="space-y-8 text-[#a1a1aa] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">How Escrow Protects You</h2>
                        <p>
                            Motion Pipe uses escrow to ensure fair transactions. Your payment is held securely until you approve
                            the final video. This protects you from paying for work you don't accept, and protects us from
                            delivering work without compensation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Escrow Process Overview</h2>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 my-6">
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">You Submit a Request</h3>
                                        <p className="text-sm">Upload your product details and creative brief. We estimate the cost upfront.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Funds Are Held</h3>
                                        <p className="text-sm">Payment is authorized and held by Paystack. You're not charged yet.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">We Generate the Video</h3>
                                        <p className="text-sm">Our AI pipeline creates your video (typically 2-15 minutes).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">You Review and Decide</h3>
                                        <p className="text-sm">You have 7 days to approve or reject the video.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Funds Are Released</h3>
                                        <p className="text-sm">If approved (or no action after 7 days), payment is released to Motion Pipe.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Payment Authorization</h2>
                        <p className="mb-4">
                            When you submit a generation request, you authorize Paystack to hold the estimated amount.
                            This is not a charge—it's a temporary hold that ensures funds are available when the work is approved.
                        </p>
                        <p>
                            The hold expires after 7 days if you reject the video or if we fail to deliver.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Approval Criteria</h2>
                        <p className="mb-4">You should approve the video if it meets these standards:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Video plays without corruption or technical errors</li>
                            <li>Correct aspect ratio and resolution as specified</li>
                            <li>Audio and video are properly synchronized</li>
                            <li>Content matches your product and creative brief</li>
                            <li>No placeholder assets or watermarks (unless requested)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Rejection Policy</h2>
                        <p className="mb-4">
                            You can reject a video if it has technical defects or doesn't match your brief. Valid rejection reasons include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>File is corrupted or won't play</li>
                            <li>Wrong product shown or major factual errors</li>
                            <li>Audio is missing, distorted, or out of sync</li>
                            <li>Video doesn't match the specified duration or format</li>
                        </ul>
                        <p className="mb-4">
                            Rejections incur a <strong className="text-white">₦500 processing fee</strong> to cover infrastructure costs
                            (GPU time, API calls, storage). This fee is deducted from your escrow refund.
                        </p>
                        <p>
                            Subjective preferences ("I don't like the music choice" or "Can you make it more energetic?") are not valid
                            rejection reasons. For creative changes, submit a new generation request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Automatic Release</h2>
                        <p>
                            If you don't approve or reject the video within 7 days of delivery, escrow automatically releases to Motion Pipe.
                            You'll receive email reminders at 3 days and 1 day before auto-release.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Cancellation Before Delivery</h2>
                        <p className="mb-4">
                            You can cancel a generation anytime before the video is delivered. Refund policy:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong className="text-white">Before generation starts:</strong> Full refund</li>
                            <li><strong className="text-white">During generation (0-50% complete):</strong> 75% refund</li>
                            <li><strong className="text-white">During generation (50-99% complete):</strong> 50% refund</li>
                            <li><strong className="text-white">After delivery:</strong> No refund (use rejection process instead)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Dispute Resolution</h2>
                        <p className="mb-4">
                            If you believe a rejection was unfairly denied or a video doesn't meet quality standards,
                            contact motionpipehq@gmail.com within 48 hours of the dispute.
                        </p>
                        <p>
                            Our team will review the video, your brief, and the rejection reason. We'll respond within 2 business days
                            with a resolution. In cases where fault is unclear, we may offer a partial refund or free regeneration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Escrow Fees</h2>
                        <p className="mb-4">
                            Paystack charges a processing fee (typically 1.5% + ₦100) on all transactions. This fee is included
                            in the quoted price—you don't pay extra.
                        </p>
                        <p>
                            The ₦500 rejection fee covers our actual costs (cloud compute, API usage, storage) and is not a profit center.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Fraud Prevention</h2>
                        <p className="mb-4">
                            We monitor for abuse patterns, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Repeated rejections without valid technical reasons</li>
                            <li>Downloading videos before rejecting them</li>
                            <li>Requesting regenerations with identical briefs</li>
                        </ul>
                        <p className="mt-4">
                            Accounts flagged for abuse may have escrow privileges revoked or be required to pay upfront.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Escrow Terms</h2>
                        <p>
                            We may adjust escrow terms (fees, timelines, rejection criteria) with 30 days notice.
                            Changes only apply to new generations, not those already in escrow.
                        </p>
                    </section>

                    <section className="border-t border-[#27272a] pt-8">
                        <p className="text-sm text-[#52525b]">
                            Questions about escrow? Email us at <a href="mailto:motionpipehq@gmail.com" className="text-[#3b82f6] hover:underline">motionpipehq@gmail.com</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
