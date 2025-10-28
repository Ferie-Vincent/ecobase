import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
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
import StructuresNationales from "./pages/admin/StructuresNationales";
import StructuresInternes from "./pages/admin/StructuresInternes";
import Partenaires from "./pages/admin/Partenaires";
import Pays from "./pages/admin/Pays";
import Workflow from "./pages/admin/Workflow";
import Connecteurs from "./pages/admin/Connecteurs";
import Utilisateurs from "./pages/admin/Utilisateurs";
import Rapports from "./pages/admin/Rapports";
import Parametres from "./pages/admin/Parametres";
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
                            <Route path="/about" element={<><Navigation /><About /></>} />
                            <Route path="/integration" element={<><Navigation /><Integration /></>} />
                            <Route path="/diaspora" element={<><Navigation /><Diaspora /></>} />
                            <Route path="/circulation" element={<><Navigation /><Circulation /></>} />
                            <Route path="/performance" element={<><Navigation /><Performance /></>} />
                            <Route path="/login" element={<Login />} />
                            
                            {/* Admin routes */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="organisations" element={<Organisations />} />
                                <Route path="structures-nationales" element={<StructuresNationales />} />
                                <Route path="structures-internes" element={<StructuresInternes />} />
                                <Route path="partenaires" element={<Partenaires />} />
                                <Route path="pays" element={<Pays />} />
                                <Route path="programmes" element={<Programmes />} />
                                <Route path="indicateurs" element={<Indicateurs />} />
                                <Route path="donnees" element={<Donnees />} />
                                <Route path="workflow" element={<Workflow />} />
                                <Route path="rapports" element={<Rapports />} />
                                <Route path="connecteurs" element={<Connecteurs />} />
                                <Route path="utilisateurs" element={<Utilisateurs />} />
                                <Route path="parametres" element={<Parametres />} />
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
