import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                const isProtectedRoute = window.location.pathname.startsWith("/dashboard");

                if (isProtectedRoute) {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error.response?.data || error);
    }
);

export { api };
