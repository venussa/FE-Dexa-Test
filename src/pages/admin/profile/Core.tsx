import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Index from '@/pages/admin/profile/Index';
import api from "@/api/axios";
import * as Yup from "yup";

interface User {
    id: number;
    name: string;
    email: string;
    position: string;
    phone: string;
    photoUrl?: string;
    address?: string;
    bio?: string;
}

const Core = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/user/profile");
                setUser(res.data);
            } catch (err) {
                console.error("Failed get profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [success]);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
            photoUrl: '',
            bio: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("Required field"),
            address: Yup.string().required("Required field"),
        }),
        onSubmit: async (values) => {
            setError("");
            setSuccess("");

            try {
                const res = await api.patch("/user/profile", values);
                if (res?.data?.email) {
                    setSuccess('Profile has been saved.');
                    setError('');
                    setTimeout(() => setEdit(false), 2000);
                } else {
                    setSuccess('');
                    setError("Failed to update profile data. Please review your information and try saving again.");
                }
            } catch (error:any) {
                setSuccess('');
                setError(error?.response?.data?.message);
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue('name', user?.name ?? '');
        formik.setFieldValue('phone', user?.phone ?? '');
        formik.setFieldValue('address', user?.address ?? '');
        formik.setFieldValue('photoUrl', user?.photoUrl ?? '');
        formik.setFieldValue('bio', user?.bio ?? '');

        if (!edit) {
            setSuccess('');
            setError('');
        }
    }, [user, edit]);

    useEffect(() => {
        if (!edit || !changePassword) {
            formik.setFieldValue('oldPassword', '');
            formik.setFieldValue('newPassword', '');
            formik.setFieldValue('confirmPassword', '');
        }
    }, [edit, changePassword]);

    if (loading) return null;

    const props = { 
        user, formik,
        edit, setEdit,
        changePassword, setChangePassword,
        error, success,
    };

    return <Index {...props} />
};

export default Core;