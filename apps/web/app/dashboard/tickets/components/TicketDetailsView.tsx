"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function TicketDetailsView({ ticketId, onBack }: { ticketId: string | null, onBack: () => void }) {
    const [reply, setReply] = useState("");

    const handleReply = () => {
        if (!reply.trim()) {
            toast.error("Reply cannot be empty.");
            return;
        }
        toast.success("Reply posted!");
        setReply("");
    };

    return (
        <div className="h-full flex flex-col">
            <header className="h-16 border-b border-[#27272a] flex items-center gap-4 px-6 bg-[#0c0c0e]">
                <button onClick={onBack} className="text-[#a1a1aa] hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-white tracking-tight">Viewing Ticket #{ticketId}</h1>
                </div>
            </header>

            <div className="flex-1 p-6 overflow-y-auto bg-[#09090b]">
                <div className="max-w-5xl mx-auto space-y-6">

                    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-2xl font-bold text-white">Render failed on project "Nike Air"</h2>
                            <span className="bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded">In Progress</span>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                            <div>
                                <p className="text-[#52525b] text-xs font-mono uppercase tracking-widest mb-1">Ticket ID</p>
                                <p className="text-white text-sm font-medium">{ticketId}</p>
                            </div>
                            <div>
                                <p className="text-[#52525b] text-xs font-mono uppercase tracking-widest mb-1">Department</p>
                                <p className="text-white text-sm font-medium">Technical Support</p>
                            </div>
                            <div>
                                <p className="text-[#52525b] text-xs font-mono uppercase tracking-widest mb-1">Related Service</p>
                                <p className="text-white text-sm font-medium">Renderer</p>
                            </div>
                            <div>
                                <p className="text-[#52525b] text-xs font-mono uppercase tracking-widest mb-1">Last Updated</p>
                                <p className="text-white text-sm font-medium">20 mins ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
                        <h3 className="text-white font-bold mb-4">Post Ticket Reply</h3>
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className="w-full h-32 bg-[#09090b] border border-[#27272a] p-4 text-white text-sm rounded focus:border-[#3b82f6] outline-none transition-colors mb-4 resize-none"
                            placeholder="Type here to Reply to Ticket..."
                        />
                        <button
                            onClick={handleReply}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm font-bold transition-colors"
                        >
                            Post Reply
                        </button>
                    </div>

                    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6">
                        <h3 className="text-white font-bold mb-6 border-b border-[#27272a] pb-4">Ticket History</h3>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#27272a] flex items-center justify-center text-white font-bold">MP</div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">Motion Pipe Support</span>
                                        <span className="text-[#52525b] text-xs">Today at 10:42 AM</span>
                                    </div>
                                    <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-2xl">
                                        Hello, we are investigating the issue with your render. It seems like the texture assets for the "Shoe_Sole" object are corrupted. Can you try re-uploading them?
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold">ME</div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-white font-bold text-sm">You</span>
                                        <span className="text-[#52525b] text-xs">Today at 09:30 AM</span>
                                    </div>
                                    <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-2xl">
                                        I tried to generate the video but it got stuck at 98% for over an hour. Can you check the logs? I really need this for a presentation tomorrow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
