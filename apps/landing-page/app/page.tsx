"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HowItWorks from "./components/how-it-works";
import Pricing from "./components/pricing";
import FAQ from "./components/faq";
import CTA from "./components/cta";

export default function Home() {
  const features = [
    {
      title: "AI Video Generation",
      icon: "/camera.svg",
      description:
        "Google Veo 3 API creates stunning visual flows and animations from your brief",
    },
    {
      title: "Professional Voiceover",
      icon: "/microphone.svg",
      description:
        "ElevenLabs generates natural, broadcast-quality narration in multiple voices",
    },
    {
      title: "AI Sound Agent",
      icon: "/music.svg",
      description:
        "Curated licensed music and SFX, automatically matched to your ad's mood",
    },
    {
      title: "Escrow Protection",
      icon: "/shield.svg",
      description:
        "Paystack Escrow ensures payment only releases upon your approval",
    },
    {
      title: "Real-Time Updates",
      icon: "/bolt.svg",
      description:
        "WebSocket-powered live progress tracking and preview updates",
    },
    {
      title: "Smart Asset Discovery",
      icon: "/robot.svg",
      description:
        "Selenium-driven automation finds logos and product images automatically",
    },
  ];

  const technologies = [
    {
      title: "Golang Backend",
      icon: "/go.svg",
      description: "High-performance concurrent orchestration",
    },
    {
      title: "Google Veo 3",
      icon: "/google.svg",
      description: "State-of-the-art video generation",
    },
    {
      title: "FFmpeg",
      icon: "/ffmpeg.svg",
      description: "Professional video assembly",
    },
    {
      title: "Cloudflare R2",
      icon: "/cloud.svg",
      description: "Zero-egress cloud storage",
    },
    {
      title: "Paystack",
      icon: "/card.svg",
      description: "Secure escrow payments",
    },
    {
      title: "Redis Cache",
      icon: "/cache.svg",
      description: "Lightning-fast asset retrieval",
    },
  ];

  const [percentage, setPercentage] = useState(100);
  const [quality, setQuality] = useState(4);
  const [time, setTime] = useState("2 Min");
  const [hasAnimated, setHasAnimated] = useState(false);

  const statsRef = useRef<HTMLDivElement | null>(null);
  const percentageRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qualityRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimations = () => {
    percentageRef.current = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          if (percentageRef.current) clearInterval(percentageRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    qualityRef.current = setInterval(() => {
      setQuality((prev) => {
        if (prev >= 4) {
          if (qualityRef.current) clearInterval(qualityRef.current);
          return 4;
        }
        return prev + 1;
      });
    }, 300);

    let timeCount = 0;
    timeRef.current = setInterval(() => {
      timeCount += 0.1;
      if (timeCount >= 2) {
        if (timeRef.current) clearInterval(timeRef.current);
        setTime("2 Min");
      } else {
        setTime(`${timeCount.toFixed(1)} Min`);
      }
    }, 75);
  };

  useEffect(() => {
    const current = statsRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]!;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimations();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="flex flex-col justify-center relative w-full overflow-x-hidden">


      <div className="min-h-[800px] bg-linear-to-b from-[#FF6C00]/8 to-[#000000] relative overflow-hidden flex flex-col justify-center">
        <Image
          src="/robot.svg"
          alt="Robot"
          width={288}
          height={288}
          className="animate-bounce absolute top-10 left-4 sm:left-10 rounded-full bg-[#FF6C00]/10 h-32 w-32 sm:h-52 sm:w-52 lg:h-72 lg:w-[288px] opacity-80"
        />

        <div className="px-4 sm:px-10 text-center z-10">
          <h2 className="text-[#FFFFFF] text-4xl sm:text-6xl md:text-[72px]/[1.1] font-bold animate-slide-in-left tracking-tight">
            Transform Briefs into <br />
            <span className="text-[#FF6C00] bg-clip-text text-transparent bg-gradient-to-r from-[#FF6C00] to-[#FF9040]">Broadcast-Ready Ads</span>
          </h2>
        </div>

        <p className="px-4 sm:px-10 text-center mt-6 text-base sm:text-lg md:text-[22px]/[36px] text-[#A1A1A1] max-w-4xl mx-auto animate-slide-in-left">
          Hire an AI Freelancer that creates professional product advertisements
          with <br className="hidden sm:block" /> animations, soundtracks, and
          voiceovers in minutes. Pay only when satisfied.
        </p>

        <div className="animate-bounce absolute bottom-10 right-4 rounded-full bg-[#FF6C00]/10 h-32 w-32 sm:h-52 sm:w-52 lg:h-72 lg:w-[288px] opacity-80" />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 px-4 z-10">
          <button className="bg-[#FF6C00] rounded-full py-4 px-8 text-white text-lg font-semibold hover:bg-[#FF8833] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,108,0,0.3)]">
            Hire an AI Freelancer now
          </button>
          <button className="bg-[#1C1C1C] border border-[#333] rounded-full py-4 px-8 text-white text-lg font-semibold hover:bg-[#2C2C2C] hover:border-[#FF6C00]/50 transition-all">
            Watch Demo
          </button>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-[97px] mt-20 text-center px-4 max-w-5xl mx-auto"
        >
          <p>
            <span className="text-[42px] font-bold text-[#FF6C00] font-mono">{time}</span>
            <span className="text-[#A1A1A1] text-[14px] uppercase tracking-wider block mt-2">
              Average Delivery Time
            </span>
          </p>

          <p>
            <span className="text-[42px] font-bold text-[#FF6C00] font-mono">{percentage}%</span>
            <span className="text-[#A1A1A1] text-[14px] uppercase tracking-wider block mt-2">
              Escrow Protected
            </span>
          </p>

          <p>
            <span className="text-[42px] font-bold text-[#FF6C00] font-mono">{quality}K</span>
            <span className="text-[#A1A1A1] text-[14px] uppercase tracking-wider block mt-2">
              Output Quality
            </span>
          </p>
        </div>
      </div>


      <div id="features" className="mt-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-[48px] text-[#FFFFFF] font-bold">
          Powered by Advanced AI
        </h2>
        <p className="text-center text-[20px] text-[#A1A1A1] mt-2 mb-16">
          Everything you need for professional motion design, automated
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1C1C1C] border border-[#333] rounded-2xl p-6 h-[260px] hover:bg-[#252525] hover:border-[#FF6C00]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="bg-[#000000] w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                />
              </div>
              <h2 className="text-[#FFFFFF] text-[22px] font-semibold">{feature.title}</h2>
              <p className="text-[16px] mt-3 text-[#A1A1A1] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>


      <div className="mt-32 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-[48px] text-[#FFFFFF] font-bold">
          Enterprise-Grade Technology
        </h2>
        <p className="text-center text-[20px] text-[#A1A1A1] mt-2 mb-16">
          Built on the most reliable and scalable infrastructure
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((technology, index) => (
            <div
              key={index}
              className="bg-[#1C1C1C]/50 border border-[#333]/50 rounded-2xl p-6 flex items-center gap-4 hover:bg-[#1C1C1C] transition-all"
            >
              <Image
                src={technology.icon}
                alt={technology.title}
                width={48}
                height={48}
                className="opacity-80"
              />
              <div>
                <h2 className="text-[18px] text-[#FFFFFF] font-semibold">
                  {technology.title}
                </h2>
                <p className="text-[14px] text-[#A1A1A1]">
                  {technology.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <FAQ />

      <CTA />

    </section>
  );
}
