import { FormikProps } from "formik";
import { NavLink } from "react-router-dom";

interface Props {
    error: string
    success: string
    formik: FormikProps<{
        email: string
        name: string
        phone: string
        position: string
        address: string
        password: string
        photoUrl: string
        bio: string
    }>;
}


const Index = ({ success, error, formik}: Props) => {

    type FormField = "email" | "name" | "phone" | "address" | "position" | "password" | "photoUrl" | "bio";

    const handleError = (name: FormField) => {
        return formik.touched[name] && formik.errors[name] ? (
            <span className="text-[12px] text-red-600">* {formik.errors[name]}</span>
        ) : '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center px-4 pb-[50px] pt-[50px]">
            <div className='relative bg-white rounded-3xl shadow-xl w-full max-w-md pb-10 px-6 mb-[50px]'>
                <h2 className="text-2xl font-bold mt-4 mb-5 text-center">
                    Add New Employee
                </h2>

                { success && (
                    <p className="text-[#27b948] text-600 text-sm mb-3 text-center bg-[#e0ffe7] px-[10px] py-[10px] rounded">{success}</p>
                )}

                { error && (
                    <p className="text-red-600 text-sm mb-3 text-center bg-[#ffdcda] px-[10px] py-[10px] rounded">{error}</p>
                )}

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Name {handleError('name')}</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.name}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Email {handleError('email')}</label>
                    <input
                        type="text"
                        name="email"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.email}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Phone {handleError('phone')}</label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.phone}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Address {handleError('address')}</label>
                    <input
                        type="text"
                        name="address"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.address}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Position {handleError('position')}</label>
                    <input
                        type="text"
                        name="position"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.position}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[10px]">
                    <label className="text-[15px] text-gray-600">Password {handleError('password')}</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
                        value={formik.values.password}
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>

                <div className="mb-[15px]">
                    <button
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                        className="w-full mt-6 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-2 rounded shadow hover:opacity-90 transition"
                    >
                        Save Changes
                    </button>
                </div>

                <NavLink to="/admin/employees" className="cursor-pointer text-left mt-[20px] text-[#a91e14] hover:font-bold">
                    Back to Employees List
                </NavLink>
                
        
            </div>
        </div>
    );
};

export default Index;