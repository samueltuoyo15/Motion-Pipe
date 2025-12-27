import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

api.interceptors.request.use(
    (config) => {
        const token = getCookie("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                const isProtectedRoute = window.location.pathname.startsWith("/dashboard");

                if (isProtectedRoute) {
                    document.cookie = "access_token=; path=/; max-age=0";
                    document.cookie = "refresh_token=; path=/; max-age=0";
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error.response?.data || error);
    }
);

export { api };
