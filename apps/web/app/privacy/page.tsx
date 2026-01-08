import Header from "../components/header";
import Footer from "../components/footer";

export default function PrivacyPolicy() {
    return (
        <main className="flex flex-col w-full bg-[#09090b] min-h-screen">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Privacy Policy
                </h1>
                <p className="text-[#52525b] text-sm mb-12 font-mono">Last Updated: December 25, 2025</p>

                <div className="space-y-8 text-[#a1a1aa] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Privacy</h2>
                        <p>
                            Motion Pipe takes your privacy seriously. This policy explains what data we collect, why we need it,
                            and how we protect it. We don't sell your data, we don't train public AI models on your content,
                            and we don't share your information with advertisers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">Account Information</h3>
                        <p className="mb-4">When you sign up, we collect:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Email address (for login and notifications)</li>
                            <li>Name (for personalization and invoicing)</li>
                            <li>Payment information (processed securely by Paystack, we never see your full card details)</li>
                            <li>Company name (optional, for business accounts)</li>
                        </ul>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">Content You Upload</h3>
                        <p className="mb-4">To generate videos and marketing assets, we process:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Product images and assets you upload</li>
                            <li>Product URLs you provide for asset discovery</li>
                            <li>Creative briefs and generation instructions</li>
                            <li>Brand guidelines and style preferences</li>
                        </ul>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">Usage Data</h3>
                        <p className="mb-4">We automatically collect:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Generation history and project metadata</li>
                            <li>Platform interactions (clicks, page views, feature usage)</li>
                            <li>Device information (browser type, OS, screen resolution)</li>
                            <li>IP address and approximate location (for fraud prevention)</li>
                            <li>Performance metrics (generation time, success rate, error logs)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Data</h2>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">To Provide the Service</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Generate videos based on your inputs</li>
                            <li>Store your projects and generation history</li>
                            <li>Process payments and manage escrow</li>
                            <li>Send transactional emails (generation complete, payment received, etc.)</li>
                        </ul>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">To Improve Motion Pipe</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                            <li>Analyze usage patterns to optimize our algorithms</li>
                            <li>Debug technical issues and improve reliability</li>
                            <li>Train internal models on aggregated, anonymized data</li>
                            <li>A/B test new features and interface improvements</li>
                        </ul>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">To Communicate</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Send important service updates and security alerts</li>
                            <li>Respond to support requests</li>
                            <li>Share product updates (you can opt out anytime)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Third Parties</h2>
                        <p className="mb-4">We share data only when necessary:</p>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">AI Service Providers</h3>
                        <p className="mb-4">
                            Your content is processed by our generative video partners and audio synthesis providers.
                            These providers have their own privacy policies and data retention rules. We use enterprise agreements
                            that prohibit them from training public models on your data.
                        </p>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">Infrastructure Partners</h3>
                        <p className="mb-4">
                            We use enterprise-grade cloud storage for video optimization, high-performance caching, and Paystack for payments.
                            These services only access data necessary to perform their function.
                        </p>

                        <h3 className="text-lg font-bold text-white mb-3 mt-6">Legal Requirements</h3>
                        <p>
                            We may disclose data if required by law, court order, or to prevent fraud, abuse, or harm.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
                        <p className="mb-4">
                            Generated videos are stored for 90 days after creation. After that, they're permanently deleted unless
                            you download them. You can manually delete projects anytime from your dashboard.
                        </p>
                        <p className="mb-4">
                            Account data is retained as long as your account is active. If you delete your account,
                            we'll remove your personal information within 30 days, but may retain anonymized analytics data.
                        </p>
                        <p>
                            Payment records are kept for 7 years to comply with financial regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Security Measures</h2>
                        <p className="mb-4">We protect your data with:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>End-to-end encryption for data in transit (TLS 1.3)</li>
                            <li>Encryption at rest for stored files and databases</li>
                            <li>Regular security audits and penetration testing</li>
                            <li>Access controls and authentication (JWT tokens, role-based permissions)</li>
                            <li>Automated backups with geographic redundancy</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong className="text-white">Access:</strong> Request a copy of all data we have about you</li>
                            <li><strong className="text-white">Correction:</strong> Update inaccurate information in your account settings</li>
                            <li><strong className="text-white">Deletion:</strong> Delete your account and associated data</li>
                            <li><strong className="text-white">Portability:</strong> Export your generation history and project files</li>
                            <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing emails (transactional emails can't be disabled)</li>
                        </ul>
                        <p className="mt-4">
                            To exercise these rights, email <a href="mailto:motionpipehq@gmail.com" className="text-[#3b82f6] hover:underline">motionpipehq@gmail.com</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
                        <p className="mb-4">We use cookies for:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Session management (keeping you logged in)</li>
                            <li>Analytics (understanding how you use the platform)</li>
                            <li>Performance optimization (caching preferences)</li>
                        </ul>
                        <p className="mt-4">
                            You can disable cookies in your browser, but some features may not work properly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                        <p>
                            Motion Pipe is not intended for users under 18. We don't knowingly collect data from minors.
                            If you believe a child has created an account, contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
                        <p>
                            Your data may be processed in servers located outside Nigeria, including the United States and Europe.
                            We ensure these transfers comply with applicable data protection laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                        <p>
                            We'll update this policy as our service evolves. Material changes will be announced via email
                            30 days before taking effect. Continued use after changes means you accept the updated policy.
                        </p>
                    </section>

                    <section className="border-t border-[#27272a] pt-8">
                        <p className="text-sm text-[#52525b]">
                            Questions about privacy? Email us at <a href="mailto:motionpipehq@gmail.com" className="text-[#3b82f6] hover:underline">motionpipehq@gmail.com</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
