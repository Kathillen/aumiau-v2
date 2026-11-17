import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedLayout";
import { Header } from "./components/layout/Header";

import Home from "./pages/Home/index";
import Pagamentos from "./pages/Payment/index";
import Login from "./pages/Login/index";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/pagamentos" element={<Pagamentos />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}