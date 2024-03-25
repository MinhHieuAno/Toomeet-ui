"use server";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.interceptors.request.use(
    (request) => {
        const cookieStore = cookies();
        const token = cookieStore.get("access_token")?.value;
        if (token) {
            request.headers["Authorization"] = `Bearer ${token}`;
        }
        return request;
    },
    ///
    (error: any) => {
        return error;
    }
);

export default api;
