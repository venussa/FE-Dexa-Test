import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Users, User, BarChart } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const menu = user.role === "ADMIN"
    ? [
        { label: "Home", icon: <Home size={20} />, path: "/admin/home" },
        { label: "Employees", icon: <Users size={20} />, path: "/admin/employees" },
        { label: "Profile", icon: <User size={20} />, path: "/admin/profile" },
      ]
    : [
        { label: "Home", icon: <Home size={20} />, path: "/user/home" },
        { label: "Summary", icon: <BarChart size={20} />, path: "/user/summary" },
        { label: "Profile", icon: <User size={20} />, path: "/user/profile" },
    ];

return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="mx-auto w-full max-w-md rounded-t-2xl px-4 py-2">
            <div className="flex justify-between items-center">
                {menu.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.label}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center text-xs flex-1 py-2 transition-all duration-200 ${
                            isActive ? "text-[#a91e14]" : "text-gray-500 hover:text-[#a91e14]"
                            } hover:scale-105`
                        }
                        >
                        <div className="relative">{item.icon}</div>
                        <span className="mt-1">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Navbar;