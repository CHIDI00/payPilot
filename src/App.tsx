import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeProvider";
import AppRoutes from "./routes/AppRoutes";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./services/supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/invoices");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 5000 },
            error: { duration: 5000 },
            style: {
              fontSize: "14px",
              maxWidth: "400px",
              padding: "10px 20px",
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
