import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Index from '@/pages/admin/empolyees/create/Index';
import api from "@/api/axios";
import * as Yup from "yup";

const Core = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            address: '',
            position: '',
            password: '',
            photoUrl: 'https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png',
            bio: 'Defender of The Lost Technology'
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Required field"),
            name: Yup.string().min(3, "Minimum 3 character").required("Required field"),
            phone: Yup.string().matches(/^08\d{6,}$/, "The number must start with 08 and be at least 8 digits.").required("Required field"),
            address: Yup.string().required("Required field"),
            position: Yup.string().required("Required field"),
            password: Yup.string().min(8, "Minimum 8 character").required("Required field"),
            photoUrl: Yup.string().required("Required field"),
        }),
        onSubmit: async (values) => {
            setError("");
            setSuccess("");

            try {
                const res = await api.post("/user/create", values);
                if (res?.data?.email) {
                    formik.resetForm();
                    setSuccess('Profile has been created.');
                    setError('');
                    setTimeout(() => navigate("/admin/employees"), 2000);
                } else {
                    setSuccess('');
                    setError("Failed to create new user. Please review your information and try saving again.");
                }
            } catch (error: any) {
                setSuccess('');
                setError(error?.response?.data?.message);
            }
        },
    });

    const props = { success, error, formik };

    return <Index {...props} />
};

export default Core;