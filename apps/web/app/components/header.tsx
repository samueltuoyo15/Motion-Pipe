"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a]">
      <nav className="flex justify-between items-center max-w-full px-6 h-16">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
          <span className="text-lg text-white font-bold tracking-tight">Motion Pipe</span>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="space-y-1.5 cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
            <li className="cursor-pointer hover:text-white transition-colors">
              <a href="#features">Features</a>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <a href="#how-it-works">Workflow</a>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="/login" className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium mr-4">
                Login
              </a>
              <a href="/register" className="bg-white text-black px-5 py-2 rounded text-sm font-semibold hover:bg-[#e4e4e7] transition-colors">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
