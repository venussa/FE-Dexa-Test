import { JSX } from "react";
import Login from "@/pages/login/Core";
import AdminHome from "@/pages/admin/home/Core";
import AdminProfile from "@/pages/admin/profile/Core";
import AdminEmployee from "@/pages/admin/empolyees/detail/Core";
import AdminEmployees from "@/pages/admin/empolyees/Core";
import AdminEmployeesCreate from "@/pages/admin/empolyees/create/Core";

import UserHome from "@/pages/user/home/Core";
import UserSummary from "@/pages/user/summary/Core";
import UserProfile from "@/pages/user/profile/Core";

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

  { path: "/user/home", element: <UserHome />, protected: true },
  { path: "/user/summary", element: <UserSummary />, protected: true },
  { path: "/user/profile", element: <UserProfile />, protected: true },
];

export default routes;