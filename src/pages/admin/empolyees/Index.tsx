import { UserPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Employees {
  id: string
  email: string
  name: string
  position: string
  phone: string
  photoUrl: string
  role: string
  address: string
  bio: string
}

interface props {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    lastItemRef: (node: HTMLDivElement | null) => void
    employeesList: Employees[]
    loading: boolean
}


const Index = ({ search, setSearch, lastItemRef, employeesList, loading}: props) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 flex justify-center px-4 pb-[50px] pt-[50px]">
            <div className='relative bg-white rounded-3xl shadow-xl w-full max-w-md pb-10 px-6 mb-[50px]'>
                <h2 className="text-2xl font-bold mt-4 mb-5 text-center">
                    Employees
                </h2>

                <NavLink to="/admin/employees/create">
                    <button className="w-[70px] text-center bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded-tr-3xl rounded-bl-3xl rounded-tl-xl rounded-br-xl shadow hover:opacity-90 transition absolute top-[5px] right-[5px]">
                        <UserPlus size="20" />
                    </button>
                </NavLink>
                
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search employees name ..."
                        className="border px-4 py-2 rounded w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {employeesList.map((employees, idx) => {
                        const isLast = idx === employeesList.length - 1;
                        return (
                            <NavLink to={`/admin/employee/${employees.id}`}>
                                <div
                                    key={employees.id}
                                    ref={isLast ? lastItemRef : null}
                                    className="border p-4 rounded flex gap-4 mb-[10px] hover:bg-[#f9f9f9] cursor-pointer"
                                >
                                    <img
                                        src={employees.photoUrl}
                                        alt={employees.name}
                                        className="w-[50px] h-[50px] object-cover rounded-full border"
                                    />
                                    <div>
                                        <p className="font-semibold">{employees.name}</p>
                                        <p className={`text-[13px] ${employees.role === 'ADMIN' ? `text-[#a91e14]` : 'text-gray-600'}`}>{employees.position}</p>
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