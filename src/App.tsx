import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./features/invoice/InvoiceDetail";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeProvider";
import LogIn from "./features/authentication/LogIn";
import SignUp from "./features/authentication/SignUp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="invoices" />} />
              <Route path="invoices" element={<Invoices />} />
              <Route
                path="invoice/view_invoice/:invoiceId"
                element={<InvoiceDetail />}
              />
            </Route>
            <Route path="auth/login" element={<LogIn />} />
            <Route path="auth/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="bottom-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "14px",
              maxWidth: "400px",
              padding: "10px 20px",
              // backgroundColor: "green",
              backdropFilter: "blur(8px)",
              color: "black",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
