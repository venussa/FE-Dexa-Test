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
                <p className="font-bold text-[15px] text-[#353535]">Hi, {profile?.name}</p>
                <p className="text-gray-500 mb-[10px] text-[12px]">Don't miss your attendance today !</p>
                <div className="bg-gradient-to-r from-pink-500 to-red-400 text-white p-[10px] rounded-[10px] shadow mb-[15px]">
                    <div className="text-[14px]">Office Hour</div>
                    <label className="font-bold text-[15px]">
                        <Clock size="20" className="inline-block" /> 
                        <span className="relative top-[1px] ml-[10px]">{formatted} (09:00 - 17:00)</span>
                    </label>
                    <div className="mt-[20px] mb-[10px] bg-white rounded-[10px] p-[10px]">
                        <div onClick={() => attendance('checkin')} className="text-gray-500 hover:text-[#a91e14] px-[10px] cursor-pointer w-1/2 inline-block border-r border-[#0666] text-center">
                            <LogIn size="20" className="inline-block" /> Clock In
                        </div>
                        <div onClick={() => attendance('checkout')} className="text-gray-500 hover:text-[#a91e14] px-[10px] cursor-pointer w-1/2 inline-block text-center">
                            <LogOut size="20" className="inline-block" /> Clock Out
                        </div>
                    </div>
                </div>

                { success && (
                    <p className="text-[#27b948] text-600 text-sm mb-3 text-center bg-[#e0ffe7] px-[10px] py-[10px] mb-[15px]">{success}</p>
                )}

                { error && (
                    <p className="text-red-600 text-sm mb-3 text-center bg-[#ffdcda] px-[10px] py-[10px] rounded mb-[15px]">{error}</p>
                )}

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
                        <div className="py-[1px]">
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