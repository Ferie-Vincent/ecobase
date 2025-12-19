import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Index from "./pages/Index";
import Integration from "./pages/Integration";
import Diaspora from "./pages/Diaspora";
import Circulation from "./pages/Circulation";
import Performance from "./pages/Performance";
import DocumentsRapports from "./pages/DocumentsRapports";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PageAccueil from "./pages/admin/PageAccueil";
import PageIntegration from "./pages/admin/PageIntegration";
import PageDiaspora from "./pages/admin/PageDiaspora";
import PageCirculation from "./pages/admin/PageCirculation";
import PagePerformance from "./pages/admin/PagePerformance";
import PageDocuments from "./pages/admin/PageDocuments";
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
import NotificationsHistory from "./pages/admin/NotificationsHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DataProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<><Navigation /><Index /></>} />
                            <Route path="/integration" element={<><Navigation /><Integration /></>} />
                            <Route path="/diaspora" element={<><Navigation /><Diaspora /></>} />
                            <Route path="/circulation" element={<><Navigation /><Circulation /></>} />
                            <Route path="/performance" element={<><Navigation /><Performance /></>} />
                            <Route path="/documents-rapports" element={<><Navigation /><DocumentsRapports /></>} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/login" element={<Auth />} />
                            
                            {/* Admin routes */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="page-accueil" element={<PageAccueil />} />
                                <Route path="page-integration" element={<PageIntegration />} />
                                <Route path="page-diaspora" element={<PageDiaspora />} />
                                <Route path="page-circulation" element={<PageCirculation />} />
                                <Route path="page-performance" element={<PagePerformance />} />
                                <Route path="page-documents" element={<PageDocuments />} />
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
                                <Route path="notifications" element={<NotificationsHistory />} />
                            </Route>
                            
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
                </DataProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
