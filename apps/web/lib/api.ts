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
                if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register") && !window.location.pathname.includes("/auth")) {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error.response?.data || error);
    }
);

export { api };
