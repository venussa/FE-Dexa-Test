import { useEffect, useState, useRef, useCallback } from "react";
import Index from '@/pages/admin/home/Index';
import api from "@/api/axios";

interface Employees {
  id: string
  email: string
  name: string
  position: string
  phone: string
  photoUrl: string
  address: string
  bio: string
}

interface Data {
    checkin: string
    checkout: string
    date: string
    user: Employees
}

interface ApiResponse {
  currentPage: number
  perPage: number
  total: number
  data: Data[]
}

const Core = () => {

    const [employeesList, setEmployeesList] = useState<Data[]>([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const timeout = useRef<number | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && employeesList.length < total) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, employeesList.length, total]);

    const fetchData = async (reset = false) => {
        setLoading(true);
        try {
            const res = await api.get<ApiResponse>("/attendance/history", {
                params: {
                    page: reset ? 1 : page,
                    perPage,
                    name: search || undefined,
                    startDate,
                    endDate,
                },
            });

            if (reset) {
                setEmployeesList(res.data.data);
            } else {
                setEmployeesList(prev => [...prev, ...res.data.data]);
            }

            setTotal(res.data.total);
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

    const props = {
        search, setSearch,
        lastItemRef,
        employeesList,
        loading,
        setStartDate,
        setEndDate,
    };

    return <Index {...props} />
};

export default Core;