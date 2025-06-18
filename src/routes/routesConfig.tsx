import { JSX } from "react";
import Login from "@/pages/login/Core";

export interface RouteItem {
  path: string;
  element: JSX.Element;
  protected?: boolean;
}

const routes: RouteItem[] = [
  { path: "/login", element: <Login />, protected: false },
];

export default routes;