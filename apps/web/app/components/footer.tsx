"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../context/language-context";
import { api } from "@/lib/api";

type HealthStatus = 'online' | 'degraded' | 'offline';

export default function Footer() {
  const { t } = useLanguage();
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('online');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get("/health");
        setHealthStatus('online');
      } catch (error) {
        setHealthStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    online: { color: 'bg-[#10b981]', text: 'ALL SYSTEMS OPERATIONAL' },
    degraded: { color: 'bg-[#f59e0b]', text: 'DEGRADED PERFORMANCE' },
    offline: { color: 'bg-[#ef4444]', text: 'SYSTEMS OFFLINE' }
  };

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
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="GitHub" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={Mail} label="Email" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">{t('platform_title')}</h4>
          <ul className="space-y-4 text-sm text-[#a1a1aa]">
            <li><Link href="/#features" className="hover:text-[#3b82f6] transition-colors">{t('nav_capabilities')}</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[#3b82f6] transition-colors">{t('nav_workflow')}</Link></li>
            <li><Link href="/#pricing" className="hover:text-[#3b82f6] transition-colors">{t('nav_pricing')}</Link></li>
            <li><Link href="/login" className="hover:text-[#3b82f6] transition-colors">{t('nav_login')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">{t('legal_title')}</h4>
          <ul className="space-y-4 text-sm text-[#a1a1aa]">
            <li><Link href="/terms" className="hover:text-[#3b82f6] transition-colors">{t('link_terms')}</Link></li>
            <li><Link href="/privacy" className="hover:text-[#3b82f6] transition-colors">{t('link_privacy')}</Link></li>
            <li><Link href="/escrow" className="hover:text-[#3b82f6] transition-colors">{t('link_escrow')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#27272a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#52525b] font-mono">
        <p>&copy; {new Date().getFullYear()} {t('rights_reserved')}</p>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${statusConfig[healthStatus].color} ${healthStatus === 'online' ? 'animate-pulse' : ''}`}
            aria-label={`System status: ${healthStatus}`}
          />
          <span>{healthStatus === 'online' ? t('status_online') : healthStatus === 'degraded' ? t('status_degraded') : t('status_offline')}</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 border border-[#27272a] bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:border-[#3b82f6] hover:text-white transition-all"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}
