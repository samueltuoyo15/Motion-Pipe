"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#FF6C00]/8 text-[#A1A1A1] p-4 w-full">
      <nav className="flex justify-between items-center">
        <div className="text-[24px] text-[#FFFFFF] font-bold ml-6">
          Motion Pipe
        </div>

        <button
          className="md:hidden mr-6"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-8">
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">How it Works</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="bg-[#FF6C00] text-[#FFFFFF] text-[16px] px-[3px] rounded-lg py-[9px] cursor-pointer">
              Get Started
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`md:hidden px-6 transition-all duration-600 overflow-hidden ${
          open ? "max-h-96 mt-4" : "max-h-0 mt-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li className="cursor-pointer">Features</li>
          <li className="cursor-pointer">How it Works</li>
          <li className="cursor-pointer">Pricing</li>
          <li className="bg-[#FF6C00] text-[#FFFFFF] text-[16px] px-[3px] rounded-lg py-[9px] cursor-pointer w-fit">
            Get Started
          </li>
        </ul>
      </div>
    </header>
  );
}
