import { chunk } from "stunk";

export type Language = "EN" | "FR" | "ES" | "DE";

export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    provider: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const authChunk = chunk<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
});

export const languageChunk = chunk<Language>("EN");

export const setAuthUser = (user: User) => {
    authChunk.set({
        user,
        isLoading: false,
        isAuthenticated: true,
    });
};

export const logoutUser = () => {
    authChunk.set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
    });
};

export const setAuthLoading = (isLoading: boolean) => {
    authChunk.set((prev) => ({ ...prev, isLoading }));
};
