import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Users, Globe, Home, TrendingUp, FileText } from "lucide-react";

const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/integration", label: "Intégration Africaine", icon: Globe },
  { path: "/diaspora", label: "Ivoiriens de l'Extérieur", icon: Users },
  { path: "/circulation", label: "Libre Circulation", icon: BarChart3 },
  { path: "/performance", label: "Performance", icon: TrendingUp },
  { path: "/documents-rapports", label: "Documents & Rapports", icon: FileText }
];

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-card/80 border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">ECOBASE</h1>
              <p className="text-xs text-muted-foreground">Ministère de l'Intégration Africaine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
