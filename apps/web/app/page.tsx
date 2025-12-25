"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu, Video, Layers, HardDrive, ShieldCheck, Zap } from "lucide-react";
import Header from "./components/header";
import HowItWorks from "./components/how-it-works";
import Pricing from "./components/pricing";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";
import { useLanguage } from "./context/language-context";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      title: t('feat_1_title'),
      icon: "/icons/camera.svg",
      description: t('feat_1_desc'),
    },
    {
      title: t('feat_2_title'),
      icon: "/icons/microphone.svg",
      description: t('feat_2_desc'),
    },
    {
      title: t('feat_3_title'),
      icon: "/icons/music.svg",
      description: t('feat_3_desc'),
    },
    {
      title: t('feat_4_title'),
      icon: "/icons/shield.svg",
      description: t('feat_4_desc'),
    },
    {
      title: t('feat_5_title'),
      icon: "/icons/bolt.svg",
      description: t('feat_5_desc'),
    },
    {
      title: t('feat_6_title'),
      icon: "/icons/robot.svg",
      description: t('feat_6_desc'),
    },
  ];

  const technologies = [
    { title: t('tech_1'), Icon: Cpu, desc: "Concurrent Orchestration" },
    { title: t('tech_2'), Icon: Video, desc: "Video Synthesis" },
    { title: t('tech_3'), Icon: Layers, desc: "Media Assembly" },
    { title: t('tech_4'), Icon: HardDrive, desc: "Optimized Media Cloud" },
    { title: t('tech_5'), Icon: ShieldCheck, desc: "Escrow Payments" },
    { title: t('tech_6'), Icon: Zap, desc: "High-Speed Cache" },
  ];

  return (
    <main className="flex flex-col w-full bg-[#09090b]">
      <Header />
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-[#27272a]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] z-0 pointer-events-none" />

        <div className="z-10 text-center max-w-5xl px-4 mt-20">

          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold text-white tracking-tighter leading-[1.1] mb-6 animate-enter">
            {t('hero_subtitle')} <br />
            <span className="text-[#3b82f6]">AI Freelancer.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed mb-10 animate-enter" style={{ animationDelay: "100ms" }}>
            {t('hero_description')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-enter" style={{ animationDelay: "200ms" }}>
            <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2">
              {t('start_project')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
            <button className="bg-[#18181b] border border-[#27272a] hover:border-[#52525b] text-white font-medium text-lg px-8 py-4 rounded-lg transition-all">
              {t('view_demo')}
            </button>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto mt-0 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[#27272a]">
            <StatItem value="5 Minutes" label="Delivery Time" />
            <StatItem value="100%" label="Escrow Protected" />
            <StatItem value="4K" label="Max Resolution" />
            <StatItem value="₦1,000" label="Rejection Fee" />
          </div>
        </div>
      </section>

      <div id="features" className="py-24 border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">{t('core_capabilities')}</h2>
            <p className="text-[#a1a1aa] text-lg">{t('capabilities_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a]">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#09090b] p-8 hover:bg-[#18181b] transition-colors group">
                <div className="w-10 h-10 border border-[#27272a] bg-[#18181b] rounded-lg flex items-center justify-center mb-6 text-[#3b82f6]">
                  <img src={feature.icon} width={20} height={20} alt="" className="invert opacity-80" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#a1a1aa] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#0c0c0e] py-12 md:py-24 border-t border-[#27272a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Generate Real Videos Like These. <span className="text-[#52525b]">No Designers Needed.</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto mb-12">
            Create professional motion graphics using our pre-built real-world templates.
          </p>
          <div className="perspective-center py-16 md:py-32">
            <div className="carousel-box">
              <ProductCard index={0} label="AI Assistant" video="/motion-templates/ai.mp4" />
              <ProductCard index={1} label="Crypto DeFi" video="/motion-templates/crypto.mp4" />
              <ProductCard index={2} label="Fintech App" video="/motion-templates/fintech.mp4" />
              <ProductCard index={3} label="Banking" video="/motion-templates/fintech (2).mp4" />
              <ProductCard index={4} label="Healthcare" video="/motion-templates/healthcare.mp4" />
            </div>
          </div>
        </div>
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div className="py-32 border-b border-[#27272a] relative overflow-hidden bg-[#0c0c0e]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 tracking-tight">
              {t('enterprise_stack')}
            </h2>
            <p className="text-[#a1a1aa] text-lg max-w-2xl mx-auto">
              Built on a foundation of industry-standard technologies for maximum reliability and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, i) => (
              <div key={i} className="group relative bg-[#18181b]/50 border border-[#27272a] hover:border-[#3b82f6]/50 p-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-[#09090b] rounded-lg border border-[#27272a] group-hover:border-[#3b82f6] transition-colors">
                    <tech.Icon className="w-6 h-6 text-[#a1a1aa] group-hover:text-[#3b82f6] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#3b82f6] transition-colors">{tech.title}</h3>
                    <p className="text-[#a1a1aa] text-sm leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-8 border-r border-b border-[#27272a] text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{value}</div>
      <div className="text-xs uppercase tracking-widest text-[#a1a1aa] font-medium">{label}</div>
    </div>
  )
}

function ProductCard({ label, video, index }: { label: string, video: string, index?: number }) {
  const style = { "--i": index } as React.CSSProperties;

  return (
    <div className="carousel-item" style={style}>
      <article className="bg-[#09090b] border border-[#27272a] p-3 md:p-5 rounded-none w-full flex flex-col items-start hover:border-[#3b82f6] transition-all group cursor-pointer relative overflow-hidden h-full">
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-mono text-[#52525b] uppercase tracking-tighter group-hover:text-[#3b82f6]">Ready</span>
        </div>

        <div className="w-full aspect-square bg-[#09090b] rounded-none mb-4 flex items-center justify-center overflow-hidden relative border border-[#27272a] group-hover:border-[#3b82f6]/30 transition-colors">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
            aria-label={`${label} motion design example`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        </div>

        <div className="w-full flex justify-between items-end">
          <div>
            <p className="text-[10px] font-mono text-[#52525b] uppercase mb-1">Category</p>
            <span className="text-white font-bold text-xs md:text-sm tracking-tight uppercase">{label}</span>
          </div>
          <div className="w-5 h-5 md:w-6 md:h-6 border border-[#27272a] flex items-center justify-center group-hover:border-[#3b82f6] transition-colors" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#52525b] group-hover:text-[#3b82f6] transition-colors">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </article>
    </div>
  )
}
