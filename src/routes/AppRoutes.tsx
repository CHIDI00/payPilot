import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Loader from "@/ui/Loader";

import supabase from "../services/supabase";

const AppLayout = lazy(() => import("../ui/AppLayout"));
const Invoices = lazy(() => import("../pages/Invoices"));
const InvoiceDetail = lazy(() => import("../features/invoice/InvoiceDetail"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Settings = lazy(() => import("../pages/Settings"));
const UserAccount = lazy(() => import("../pages/UserAccount"));
const CompanyInfo = lazy(() => import("../pages/CompanyInfo"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function AppRoutes() {
  const location = useLocation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // navigate("/invoices");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
            <Route
              path="settings"
              element={
                <Settings
                  checked={isNotificationsEnabled}
                  onChange={(e) => setIsNotificationsEnabled(e.target.checked)}
                />
              }
            />
            <Route path="settings/profile" element={<UserAccount />} />
            <Route path="settings/company_profile" element={<CompanyInfo />} />
          </Route>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default AppRoutes;
