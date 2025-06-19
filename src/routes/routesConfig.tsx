import { JSX } from "react";
import Login from "@/pages/login/Core";
import AdminHome from "@/pages/admin/home/Core";
import AdminProfile from "@/pages/admin/profile/Core";
import AdminEmployee from "@/pages/admin/empolyees/detail/Core";
import AdminEmployees from "@/pages/admin/empolyees/Core";
import AdminEmployeesCreate from "@/pages/admin/empolyees/create/Core";

export interface RouteItem {
  path: string;
  element: JSX.Element;
  protected?: boolean;
}

const routes: RouteItem[] = [
  { path: "/login", element: <Login />, protected: false },

  { path: "/admin/home", element: <AdminHome />, protected: true },
  { path: "/admin/profile", element: <AdminProfile />, protected: true },
  { path: "/admin/employee/:id", element: <AdminEmployee />, protected: true },
  { path: "/admin/employees", element: <AdminEmployees />, protected: true },
  { path: "/admin/employees/create", element: <AdminEmployeesCreate />, protected: true },
];

export default routes;