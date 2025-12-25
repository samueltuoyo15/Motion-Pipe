"use client";

import { History, Download, Eye, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";

export default function HistoryPage() {
    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Generation History</h1>
                <p className="text-[#a1a1aa] text-sm">View and manage your past video generations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Total Generations</p>
                    <p className="text-3xl font-bold text-white">127</p>
                </div>
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Successful</p>
                    <p className="text-3xl font-bold text-green-500">119</p>
                </div>
                <div className="bg-[#0c0c0e] border border-[#27272a] p-6 rounded-lg">
                    <p className="text-xs text-[#52525b] uppercase tracking-widest mb-2">Failed</p>
                    <p className="text-3xl font-bold text-red-500">8</p>
                </div>
            </div>

            <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#18181b] text-[#a1a1aa] font-mono text-xs uppercase border-b border-[#27272a]">
                            <tr>
                                <th className="px-6 py-4 text-left">Project Name</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-left">Duration</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a]">
                            <HistoryRow
                                name="Black Friday Promo"
                                date="Dec 24, 2024"
                                duration="15s"
                                status="completed"
                            />
                            <HistoryRow
                                name="Sneaker Launch Ad"
                                date="Dec 23, 2024"
                                duration="20s"
                                status="completed"
                            />
                            <HistoryRow
                                name="Holiday Campaign"
                                date="Dec 22, 2024"
                                duration="12s"
                                status="processing"
                            />
                            <HistoryRow
                                name="Tech Demo #2"
                                date="Dec 20, 2024"
                                duration="30s"
                                status="failed"
                            />
                            <HistoryRow
                                name="Product Showcase"
                                date="Dec 18, 2024"
                                duration="18s"
                                status="completed"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function HistoryRow({ name, date, duration, status }: { name: string, date: string, duration: string, status: "completed" | "processing" | "failed" }) {
    const statusConfig = {
        completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", label: "Completed" },
        processing: { icon: Clock, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", label: "Processing" },
        failed: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Failed" }
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <tr className="hover:bg-[#18181b]/50 transition-colors">
            <td className="px-6 py-4 text-white font-medium">{name}</td>
            <td className="px-6 py-4 text-[#a1a1aa]">{date}</td>
            <td className="px-6 py-4 text-[#a1a1aa] font-mono">{duration}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 ${config.color} ${config.bg} px-2 py-1 rounded text-xs font-medium`}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                    {status === "completed" && (
                        <>
                            <button className="p-1.5 text-[#a1a1aa] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 rounded transition-all" title="Preview">
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-[#a1a1aa] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 rounded transition-all" title="Download">
                                <Download className="w-4 h-4" />
                            </button>
                        </>
                    )}
                    <button className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/50 rounded transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
