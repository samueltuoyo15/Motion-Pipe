"use client";

export default function SettingsPage() {
    return (
        <div className="p-6 md:p-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 mb-6">
                <h3 className="text-white font-bold mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#a1a1aa]">Email me when generation is complete</span>
                        <div className="w-10 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#a1a1aa]">Escrow release alerts</span>
                        <div className="w-10 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6 mb-6">
                <h3 className="text-white font-bold mb-4">Connected Accounts</h3>
                <p className="text-sm text-[#a1a1aa] mb-2">Connect your social accounts to automatically post your marketing assets.</p>
                <div className="flex items-start gap-2 mb-6 p-3 bg-[#3b82f6]/10 rounded border border-[#3b82f6]/20">
                    <svg className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        We use official secure OAuth connections. You will be redirected to organize access. We never see or store your passwords.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#27272a] rounded-lg bg-[#18181b]/30">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-[#333]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">X (Twitter)</h4>
                                <p className="text-[#71717a] text-xs">Post videos and threads</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 transition-colors">
                            Connect
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-[#27272a] rounded-lg bg-[#18181b]/30">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center border border-[#0077b5]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">LinkedIn</h4>
                                <p className="text-[#71717a] text-xs">Share professional updates</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-[#0077b5] text-white text-xs font-bold rounded hover:bg-[#006097] transition-colors">
                            Connect
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">API Access</h3>
                <p className="text-sm text-[#a1a1aa] mb-4">Manage your personal access tokens.</p>
                <div className="flex gap-2">
                    <input type="text" value="mp_live_..." disabled className="flex-1 bg-[#18181b] border border-[#27272a] px-3 py-2 text-[#52525b] text-sm font-mono cursor-not-allowed" />
                    <button className="border border-[#27272a] text-white px-4 py-2 rounded text-sm hover:bg-[#18181b]">Regenerate</button>
                </div>
            </div>
        </div>
    )
}
