import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Users, Globe, Home, TrendingUp, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/integration", label: "Intégration Africaine", icon: Globe },
  { path: "/diaspora", label: "Ivoiriens de l'Extérieur", icon: Users },
  { path: "/circulation", label: "Libre Circulation", icon: BarChart3 },
  { path: "/performance", label: "Performance", icon: TrendingUp }
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
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
          
          <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-2 pl-2 border-l">
              {isAuthenticated && user && (
                <span className="text-xs text-muted-foreground hidden md:inline">
                  {user.nom}
                </span>
              )}
              <Button 
                onClick={handleAuth} 
                size="sm"
                variant={isAuthenticated ? "outline" : "default"}
                className="gap-1.5"
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Déconnexion</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Se connecter</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
