import Header from "../components/header";
import Footer from "../components/footer";

export default function TermsOfService() {
    return (
        <main className="flex flex-col w-full bg-[#09090b] min-h-screen">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Terms of Service
                </h1>
                <p className="text-[#52525b] text-sm mb-12 font-mono">Last Updated: December 25, 2025</p>

                <div className="space-y-8 text-[#a1a1aa] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Welcome to Motion Pipe</h2>
                        <p>
                            Motion Pipe is a marketing automation platform that creates broadcast-ready motion graphics, product advertisements, and marketing images using AI.
                            By using our service, you're agreeing to these terms. We've written them to be as straightforward as possible,
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. What We Do</h2>
                        <p className="mb-4">
                            Motion Pipe generates video and image marketing content based on your product information and creative brief. We use AI models,
                            including advanced generative video models for synthesis, neural audio engines for voiceover, and proprietary algorithms for asset discovery
                            and composition.
                        </p>
                        <p>
                            You provide the product details, we handle the rest. The final output is yours to use commercially,
                            but we retain the right to showcase anonymized versions in our portfolio unless you explicitly opt out.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How Escrow Works</h2>
                        <p className="mb-4">
                            When you submit a generation request, funds are held in escrow through our payment processor, Paystack.
                            This protects both parties:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You don't pay until you approve the final video</li>
                            <li>We're guaranteed payment for completed work you accept</li>
                            <li>If you reject the video, funds are refunded minus a ₦1,000 processing fee</li>
                            <li>Escrow releases automatically 7 days after delivery if no action is taken</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Your Responsibilities</h2>
                        <p className="mb-4">You agree to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide accurate product information and assets</li>
                            <li>Own or have rights to all materials you upload</li>
                            <li>Not use the service for illegal, harmful, or misleading content</li>
                            <li>Not reverse-engineer, scrape, or abuse our API</li>
                            <li>Review generated videos within 7 days of delivery</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                        <p className="mb-4">
                            You retain full ownership of your product assets and brand materials. Once you pay for a generated video,
                            you own the output and can use it however you want—commercially, on any platform, forever.
                        </p>
                        <p>
                            We retain ownership of our platform, algorithms, and underlying technology. The Motion Pipe brand, logo,
                            and interface are our property.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Quality and Revisions</h2>
                        <p className="mb-4">
                            We aim for broadcast quality on every generation. If the output has technical issues (corrupted file,
                            wrong aspect ratio, audio sync problems), we'll regenerate at no cost.
                        </p>
                        <p>
                            Creative revisions (different music, alternate voiceover, style changes) require a new generation request
                            and separate payment. We're building an AI, not a traditional agency, so iteration works differently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability</h2>
                        <p className="mb-4">
                            We target 99.5% uptime, but we're dependent on third-party AI providers. If our generative models, audio synthesis engines,
                            or our infrastructure partners experience outages, your generation may be delayed.
                        </p>
                        <p>
                            Typical generation time is 2-15 minutes. If a job takes longer than 2 hours, you'll receive a notification
                            with an estimated completion time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Refunds and Cancellations</h2>
                        <p className="mb-4">
                            You can cancel a generation before it completes for a full refund. Once the video is delivered,
                            you have 7 days to approve or reject it.
                        </p>
                        <p>
                            Rejections incur a ₦1,000 fee to cover infrastructure costs. Repeated rejections without valid technical
                            reasons may result in account review.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Use</h2>
                        <p className="mb-4">You may not use Motion Pipe to create:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Deepfakes or misleading political content</li>
                            <li>Adult or explicit material</li>
                            <li>Content that infringes on others' intellectual property</li>
                            <li>Spam, scams, or fraudulent advertising</li>
                            <li>Hate speech or content promoting violence</li>
                        </ul>
                        <p className="mt-4">
                            We reserve the right to refuse service and terminate accounts that violate these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                        <p>
                            Motion Pipe is provided "as is." We're not liable for indirect damages, lost profits, or business interruption.
                            Our maximum liability is limited to the amount you paid for the specific generation in question.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                        <p>
                            We may update these terms as our service evolves. Material changes will be announced via email 30 days
                            before taking effect. Continued use after changes means you accept the new terms.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
