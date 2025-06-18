import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar /> {/* ⬅️ HARUS ADA */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
