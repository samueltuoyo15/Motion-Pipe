import Header from "../components/header";
import Footer from "../components/footer";

export default function ServiceLevelAgreement() {
    return (
        <main className="flex flex-col w-full bg-[#09090b] min-h-screen">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Service Level Agreement
                </h1>
                <p className="text-[#52525b] text-sm mb-12 font-mono">Last Updated: December 25, 2025</p>

                <div className="space-y-8 text-[#a1a1aa] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Reliability</h2>
                        <p>
                            This Service Level Agreement (SLA) defines the performance standards Motion Pipe commits to.
                            We're building infrastructure-grade software, and we hold ourselves accountable to measurable targets.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Uptime Guarantee</h2>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 my-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-lg">Platform Availability</h3>
                                <span className="text-3xl font-bold text-[#3b82f6]">99.5%</span>
                            </div>
                            <p className="text-sm">
                                Motion Pipe will be operational and accessible 99.5% of the time each month.
                                This translates to a maximum of ~3.6 hours of downtime per month.
                            </p>
                        </div>

                        <p className="mb-4">
                            Uptime is measured from our monitoring systems and excludes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Scheduled maintenance (announced 48 hours in advance)</li>
                            <li>Downtime caused by third-party providers (Google, ElevenLabs, Cloudflare)</li>
                            <li>Issues caused by your network or device</li>
                            <li>DDoS attacks or other malicious activity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Generation Performance</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6">
                                <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Target Generation Time</p>
                                <p className="text-3xl font-bold text-white mb-2">2-15 min</p>
                                <p className="text-sm">For standard 15-30 second videos</p>
                            </div>
                            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6">
                                <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Success Rate</p>
                                <p className="text-3xl font-bold text-green-500 mb-2">95%+</p>
                                <p className="text-sm">Generations complete without errors</p>
                            </div>
                        </div>

                        <p className="mb-4">
                            If a generation takes longer than 2 hours, you'll receive an email with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Current status and estimated completion time</li>
                            <li>Option to cancel for a full refund</li>
                            <li>Explanation if there's a known issue</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Support Response Times</h2>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg overflow-hidden my-6">
                            <table className="w-full text-sm">
                                <thead className="bg-[#18181b] text-[#a1a1aa] font-mono text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Priority</th>
                                        <th className="px-6 py-3 text-left">Description</th>
                                        <th className="px-6 py-3 text-right">Response Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#27272a]">
                                    <tr>
                                        <td className="px-6 py-4 text-red-500 font-bold">Critical</td>
                                        <td className="px-6 py-4 text-white">Platform down, payment issues</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">1 hour</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-[#ea580c] font-bold">High</td>
                                        <td className="px-6 py-4 text-white">Generation failures, escrow disputes</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">4 hours</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-[#3b82f6] font-bold">Medium</td>
                                        <td className="px-6 py-4 text-white">Feature questions, billing inquiries</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">24 hours</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-[#a1a1aa] font-bold">Low</td>
                                        <td className="px-6 py-4 text-white">General questions, feature requests</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">48 hours</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-sm">
                            Response times are measured during business hours (9 AM - 6 PM WAT, Monday-Friday).
                            Critical issues are monitored 24/7.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Quality Standards</h2>
                        <p className="mb-4">Every generated video will meet these minimum standards:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong className="text-white">Resolution:</strong> Minimum 1080p (1920x1080), up to 4K available</li>
                            <li><strong className="text-white">Frame Rate:</strong> 30fps or 60fps as specified</li>
                            <li><strong className="text-white">Audio Quality:</strong> 192kbps AAC, stereo</li>
                            <li><strong className="text-white">Format:</strong> MP4 (H.264 codec) for maximum compatibility</li>
                            <li><strong className="text-white">File Integrity:</strong> No corruption, plays in all major video players</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Backup and Recovery</h2>
                        <p className="mb-4">
                            Your generated videos are stored with redundancy:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Automatic backups every 6 hours</li>
                            <li>Geographic replication across multiple data centers</li>
                            <li>90-day retention period for all generated content</li>
                            <li>Recovery Point Objective (RPO): 6 hours</li>
                            <li>Recovery Time Objective (RTO): 2 hours</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. API Rate Limits</h2>
                        <p className="mb-4">
                            To ensure fair usage and system stability, API requests are rate-limited:
                        </p>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 my-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-white font-bold mb-1">Free Plan</p>
                                    <p className="text-sm">5 generations/month, 100 API calls/hour</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Pro Plan</p>
                                    <p className="text-sm">50 generations/month, 500 API calls/hour</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Enterprise Plan</p>
                                    <p className="text-sm">Unlimited generations, 2000 API calls/hour</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm">
                            If you exceed your rate limit, requests will return a 429 error. Limits reset every hour.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Maintenance Windows</h2>
                        <p className="mb-4">
                            Scheduled maintenance occurs on the first Sunday of each month, 2:00 AM - 4:00 AM WAT.
                            We'll announce maintenance at least 48 hours in advance via:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Email notification to all active users</li>
                            <li>Banner on the dashboard</li>
                            <li>Status page update (status.motionpipe.com)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. SLA Credits</h2>
                        <p className="mb-4">
                            If we fail to meet our uptime guarantee, you're eligible for service credits:
                        </p>

                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg overflow-hidden my-6">
                            <table className="w-full text-sm">
                                <thead className="bg-[#18181b] text-[#a1a1aa] font-mono text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Monthly Uptime</th>
                                        <th className="px-6 py-3 text-right">Service Credit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#27272a]">
                                    <tr>
                                        <td className="px-6 py-4 text-white">99.0% - 99.5%</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">10% of monthly fee</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-white">95.0% - 99.0%</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">25% of monthly fee</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-white">Below 95.0%</td>
                                        <td className="px-6 py-4 text-right text-white font-mono">50% of monthly fee</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-sm">
                            Credits are applied to your next invoice automatically. To claim credits, email support@motionpipe.com
                            within 30 days of the incident.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Monitoring and Transparency</h2>
                        <p className="mb-4">
                            We maintain a public status page at <a href="https://status.motionpipe.com" className="text-[#3b82f6] hover:underline">status.motionpipe.com</a> showing:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Real-time platform status</li>
                            <li>Current incident reports</li>
                            <li>Historical uptime data</li>
                            <li>Scheduled maintenance calendar</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. SLA Exclusions</h2>
                        <p className="mb-4">
                            This SLA does not apply to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Beta features or experimental functionality</li>
                            <li>Free tier accounts (best-effort support only)</li>
                            <li>Issues caused by user error or misuse</li>
                            <li>Third-party service outages beyond our control</li>
                            <li>Force majeure events (natural disasters, war, etc.)</li>
                        </ul>
                    </section>

                    <section className="border-t border-[#27272a] pt-8">
                        <p className="text-sm text-[#52525b]">
                            Questions about our SLA? Email us at <a href="mailto:sla@motionpipe.com" className="text-[#3b82f6] hover:underline">sla@motionpipe.com</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
