"use client";

import { ImageIcon, Play, Star, TrendingUp } from "lucide-react";

export default function TemplatesPage() {
    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Motion Templates</h1>
                <p className="text-[#a1a1aa] text-sm">Pre-built motion design templates to jumpstart your projects</p>
            </div>

            <div className="flex gap-3 mb-8">
                <button className="px-4 py-2 text-sm font-medium bg-[#3b82f6] text-white rounded hover:bg-blue-600 transition-colors">All Templates</button>
                <button className="px-4 py-2 text-sm font-medium text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">Product Launch</button>
                <button className="px-4 py-2 text-sm font-medium text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">Social Media</button>
                <button className="px-4 py-2 text-sm font-medium text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">E-commerce</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemplateCard
                    title="Sneaker Launch"
                    category="Product Launch"
                    duration="15s"
                    popular={true}
                />
                <TemplateCard
                    title="Tech Product Reveal"
                    category="Product Launch"
                    duration="20s"
                    popular={false}
                />
                <TemplateCard
                    title="Fashion Promo"
                    category="Social Media"
                    duration="10s"
                    popular={true}
                />
                <TemplateCard
                    title="Holiday Sale"
                    category="E-commerce"
                    duration="12s"
                    popular={false}
                />
                <TemplateCard
                    title="App Demo"
                    category="Product Launch"
                    duration="30s"
                    popular={false}
                />
                <TemplateCard
                    title="Brand Story"
                    category="Social Media"
                    duration="25s"
                    popular={true}
                />
            </div>
        </div>
    );
}

function TemplateCard({ title, category, duration, popular }: { title: string, category: string, duration: string, popular: boolean }) {
    return (
        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg overflow-hidden hover:border-[#3b82f6] transition-all cursor-pointer group">
            <div className="relative w-full h-48 bg-gradient-to-br from-[#18181b] to-[#0c0c0e] flex items-center justify-center group-hover:from-[#3b82f6]/10 group-hover:to-[#0c0c0e] transition-all">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <Play className="w-12 h-12 text-[#27272a] group-hover:text-[#3b82f6] transition-colors relative z-10" />
                {popular && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#ea580c]/20 border border-[#ea580c]/50 px-2 py-1 rounded text-xs font-bold text-[#ea580c]">
                        <TrendingUp className="w-3 h-3" />
                        Popular
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-white font-bold mb-2 group-hover:text-[#3b82f6] transition-colors">{title}</h3>
                <div className="flex items-center justify-between text-xs text-[#52525b]">
                    <span className="font-mono">{category}</span>
                    <span className="font-mono">{duration}</span>
                </div>
            </div>
        </div>
    );
}
