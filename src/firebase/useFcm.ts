import { useEffect } from "react";
import { getFcmToken } from "@/firebase/firebase";
import api from "@/api/axios";

export const useFcm = () => {
    useEffect(() => {
        Notification.requestPermission().then(async (permission) => {
            const me = await api.get("/user/profile");
            const userId = me?.data?.id;
            if (permission === "granted" && userId) {
                const token = await getFcmToken();
                if (token) {
                    await api.post(`${import.meta.env.VITE_API_BASE_URL}/user/save-fcm-token`, { userId, token });
                    console.log(token);
                }
            } else {
                console.warn("Notification access danied.");
            }
        });
    }, []);
};