"use client";

import { useState, Fragment } from "react";
import { Ticket } from "lucide-react";
import CreateTicketView from "./components/CreateTicketView";
import TicketDetailsView from "./components/TicketDetailsView";

export default function TicketsPage() {
    const [view, setView] = useState<"list" | "create" | "details">("list");
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

    return (
        <div className="h-full flex flex-col bg-[#09090b]">
            {view === "list" && (
                <Fragment>
                    <header className="h-16 border-b border-[#27272a] flex items-center justify-between px-6 bg-[#0c0c0e]">
                        <h1 className="text-lg font-bold text-white tracking-tight">Support Tickets</h1>
                        <button
                            onClick={() => setView("create")}
                            className="bg-[#3b82f6] text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <Ticket className="w-4 h-4" />
                            New Ticket
                        </button>
                    </header>
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-[#a1a1aa] text-xs font-mono uppercase tracking-widest mb-4">Active Conversations</h2>
                            <div className="space-y-3">
                                <div
                                    onClick={() => { setSelectedTicketId("T-9923"); setView("details"); }}
                                    className="bg-[#18181b] border border-[#27272a] p-5 rounded-lg hover:border-[#3b82f6] transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-white font-bold text-base group-hover:text-[#3b82f6] transition-colors">Render failed on project "Nike Air"</h3>
                                        <span className="text-[#3b82f6] text-xs font-mono bg-[#3b82f6]/10 px-2 py-1 rounded">IN PROGRESS</span>
                                    </div>
                                    <p className="text-[#a1a1aa] text-sm line-clamp-1 mb-4">I tried to generate the video but it got stuck at 98% for over an hour. Can you check the logs?</p>
                                    <div className="flex items-center gap-4 text-[#52525b] text-xs font-mono">
                                        <span>ID: #T-9923</span>
                                        <span>•</span>
                                        <span>Technical Support</span>
                                        <span>•</span>
                                        <span>2 hours ago</span>
                                    </div>
                                </div>

                                <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-lg hover:border-[#3b82f6] transition-all cursor-pointer opacity-75">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-white font-bold text-base">Billing Inquiry</h3>
                                        <span className="text-green-500 text-xs font-mono bg-green-500/10 px-2 py-1 rounded">RESOLVED</span>
                                    </div>
                                    <p className="text-[#a1a1aa] text-sm line-clamp-1 mb-4">Can I get an invoice for last month?</p>
                                    <div className="flex items-center gap-4 text-[#52525b] text-xs font-mono">
                                        <span>ID: #T-9920</span>
                                        <span>•</span>
                                        <span>Billing</span>
                                        <span>•</span>
                                        <span>2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>

            )}

            {view === "create" && (
                <CreateTicketView onBack={() => setView("list")} />
            )}

            {view === "details" && (
                <TicketDetailsView ticketId={selectedTicketId} onBack={() => setView("list")} />
            )}
        </div>
    )
}
