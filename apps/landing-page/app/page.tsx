"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
    <section className="flex flex-col justify-center relative w-full">
      <div className="min-h-[700px] bg-linear-to-b from-[#FF6C00]/8 to-[#000000] relative overflow-hidden">
        <Image
          src="/robot.svg"
          alt="Robot"
          width={288}
          height={288}
          className="animate-bounce absolute top-4 left-4 sm:left-10 rounded-[50%] bg-[#FF6C00]/10 h-40 w-40 sm:h-72 sm:w-[288px]"
        />

        <div className="px-4 sm:px-10 text-center mt-32">
          <h2 className="text-[#FFFFFF] text-3xl sm:text-5xl md:text-[72px]/[90px] animate-slide-in-left">
            Transform Briefs into <br />
            <span className="text-[#FF6C00]">Broadcast-Ready Ads</span>
          </h2>
        </div>

        <p className="px-4 sm:px-10 text-center mt-4 text-sm sm:text-base md:text-[20px]/[33px] text-[#A1A1A1] animate-slide-in-left">
          Hire an AI Freelancer that creates professional product advertisements
          with <br className="hidden sm:block" /> animations, soundtracks, and
          voiceovers in minutes. Pay only when satisfied.
        </p>

        <div className="animate-bounce absolute bottom-4 right-4 rounded-[50%] bg-[#FF6C00]/10 h-40 w-40 sm:h-72 sm:w-[288px]" />

        <div className="flex justify-center gap-4 mt-8 px-4">
          <button className="bg-[#FF6C00]/10 rounded-full py-3 px-5 text-white hover:bg-[#FF6C00]/20 transition-colors">
            Hire an AI Freelancer now
          </button>
          <button className="bg-[#1C1C1C] rounded-full py-3 px-5 text-white hover:bg-[#2C2C2C] transition-colors">
            Watch Demo
          </button>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-[97px] mt-16 text-center px-4"
        >
          <p>
            <span className="text-[36px] text-[#FF6C00]">{time}</span>
            <span className="text-[#A1A1A1] text-[14px] block">
              Average Delivery Time
            </span>
          </p>

          <p>
            <span className="text-[36px] text-[#FF6C00]">{percentage}%</span>
            <span className="text-[#A1A1A1] text-[14px] block">
              Escrow Protected
            </span>
          </p>

          <p>
            <span className="text-[36px] text-[#FF6C00]">{quality}K</span>
            <span className="text-[#A1A1A1] text-[14px] block">
              Output Quality
            </span>
          </p>
        </div>
      </div>

      {/* features */}
      <div className="mt-20 px-4">
        <h2 className="text-center text-[48px] text-[#FFFFFF]">
          Powered by Advanced AI
        </h2>
        <p className="text-center text-[20px] text-[#A1A1A1]">
          Everything you need for professional motion design, automated
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 mt-16 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1C1C1C] rounded-2xl p-4 h-[242px] hover:bg-[#2C2C2C] hover:scale-105 transition-all"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={56}
                height={56}
                className="mb-6"
              />
              <h2 className="text-[#FFFFFF] text-[24px]">{feature.title}</h2>
              <p className="text-[16px] mt-3.5 text-[#A1A1A1]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* technologies */}
      <div className="mt-24 px-4">
        <h2 className="text-center text-[48px] text-[#FFFFFF]">
          Enterprise-Grade Technology
        </h2>
        <p className="text-center text-[20px] text-[#A1A1A1]">
          Built on the most reliable and scalable infrastructure
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 mt-16 gap-4">
          {technologies.map((technology, index) => (
            <div
              key={index}
              className="bg-[#1C1C1C] rounded-2xl p-4 h-[242px] hover:bg-[#2C2C2C] hover:scale-105 transition-all"
            >
              <Image
                src={technology.icon}
                alt={technology.title}
                width={56}
                height={56}
                className="mb-6 mx-auto text-center"
              />
              <h2 className="text-[24px] text-[#FFFFFF] text-center">
                {technology.title}
              </h2>
              <p className="text-[16px] mt-3.5 text-[#A1A1A1] text-center">
                {technology.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
