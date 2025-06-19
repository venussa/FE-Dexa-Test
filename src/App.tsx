import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useFcm } from "@/firebase/useFcm";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/Navbar";
import { listenForegroundMessage } from "@/firebase/firebase";
import { toast } from "react-toastify";

function App() {

  useFcm();

  useEffect(() => {
    listenForegroundMessage((payload) => {
      const title = payload.notification?.title || "Notifikasi";
      const body = payload.notification?.body || "-";
      toast(`${title}: ${body}`);
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
