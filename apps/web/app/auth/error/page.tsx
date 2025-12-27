"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function AuthErrorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const message = searchParams.get("message");

        switch (message) {
            case "authentication_failed":
                setErrorMessage("Authentication failed. Please try again.");
                break;
            case "account_inactive":
                setErrorMessage("Your account has been deactivated. Please contact support.");
                break;
            case "internal_error":
                setErrorMessage("An internal error occurred. Please try again later.");
                break;
            default:
                setErrorMessage("An unknown error occurred during authentication.");
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-md px-6">
                <div className="text-center mb-8">
                    <Link href="/" className="flex justify-center mb-6">
                        <img src="/logo.png" alt="Motion Pipe Logo" className="w-16 h-16 rounded-xl" />
                    </Link>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
                        <svg
                            className="w-16 h-16 text-red-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>

                        <h1 className="text-2xl font-bold text-white mb-2">Authentication Failed</h1>
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/login")}
                            className="w-full bg-[#3b82f6] text-white py-3 px-6 rounded-lg hover:bg-[#2563eb] transition-all font-medium"
                        >
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="block w-full bg-[#18181b] border border-[#27272a] text-white py-3 px-6 rounded-lg hover:bg-[#27272a] transition-all font-medium text-center"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <AuthErrorContent />
        </Suspense>
    );
}
