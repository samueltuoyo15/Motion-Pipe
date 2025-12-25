"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../context/language-context";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#09090b] border-t border-[#27272a] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
            <img src="/logo.png" alt="Motion Pipe Logo" className="w-8 h-8 rounded-sm" />
            <span className="text-xl text-white font-bold tracking-tight">Motion Pipe</span>
          </Link>
          <p className="text-[#a1a1aa] text-sm max-w-sm leading-relaxed mb-8">
            {t('footer_tagline')}
          </p>
          <div className="flex gap-4">
            <SocialLink href="#" icon={Twitter} />
            <SocialLink href="#" icon={Github} />
            <SocialLink href="#" icon={Linkedin} />
            <SocialLink href="#" icon={Mail} />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">PLATFORM</h4>
          <ul className="space-y-4 text-sm text-[#a1a1aa]">
            <li><Link href="/#features" className="hover:text-[#3b82f6] transition-colors">Capabilities</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[#3b82f6] transition-colors">Workflow</Link></li>
            <li><Link href="/#pricing" className="hover:text-[#3b82f6] transition-colors">Pricing</Link></li>
            <li><Link href="/login" className="hover:text-[#3b82f6] transition-colors">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">LEGAL</h4>
          <ul className="space-y-4 text-sm text-[#a1a1aa]">
            <li><Link href="/terms" className="hover:text-[#3b82f6] transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-[#3b82f6] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/escrow" className="hover:text-[#3b82f6] transition-colors">Escrow Agreement</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#27272a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#52525b] font-mono">
        <p>&copy; {new Date().getFullYear()} MOTION PIPE SYSTEMS INC. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <a href={href} className="w-10 h-10 border border-[#27272a] bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:border-[#3b82f6] hover:text-white transition-all">
      <Icon className="w-4 h-4" />
    </a>
  )
}
