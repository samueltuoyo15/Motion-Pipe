import Link from "next/link";
import Image from "next/image";

export default function Login() {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF6C00]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF6C00]/10 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#FF6C00]/10 p-4 rounded-2xl border border-[#FF6C00]/20">
                            <Image src="/robot.svg" width={48} height={48} alt="Logo" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-[#A1A1A1]">Log in to your AI Freelancer dashboard</p>
                </div>

                <div className="bg-[#1C1C1C] border border-[#333] p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#A1A1A1] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full bg-[#000000] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6C00] transition-colors"
                                placeholder="you@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#A1A1A1] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-[#000000] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6C00] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button className="w-full bg-[#FF6C00] text-white font-bold py-3 rounded-lg hover:bg-[#FF8833] transition-all transform hover:scale-[1.02]">
                            Log In
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#333] text-center">
                        <p className="text-[#A1A1A1] text-sm">
                            Don't have an account?{" "}
                            <Link href="#" className="text-[#FF6C00] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
