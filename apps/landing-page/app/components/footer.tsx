import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-[#A1A1A1] text-[14px] w-full py-10 px-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div>
          <h2 className="text-[16px] text-[#FFFFFF] font-semibold mb-3">
            Motion Pipe{" "}
            <Image
              width={32}
              height={32}
              src="/robot.svg"
              alt="Motion Pipe Logo"
              className="inline-block"
            />
          </h2>
          <p className="text-[#A1A1A1]">
            Create ads with cutting-edge automation and professional video
            workflows.
          </p>
        </div>

        <ul className="leading-7">
          <h2 className="text-[16px] text-[#FFFFFF] font-semibold mb-2">
            Product
          </h2>
          <li className="cursor-pointer">Features</li>
          <li className="cursor-pointer">Pricing</li>
          <li className="cursor-pointer">Use Cases</li>
          <li className="cursor-pointer">Documentation</li>
        </ul>

        <ul className="leading-7">
          <h2 className="text-[16px] text-[#FFFFFF] font-semibold mb-2">
            Company
          </h2>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Blog</li>
          <li className="cursor-pointer">Careers</li>
          <li className="cursor-pointer">Contact</li>
        </ul>

        <ul className="leading-7">
          <h2 className="text-[16px] text-[#FFFFFF] font-semibold mb-2">
            Legal
          </h2>
          <li className="cursor-pointer">Privacy Policy</li>
          <li className="cursor-pointer">Terms of Service</li>
          <li className="cursor-pointer">Security</li>
          <li className="cursor-pointer">Compliance</li>
        </ul>
      </div>


      <div className="border-t border-[#333] pt-6 flex justify-between items-center">
        <div>
          &copy; {new Date().getFullYear()} Motion Pipe. All rights reserved.
        </div>


        <a href="#" className="cursor-pointer" aria-label="GitHub">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6A4.8 4.8 0 0 0 18 3.1S16.7 2.8 12 2.8s-6 .3-6 .3A4.8 4.8 0 0 0 5.1 4.2 5.2 5.2 0 0 0 3.7 7.8c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 19v3" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
