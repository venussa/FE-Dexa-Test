import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Index from '@/pages/admin/empolyees/detail/Index';
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
    role: string
}

const Core = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/user?userId=${id}`);
                setUser(res.data.data[0] ?? {});
            } catch (err) {
                navigate('/admin/employees');
                console.error("Failed get profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [success]);

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            address: '',
            photoUrl: '',
            position: '',
            bio: '',
            newPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Required field"),
            name: Yup.string().min(3, "Minimum 3 character").required("Required field"),
            phone: Yup.string().matches(/^08\d{6,}$/, "The number must start with 08 and be at least 8 digits.").required("Required field"),
            address: Yup.string().required("Required field"),
            position: Yup.string().required("Required field"),
        }),
        onSubmit: async (values) => {
            setError("");
            setSuccess("");

            try {
                const res = await api.patch(`/user/edit/${user?.id}`, values);
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

    const deleteUser = async () => {
        if (confirm("Are you sure you want to delete this employee's data?")) {
            try {
                const res = await api.delete(`/user/delete/${user?.id}`);
                if (res?.data?.message) {
                    navigate("/admin/employees");
                }
            } catch (error) {
                console.log("error");
            }
        }
    };

    const getSummary = async () => {
        try {
            if (user?.id) {
                const res = await api.get(`/attendance/summary`, {
                    params: {
                        userId: user?.id,
                        startDate,
                        endDate,
                    },
                });
                setSummary(res.data.data[0].attendance_summary ?? []);
            }
        } catch (error) {
            console.log("error");
        }
    };

    useEffect(() => {
        getSummary();
    }, [user?.id, startDate, endDate]);

    useEffect(() => {
        formik.setFieldValue('email', user?.email ?? '');
        formik.setFieldValue('name', user?.name ?? '');
        formik.setFieldValue('phone', user?.phone ?? '');
        formik.setFieldValue('photoUrl', user?.photoUrl ?? '');
        formik.setFieldValue('address', user?.address ?? '');
        formik.setFieldValue('bio', user?.position ?? '');
        formik.setFieldValue('position', user?.bio ?? '');

        if (!edit) {
            setSuccess('');
            setError('');
        }
    }, [user, edit]);

    useEffect(() => {
        if (!edit || !changePassword) {
            formik.setFieldValue('newPassword', '');
        }
    }, [edit, changePassword]);

    if (loading) return null;

    const props = { 
        user, formik,
        edit, setEdit,
        changePassword, setChangePassword,
        error, success,
        deleteUser,
        summary,
        setStartDate,
        setEndDate,
    };

    return <Index {...props} />
};

export default Core;