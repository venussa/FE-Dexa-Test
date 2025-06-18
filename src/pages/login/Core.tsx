import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import Index from '@/pages/login/Index';
import api from "@/api/axios";
import * as Yup from "yup";

const Core = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Format email tidak valid").required("Email wajib diisi"),
            password: Yup.string().required("Password wajib diisi"),
        }),
        onSubmit: async (values) => {
            setError("");
            try {
                const res = await api.post("/auth/login", values);
                const token = res.data.accessToken;

                localStorage.setItem("token", token);
                login(token);

                const me = await api.get("/user/profile");
                const role = me.data.role.toLowerCase();
                navigate(`/${role}/profile`);
            } catch {
                setError("Email atau password salah");
            }
        },
    });

    const props = { formik, error };

    return <Index {...props} />;
};

export default Core;