import Link from "next/link";
import Image from "next/image";
import Header from "./components/header";
import HowItWorks from "./components/how-it-works";
import Pricing from "./components/pricing";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  const features = [
    {
      title: "AI Video Generation",
      icon: "/camera.svg",
      description: "Google Veo 3 API creates stunning visual flows and animations.",
    },
    {
      title: "Professional Voiceover",
      icon: "/microphone.svg",
      description: "ElevenLabs generates natural, broadcast-quality narration.",
    },
    {
      title: "AI Sound Agent",
      icon: "/music.svg",
      description: "Curated licensed music and SFX, matched to mood.",
    },
    {
      title: "Escrow Protection",
      icon: "/shield.svg",
      description: "Funds only held. Released upon your approval.",
    },
    {
      title: "Real-Time Updates",
      icon: "/bolt.svg",
      description: "WebSocket-powered live progress tracking.",
    },
    {
      title: "Smart Asset Discovery",
      icon: "/robot.svg",
      description: "Selenium agents find brand assets automatically.",
    },
  ];

  const technologies = [
    { title: "Golang Backend", icon: "/go.svg", desc: "Concurrent Orchestration" },
    { title: "Google Veo 3", icon: "/google.svg", desc: "Video Synthesis" },
    { title: "FFmpeg", icon: "/ffmpeg.svg", desc: "Media Assembly" },
    { title: "Cloudflare R2", icon: "/cloud.svg", desc: "Zero-Egress Storage" },
    { title: "Paystack", icon: "/card.svg", desc: "Escrow Payments" },
    { title: "Redis", icon: "/cache.svg", desc: "High-Speed Cache" },
  ];

  return (
    <main className="flex flex-col w-full bg-[#09090b]">
      <Header />
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-[#27272a]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] z-0 pointer-events-none" />

        <div className="z-10 text-center max-w-5xl px-4 mt-20">

          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold text-white tracking-tighter leading-[1.1] mb-6 animate-enter">
            Your New <br />
            <span className="text-[#3b82f6]">AI Freelancer.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed mb-10 animate-enter" style={{ animationDelay: "100ms" }}>
            Motion Pipe is an autonomous infrastructure that continuously generates broadcast-ready product commercials.
            <br className="hidden md:block" />
            We replace entire agencies with a single API call. Escrow secured.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-enter" style={{ animationDelay: "200ms" }}>
            <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2">
              Start Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
            <button className="bg-[#18181b] border border-[#27272a] hover:border-[#52525b] text-white font-medium text-lg px-8 py-4 rounded-lg transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Product Showcase / "Don't Pay" Section */}
        <div className="w-full bg-[#0c0c0e] py-20 mt-20 border-t border-[#27272a]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Generate Motion Design.</h2>
            <p className="text-[#3b82f6] text-xl font-bold mb-12 tracking-wide uppercase">Don't Pay for Motion Designers.</p>

            <div className="flex flex-wrap justify-center gap-8">
              {/* Product Cards */}
              <ProductCard label="Beverages" image="/water_bottle_mockup.png" />
              <ProductCard label="Tech" image="/laptop_mock.png" />
              <ProductCard label="Fashion" image="/shirt_mock.png" />
              <ProductCard label="Cosmetics" image="/cream_mock.png" />
              <ProductCard label="Supplements" image="/jar_mock.png" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto mt-0 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[#27272a]">
            <StatItem value="2 Min" label="Delivery Time" />
            <StatItem value="100%" label="Escrow Protected" />
            <StatItem value="4K" label="Max Resolution" />
            <StatItem value="₦500" label="Rejection Fee" />
          </div>
        </div>
      </section>

      <div id="features" className="py-24 border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-[#a1a1aa] text-lg">Automated motion design infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#27272a] border border-[#27272a]">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#09090b] p-8 hover:bg-[#18181b] transition-colors group">
                <div className="w-10 h-10 border border-[#27272a] bg-[#18181b] rounded-lg flex items-center justify-center mb-6 text-[#3b82f6]">
                  <Image src={feature.icon} width={20} height={20} alt="" className="invert opacity-80" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#a1a1aa] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div className="py-24 border-b border-[#27272a] bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-12 text-center tracking-tight">Enterprise Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 opacity-70">
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-3 text-[#a1a1aa] font-mono text-sm border border-[#27272a] px-4 py-2 rounded bg-[#09090b]">
                <Image src={tech.icon} width={16} height={16} alt="" />
                <span>{tech.title}</span>
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

function ProductCard({ label, image }: { label: string, image: string }) {
  return (
    <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl w-40 flex flex-col items-center hover:border-[#3b82f6] transition-colors group cursor-pointer">
      <div className="w-24 h-24 bg-[#09090b] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <div className="text-[#27272a] text-xs font-mono group-hover:text-[#3b82f6]">[ASSET]</div>
      </div>
      <span className="text-white font-medium text-sm">{label}</span>
    </div>
  )
}

