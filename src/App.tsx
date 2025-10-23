import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Integration from "./pages/Integration";
import Diaspora from "./pages/Diaspora";
import Circulation from "./pages/Circulation";
import Performance from "./pages/Performance";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Indicateurs from "./pages/admin/Indicateurs";
import Donnees from "./pages/admin/Donnees";
import Organisations from "./pages/admin/Organisations";
import Programmes from "./pages/admin/Programmes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<><Navigation /><Dashboard /></>} />
                            <Route path="/integration" element={<><Navigation /><Integration /></>} />
                            <Route path="/diaspora" element={<><Navigation /><Diaspora /></>} />
                            <Route path="/circulation" element={<><Navigation /><Circulation /></>} />
                            <Route path="/performance" element={<><Navigation /><Performance /></>} />
                            <Route path="/login" element={<Login />} />
                            
                            {/* Admin routes */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="indicateurs" element={<Indicateurs />} />
                                <Route path="donnees" element={<Donnees />} />
                                <Route path="organisations" element={<Organisations />} />
                                <Route path="programmes" element={<Programmes />} />
                            </Route>
                            
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
