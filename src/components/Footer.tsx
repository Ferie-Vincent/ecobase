import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut } from "lucide-react";

export const Footer = () => {
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
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground">ECOBASE</h3>
            <p className="text-sm text-muted-foreground">
              Base de données socioéconomique et technique
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && user && (
              <div className="text-sm text-muted-foreground">
                Connecté: <span className="font-medium text-foreground">{user.nom}</span>
              </div>
            )}
            <Button onClick={handleAuth} variant={isAuthenticated ? "outline" : "default"} className="gap-2">
              {isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
