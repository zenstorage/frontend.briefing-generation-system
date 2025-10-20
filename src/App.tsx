import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "@/components/Dashboard";
import { BriefingGenerator } from "@/components/BriefingGenerator";
import NotFound from "./pages/NotFound";
import PublicLayout from "./pages/PublicLayout";
import AdminLogin from "./pages/AdminLogin";
import Pricing from "./pages/Pricing";
// import { config } from "dotenv"

// config();


// export const API_ENDPOINT = process.env.API_ENDPOINT;

// export const API_ENDPOINT="http://localhost:3000"
export const API_ENDPOINT = process?.env?.API_ENDPOINT || "http://206.42.50.24:3000";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route path="/dashboard/new/:step?" element={<BriefingGenerator onBack={() => {}} />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
