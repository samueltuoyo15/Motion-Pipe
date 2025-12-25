"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { setAuthUser, setAuthLoading } from "@/lib/store";

export function AuthInitializer() {
    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = (await api.get("/auth/me")) as any;
                setAuthUser(user);
            } catch (error) {
                console.warn("Auth check failed - user not logged in");
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, []);

    return null;
}
