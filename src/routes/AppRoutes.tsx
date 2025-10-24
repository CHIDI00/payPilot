// AppRoutes.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "../ui/AppLayout";
import Invoices from "../pages/Invoices";
import InvoiceDetail from "../features/invoice/InvoiceDetail";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="invoices" />} />
          <Route path="invoices" element={<Invoices />} />
          <Route
            path="invoice/view_invoice/:invoiceId"
            element={<InvoiceDetail />}
          />
        </Route>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
