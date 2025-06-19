import DateRangeFilter from "@/components/DateRangeFilter";
import { format } from "date-fns";
import { Clock, LogIn, LogOut } from "lucide-react";

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

interface props {
    summaryList: Data[]
    loading: boolean
    setStartDate: React.Dispatch<React.SetStateAction<string>>
    setEndDate: React.Dispatch<React.SetStateAction<string>>
    profile: User | null | undefined
    attendance: (node: string) => void
    error: string
    success: string
}

const Index = ({ summaryList, loading, setStartDate, setEndDate, profile, attendance, error, success}: props) => {

    const date = new Date("2025-06-19");
    const formatted = format(date, "dd MMM yyyy");
    const attendanceList = summaryList?.[0]?.attendance_summary ?? [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 flex justify-center px-4 pb-[50px] pt-[50px]">
            <div className='relative bg-white rounded-3xl shadow-xl w-full max-w-md pb-10 px-6 mb-[50px] pt-[30px]'>
                <h2 className="text-2xl font-bold mt-4 mb-5 text-center">
                    Attendance Activity
                </h2>

                <DateRangeFilter
                    onFilter={(start, end) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    onClear={() => {
                        setStartDate('');
                        setEndDate('');
                    }}
                />
                
                <div className="space-y-4">
                    
                    { attendanceList.map((item) => (
                        <div className="py-[1px] w-full">
                            { item?.checkin || item?.checkout ? (
                                <>
                                    <span className="text-grey text-[14px] mr-[20px]">{item?.date}</span>
                                    {item?.checkin && (
                                        <span className="text-[#27b948] bg-[#e0ffe7] px-[10px] text-[12px] rounded-xl mr-[10px] shadow">
                                            IN : {item?.checkin?.split(' ')[1] ?? ''}
                                        </span>
                                    )}

                                    { item?.checkout && (
                                        <span className="text-red-600 bg-[#ffdcda] px-[10px] text-[12px] rounded-xl shadow">
                                            OUT : {item?.checkout?.split(' ')[1] ?? ''}
                                        </span>
                                    )}
                                </>
                            ) : ''}
                        </div>
                    ))}

                    {loading && <div className="text-gray-500 text-center">Loading...</div>}
                    {!loading && attendanceList.length < 1 && <p className="text-gray-500 text-center">Data Not Found</p>}
                </div>
            </div>
        </div>
    );
};

export default Index;