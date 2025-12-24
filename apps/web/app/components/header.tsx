"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
          <span className="text-lg text-white font-bold tracking-tight">Motion Pipe</span>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1.5 cursor-pointer">
            <div className={`w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="#features">Capabilities</Link>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="#how-it-works">Workflow</Link>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="#pricing">Pricing</Link>
            </li>
            <li className="flex items-center gap-4">
              <Link href="/login" className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-white text-black px-5 py-2 rounded text-sm font-bold hover:bg-[#e4e4e7] transition-colors">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {open && (
          <div className="absolute top-16 left-0 right-0 bg-[#09090b] border-b border-[#27272a] p-6 md:hidden flex flex-col gap-6 text-center animate-slide-up-fade">
            <Link href="#features" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Capabilities</Link>
            <Link href="#how-it-works" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Workflow</Link>
            <Link href="#pricing" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Pricing</Link>
            <hr className="border-[#27272a]" />
            <Link href="/login" className="text-white text-lg font-medium" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/register" className="bg-[#3b82f6] text-white py-3 rounded text-lg font-bold" onClick={() => setOpen(false)}>Get Started</Link>

            <div className="flex justify-center gap-4 mt-4">
              <button className="text-xs text-[#52525b] hover:text-white flex items-center gap-1">
                🌍 EN (US)
              </button>
              <button className="text-xs text-[#52525b] hover:text-white flex items-center gap-1">
                🇳🇬 NGN
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
