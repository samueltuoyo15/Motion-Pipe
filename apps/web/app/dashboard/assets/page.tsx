"use client";

import { FolderOpen, Upload, Image as ImageIcon, Video, FileText } from "lucide-react";

export default function AssetsPage() {
    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Asset Library</h1>
                <p className="text-[#a1a1aa] text-sm">Manage your uploaded images, videos, and product assets</p>
            </div>

            <div className="mb-8">
                <div className="border-2 border-dashed border-[#27272a] bg-[#0c0c0e] rounded-lg p-12 text-center hover:border-[#3b82f6] transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-[#18181b] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#3b82f6]/10 transition-colors">
                        <Upload className="w-8 h-8 text-[#52525b] group-hover:text-[#3b82f6] transition-colors" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Upload Assets</h3>
                    <p className="text-[#a1a1aa] text-sm mb-4">Drag and drop files here or click to browse</p>
                    <p className="text-xs text-[#52525b]">Supports PNG, JPG, MP4, WEBP (Max 50MB)</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Recent Assets</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-mono text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">All</button>
                        <button className="px-3 py-1.5 text-xs font-mono text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">Images</button>
                        <button className="px-3 py-1.5 text-xs font-mono text-[#a1a1aa] bg-[#18181b] border border-[#27272a] rounded hover:border-[#3b82f6] transition-colors">Videos</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AssetCard
                    icon={ImageIcon}
                    name="water_bottle_mockup.png"
                    size="2.4 MB"
                    date="Dec 24, 2024"
                    type="image"
                />
                <AssetCard
                    icon={ImageIcon}
                    name="sneaker_product.jpg"
                    size="1.8 MB"
                    date="Dec 20, 2024"
                    type="image"
                />
                <AssetCard
                    icon={Video}
                    name="promo_draft_v2.mp4"
                    size="15.2 MB"
                    date="Dec 18, 2024"
                    type="video"
                />
            </div>
        </div>
    );
}

function AssetCard({ icon: Icon, name, size, date, type }: { icon: any, name: string, size: string, date: string, type: string }) {
    return (
        <div className="bg-[#0c0c0e] border border-[#27272a] rounded-lg p-4 hover:border-[#3b82f6] transition-all cursor-pointer group">
            <div className="w-full h-40 bg-[#18181b] rounded mb-4 flex items-center justify-center group-hover:bg-[#3b82f6]/5 transition-colors">
                <Icon className="w-12 h-12 text-[#27272a] group-hover:text-[#3b82f6] transition-colors" />
            </div>
            <h3 className="text-white text-sm font-medium mb-2 truncate">{name}</h3>
            <div className="flex items-center justify-between text-xs text-[#52525b]">
                <span>{size}</span>
                <span>{date}</span>
            </div>
        </div>
    );
}
