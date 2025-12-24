import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Careers() {
    return (
        <main className="flex flex-col w-full bg-[#09090b] min-h-screen">
            <Header />
            <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Join the <span className="text-[#3b82f6]">Revolution.</span>
                </h1>
                <p className="text-[#a1a1aa] text-xl max-w-2xl mb-16 leading-relaxed">
                    We are building the autonomous infrastructure that will power the next generation of global advertising.
                    We don't need "pixel pushers". We need visionaries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#27272a] border border-[#27272a] mb-16">
                    <div className="bg-[#09090b] p-8">
                        <h3 className="text-white text-2xl font-bold mb-2">Systems Engineer (Golang)</h3>
                        <p className="text-[#a1a1aa] mb-6">Remote • Full Time</p>
                        <p className="text-[#52525b] text-sm mb-6 leading-relaxed">
                            Architect the high-throughput video rendering pipeline. You will work with FFmpeg, CUDA, and distributed systems to ensure sub-minute generation times.
                        </p>
                        <button className="text-[#3b82f6] font-bold hover:underline">Apply Now &rarr;</button>
                    </div>
                    <div className="bg-[#09090b] p-8">
                        <h3 className="text-white text-2xl font-bold mb-2">AI Research Scientist</h3>
                        <p className="text-[#a1a1aa] mb-6">San Francisco / Remote • Full Time</p>
                        <p className="text-[#52525b] text-sm mb-6 leading-relaxed">
                            Fine-tune diffusion models for commercial product cinematography. Push the boundaries of temporal consistency in generative video.
                        </p>
                        <button className="text-[#3b82f6] font-bold hover:underline">Apply Now &rarr;</button>
                    </div>
                    <div className="bg-[#09090b] p-8">
                        <h3 className="text-white text-2xl font-bold mb-2">Frontend Architect</h3>
                        <p className="text-[#a1a1aa] mb-6">Remote • Full Time</p>
                        <p className="text-[#52525b] text-sm mb-6 leading-relaxed">
                            Build the interface that controls the machine. React 19, WebGL, and complex state management for our editor.
                        </p>
                        <button className="text-[#3b82f6] font-bold hover:underline">Apply Now &rarr;</button>
                    </div>
                    <div className="bg-[#09090b] p-8">
                        <h3 className="text-white text-2xl font-bold mb-2">Growth Hacker</h3>
                        <p className="text-[#a1a1aa] mb-6">New York • Full Time</p>
                        <p className="text-[#52525b] text-sm mb-6 leading-relaxed">
                            Scale our user base from 0 to 1M. You understand viral coefficients, SEO, and community building.
                        </p>
                        <button className="text-[#3b82f6] font-bold hover:underline">Apply Now &rarr;</button>
                    </div>
                </div>

                <div className="bg-[#18181b] p-8 rounded border border-[#27272a] text-center">
                    <h3 className="text-white text-xl font-bold mb-2">Don't see your role?</h3>
                    <p className="text-[#a1a1aa] mb-6">We are always looking for exceptional talent.</p>
                    <a href="mailto:jobs@motionpipe.ai" className="bg-[#3b82f6] text-white px-6 py-3 rounded font-bold hover:bg-blue-600 transition-colors">
                        Email Us
                    </a>
                </div>
            </div>
            <Footer />
        </main>
    )
}
