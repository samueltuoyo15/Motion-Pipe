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
