import { NavLink } from "react-router-dom";
import DateRangeFilter from "@/components/DateRangeFilter";

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

interface props {
    lastItemRef: (node: HTMLDivElement | null) => void
    employeesList: Data[]
    loading: boolean,
    setStartDate: React.Dispatch<React.SetStateAction<string>>,
    setEndDate: React.Dispatch<React.SetStateAction<string>>,
}


const Index = ({ lastItemRef, employeesList, loading, setStartDate, setEndDate}: props) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 flex justify-center px-4 pb-[50px] pt-[50px]">
            <div className='relative bg-white rounded-3xl shadow-xl w-full max-w-md pb-10 px-6 mb-[50px]'>
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
                    {employeesList.map((employees, idx) => {
                        const isLast = idx === employeesList.length - 1;
                        return (
                            <NavLink to={`/admin/employee/${employees?.user?.id}`}>
                                <div
                                    key={employees?.user?.id}
                                    ref={isLast ? lastItemRef : null}
                                    className="border p-4 rounded flex gap-4 mb-[10px] hover:bg-[#f9f9f9] cursor-pointer relative"
                                >
                                    <img
                                        src={employees?.user?.photoUrl}
                                        alt={employees?.user?.name}
                                        className="w-[50px] h-[50px] object-cover rounded-full border"
                                    />
                                    <div>
                                        <p className="font-semibold">{employees?.user?.name}</p>
                                        <p className='text-[13px] text-gray-600'>{employees?.user?.position}</p>
                                        <span className="text-gray-600 text-[12px] mr-[20px] absolute top-[5px]" style={{ right: -10 }}>{employees?.date}</span>


                                        { employees?.checkin || employees?.checkout ? (
                                            <>
                                                {employees?.checkin && (
                                                    <span className="text-[#27b948] bg-[#e0ffe7] px-[10px] text-[11px] rounded-xl mr-[10px] shadow">
                                                        IN : {employees?.checkin?.split(' ')[1] ?? ''}
                                                    </span>
                                                )}

                                                { employees?.checkout && (
                                                    <span className="text-red-600 bg-[#ffdcda] px-[10px] text-[11px] rounded-xl  shadow">
                                                        OUT : {employees?.checkout?.split(' ')[1] ?? ''}
                                                    </span>
                                                )}
                                            </>
                                        ) : ''}                                        
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })}
                    {loading && <div className="text-gray-500 text-center">Loading...</div>}
                    {!loading && employeesList.length < 1 && <p className="text-gray-500 text-center">Data Not Found</p>}
                </div>
            </div>
        </div>
    );
};

export default Index;