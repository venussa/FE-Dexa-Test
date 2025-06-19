import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Index from '@/pages/user/home/Index';
import api from "@/api/axios";

interface Summary {
    date: string
    checkin: string
    checkout: string
}

interface Data {
    attendance_summary: Summary[]
}

interface User {
    name: string
    attendance_status: string
}

interface ApiResponse {
  currentPage: number
  perPage: number
  total: number
  data: Data[]
}

const Core = () => {

    const [summaryList, setSummaryList] = useState<Data[]>([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [profile, setProfile] = useState<User | null>();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    
    const timeout = useRef<number | null>(null);

    const attendance = async (type:string) => {
        try {
            const res = await api.post(`/attendance/${type}`);
            if (res?.data?.id) {
                setError('');
                setSuccess(`${type === 'checking' ? 'Clock In' : 'Clock Out'} Sucess.`);
                
                setTimeout(() => {
                    navigate("/user/home", { replace: true });
                    navigate(0);
                }, 2000);
            }
        } catch (error:any) {
            setSuccess('');
            setError(error.response.data.message);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await api.get("/user/profile");
            if (res?.data?.id) {
                setProfile(res?.data);
            }
        } catch (error) {
            console.log("error");
        }
    };

    const fetchData = async (reset = false) => {
        setLoading(true);
        try {
            const res = await api.get<ApiResponse>("/attendance/summary", {
                params: {
                    page: reset ? 1 : page,
                    perPage,
                    startDate,
                    endDate,
                },
            });

            if (reset) {
                setSummaryList(res.data.data);
            } else {
                setSummaryList(prev => [...prev, ...res.data.data]);
            }
        } catch (err) {
            console.error("Failed Get Employee Data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeout.current) {
            (timeout.current);
        }

        timeout.current = window.setTimeout(() => {
            setPage(1);
            fetchData(true);
        }, 1000);

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [page, search, startDate, endDate]);

    useEffect(() => {
        fetchProfile();
    }, []);

    const props = {
        search, setSearch,
        summaryList,
        loading,
        setStartDate,
        setEndDate,
        profile,
        attendance,
        error,
        success,
    };

    return <Index {...props} />
};

export default Core;