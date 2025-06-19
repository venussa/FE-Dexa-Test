import { FormikProps } from "formik";

interface Props {
    formik: FormikProps<{ email: string; password: string }>;
    error: string;
}

const Index = ({ formik, error }: Props) => {

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-400 to-orange-300">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
                <div className="flex justify-center mb-[20px]">
                    <div className="flex justify-center">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-[150px] h-12 object-contain"
                        />
                    </div>
                </div>

            {error && <p className="text-red-600 text-sm mb-3 text-center bg-[#ffdcda] px-[10px] py-[10px] rounded">{error}</p>}

            <div className="space-y-4">
                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="pt-[20px]">
                    <button
                        type="submit"
                        className="w-full py-2 text-white font-semibold rounded bg-gradient-to-r from-pink-500 to-red-400 text-white transition"
                        onClick={() => formik.handleSubmit()}
                    >
                        LOGIN
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;