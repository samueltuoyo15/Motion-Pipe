"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setAuthUser, setAuthLoading } from "@/lib/store";
import { toast } from "sonner";

function AuthSuccessContent() {
    const router = useRouter();

    useEffect(() => {
        const handleAuth = async () => {
            try {
                setAuthLoading(true);

                const user = (await api.get("/auth/me")) as any;
                setAuthUser(user);

                toast.success("Successfully logged in!");
                router.push("/dashboard");
            } catch (error) {
                console.error("Failed to fetch user:", error);
                toast.error("Failed to load user profile");
                router.push("/login");
            } finally {
                setAuthLoading(false);
            }
        };

        handleAuth();
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-[#09090b]">
            <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-white">Completing login...</h2>
                <p className="text-[#a1a1aa]">Please wait while we redirect you.</p>
            </div>
        </div>
    );
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSuccessContent />
        </Suspense>
    );
}
