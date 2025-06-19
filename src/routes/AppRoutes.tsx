import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routesConfig";
import RequireAuth from "./RequireAuth";
import RoleGuard from "./RoleGuard";
import { useAuth } from "@/contexts/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return false;

  return (
    <Routes>
      {routes.map(({ path, element, protected: isProtected }, i) => {
        let wrapped = element;

        if (isProtected) {
          const isAdminRoute = path.startsWith("/admin");
          wrapped = (
            <RequireAuth>
              <RoleGuard allowedRole={isAdminRoute ? "ADMIN" : "USER"}>
                {element}
              </RoleGuard>
            </RequireAuth>
          );
        }

        if (path === "/login" && isAuthenticated && user) {
          return (
            <Route
              key={i}
              path={path}
              element={<Navigate to={`/${user.role.toLowerCase()}/home`} replace />}
            />
          );
        }

        return <Route key={i} path={path} element={wrapped} />;
      })}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;