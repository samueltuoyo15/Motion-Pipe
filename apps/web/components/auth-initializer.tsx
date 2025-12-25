"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { setAuthUser, setAuthLoading } from "@/lib/store";

export function AuthInitializer() {
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setAuthLoading(false);
                return;
            }

            try {
                const user = (await api.get("/auth/me")) as any;
                setAuthUser(user);
            } catch (error) {
                console.warn("Auth check failed:", error);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, []);

    return null;
}
