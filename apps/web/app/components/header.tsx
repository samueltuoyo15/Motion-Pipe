"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/language-context";

import { useChunk } from "stunk/react";
import { authChunk } from "@/lib/store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [auth] = useChunk(authChunk);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
          <span className="text-lg text-white font-bold tracking-tight">Motion Pipe</span>
        </Link>

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

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="/#features">{t('nav_capabilities')}</Link>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="/#how-it-works">{t('nav_workflow')}</Link>
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link href="/#pricing">{t('nav_pricing')}</Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 border-l border-[#27272a] pl-8">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>{language}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-[#09090b] border border-[#27272a] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1 z-50">
                <button onClick={() => setLanguage("EN")} className="w-full text-left px-4 py-2 text-sm text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">English</button>
                <button onClick={() => setLanguage("FR")} className="w-full text-left px-4 py-2 text-sm text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">Français</button>
                <button onClick={() => setLanguage("ES")} className="w-full text-left px-4 py-2 text-sm text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">Español</button>
                <button onClick={() => setLanguage("DE")} className="w-full text-left px-4 py-2 text-sm text-[#a1a1aa] hover:text-white hover:bg-[#18181b]">Deutsch</button>
              </div>
            </div>

            {auth.isAuthenticated ? (
              <Link href="/dashboard" className="bg-[#3b82f6] text-white px-5 py-2 rounded text-sm font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
                <span>Dashboard</span>
                {auth.user?.avatar && (
                  <img src={auth.user.avatar} className="w-5 h-5 rounded-full border border-white/20" alt="" />
                )}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium">
                  {t('nav_login')}
                </Link>
                <Link href="/register" className="bg-white text-black px-5 py-2 rounded text-sm font-bold hover:bg-[#e4e4e7] transition-colors">
                  {t('nav_get_started')}
                </Link>
              </>
            )}
          </div>
        </div>

        {open && (
          <div className="absolute top-16 left-0 right-0 bg-[#09090b] border-b border-[#27272a] p-6 md:hidden flex flex-col gap-6 text-center animate-slide-up-fade">
            <Link href="/#features" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Capabilities</Link>
            <Link href="/#how-it-works" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Workflow</Link>
            <Link href="/#pricing" className="text-[#a1a1aa] hover:text-white text-lg font-medium" onClick={() => setOpen(false)}>Pricing</Link>
            <hr className="border-[#27272a]" />

            <div className="flex flex-col gap-4">
              <p className="text-xs text-[#52525b] font-mono tracking-widest uppercase">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {(['EN', 'FR', 'ES', 'DE'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLanguage(l); setOpen(false); }}
                    className={`py-2 rounded border text-sm font-medium transition-all ${language === l ? 'bg-white text-black border-white' : 'bg-[#18181b] text-[#a1a1aa] border-[#27272a]'}`}
                  >
                    {l === "EN" ? "English" : l === "FR" ? "Français" : l === "ES" ? "Español" : "Deutsch"}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-[#27272a]" />
            <Link href="/login" className="text-white text-lg font-medium" onClick={() => setOpen(false)}>{t('nav_login')}</Link>
            <Link href="/register" className="bg-[#3b82f6] text-white py-3 rounded text-lg font-bold" onClick={() => setOpen(false)}>{t('nav_get_started')}</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
