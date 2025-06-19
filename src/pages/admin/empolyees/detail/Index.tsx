import { FormikProps } from "formik";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DateRangeFilter from "@/components/DateRangeFilter";

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

type Summary = {
    date: string
    checkin: string
    checkout: string
}

interface Props {
    user: User | null
    edit: boolean
    setEdit:  React.Dispatch<React.SetStateAction<boolean>>,
    changePassword: boolean
    setChangePassword:  React.Dispatch<React.SetStateAction<boolean>>,
    error: string
    success: string
    deleteUser: () => void,
    summary: Summary[],
    setStartDate: React.Dispatch<React.SetStateAction<string>>,
    setEndDate: React.Dispatch<React.SetStateAction<string>>,
    formik: FormikProps<{
        email: string
        name: string
        phone: string
        address: string
        photoUrl: string
        bio: string
        newPassword: string
        position: string
    }>;
}

const Index = ({ user, edit, setEdit, success, error, formik, changePassword, setChangePassword, deleteUser, summary, setStartDate, setEndDate }: Props) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center px-4 pb-[100px] pt-[60px]">
            <div className={`relative bg-white rounded-3xl shadow-xl w-full max-w-md pb-10 px-6 ${changePassword ? 'mb-[50px]' : ''}`}>

                {!edit ? (
                    <NavLink
                        to="/admin/employees"
                        className="inline-flex items-center transition cursor-pointer text-left mt-[20px] text-[#a91e14] hover:font-bold absolute top-[3px]"
                    >
                        <ArrowLeft size={20} />
                    </NavLink>
                ) : (
                    <span
                        className="inline-flex items-center transition cursor-pointer text-left mt-[20px] text-[#a91e14] hover:font-bold absolute top-[3px]"
                        onClick={() => {
                            setChangePassword(false);
                            setEdit(false);
                        }}
                    >
                        <ArrowLeft size={20} />
                    </span>
                )}

                { !edit && (
                    <div className="mt-20 text-center">
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <img
                            src={user?.photoUrl}
                            alt={user?.name}
                            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                        />
                        </div>

                        <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
                        <p className="text-[12px] text-gray-500 mt-[10px] mb-[10px]">
                            <span className="bg-[#d7d7d7] px-[8px] py-[3px] text-[#666] rounded-[15px]">{user?.position}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-[5px]">{user?.address}</p>

                        <div className="mt-2 text-sm text-gray-600">
                            <p>{user?.email}</p>
                            <p>{user?.phone}</p>
                        </div>

                        <div className="mt-[20px] text-[16px] text-black-600">
                            <p>{user?.bio}</p>
                        </div>

                        { user?.role !== 'ADMIN' && (
                            <div>
                                <button
                                    onClick={() => setEdit(true)}
                                    className="mt-6 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded shadow hover:opacity-90 transition"
                                >
                                    Change Profile
                                </button>
                                <span onClick={() => deleteUser()}>
                                    <div className="cursor-pointer text-center mt-[20px] text-[#a91e14] hover:font-bold">
                                        Delete User
                                    </div>
                                </span>
                            </div>
                        )}

                        {user?.role !== 'ADMIN' && (
                            <div className="border-t-[2px] border-dashed mt-[20px] pt-[20px] text-left">
                                <div className="mb-[10px]">
                                    <label className="text-[16px] text-black-600 font-bold">Attendance Summary</label>
                                </div>

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

                                { summary.length > 0 ? summary.map((item) => (
                                    <div className="p-[10px]">
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
                                )) : (
                                    <div className="text-gray-600 text-center">Data not found.</div>
                                )}
                            </div>
                        )}
                    </div>
                )}


                { edit && (
                    <>
                        <h2 className="text-2xl font-bold mt-4 mb-5 text-centertext-2xl font-bold mt-4 mb-5 text-center">Edit Profile</h2>

                        { success && (
                            <p className="text-[#27b948] text-600 text-sm mb-3 text-center bg-[#e0ffe7] px-[10px] py-[10px] rounded">{success}</p>
                        )}

                        { error && (
                            <p className="text-red-600 text-sm mb-3 text-center bg-[#ffdcda] px-[10px] py-[10px] rounded">{error}</p>
                        )}

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.name}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.email}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.phone}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Position</label>
                            <input
                                type="text"
                                name="position"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.position}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.address}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Photo Url</label>
                            <input
                                type="text"
                                name="photoUrl"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.photoUrl}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        <div className="mb-[10px]">
                            <label className="text-[15px] text-gray-600">Bio</label>
                            <input
                                type="text"
                                name="bio"
                                className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                value={formik.values.bio}
                                onChange={(e) => formik.handleChange(e)}
                            />
                        </div>

                        { changePassword && (
                            <div>
                                <div className="mb-[15px] border-t-[2px] pt-[10px] mt-[30px] border-dashed">
                                    <label className="text-[15px] text-black-600 font-bold">Change Password</label>
                                </div>

                                <div className="mb-[10px]">
                                    <label className="text-[15px] text-gray-600">Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                                        value={formik.values.newPassword}
                                        onChange={(e) => formik.handleChange(e)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="cursor-pointer text-right mt-[20px] text-[#a91e14] hover:font-bold">
                            <span onClick={() => setChangePassword(!changePassword)}>{changePassword ? 'Cancel Change Password' : 'Change Password'}</span>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={() => formik.handleSubmit()}
                                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded shadow hover:opacity-90 transition"
                            >
                                Save Changes
                            </button>
                        </div>

                        <div className="cursor-pointer text-left mt-[20px] text-[#a91e14] hover:font-bold">
                            <span onClick={() => {
                                setChangePassword(false);
                                setEdit(false);
                            }}>Back to Profile</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Index;