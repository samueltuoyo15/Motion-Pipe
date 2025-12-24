"use client";

export default function ProfilePage() {
    return (
        <div className="p-6 md:p-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">User Profile</h1>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="w-24 h-24 bg-[#18181b] rounded-full flex-shrink-0 relative group cursor-pointer">
                        <img src="https://github.com/shadcn.png" className="w-full h-full rounded-full object-cover" alt="Profile" />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white">Edit</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">First Name</label>
                                <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Last Name</label>
                                <input type="text" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-[#52525b] uppercase tracking-widest mb-2">Email Address</label>
                            <input type="email" className="w-full bg-[#18181b] border border-[#27272a] px-3 py-2 text-white text-sm focus:border-[#3b82f6] outline-none" defaultValue="john@example.com" disabled />
                        </div>

                        <div className="pt-4">
                            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-600 transition-colors">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-lg">
                <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
                <p className="text-[#a1a1aa] text-sm mb-4">Permanently delete your account and all generated videos.</p>
                <button className="text-red-500 text-sm hover:underline font-medium">Delete Workspace</button>
            </div>
        </div>
    )
}
