import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AnimatePresence } from "framer-motion";
import Loader from "@/ui/Loader";

const AppLayout = lazy(() => import("../ui/AppLayout"));
const Invoices = lazy(() => import("../pages/Invoices"));
const InvoiceDetail = lazy(() => import("../features/invoice/InvoiceDetail"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const UserAccount = lazy(() => import("../pages/UserAccount"));

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
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
            <Route path="account" element={<UserAccount />} />
          </Route>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default AppRoutes;
