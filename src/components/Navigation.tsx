import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Users, Globe, Home, TrendingUp, FileText, Menu, X, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-soft">
              <span className="text-xl font-bold text-primary-foreground">E</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-tight text-foreground">ECOBASE</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Ministère de l'Intégration Africaine</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="hidden items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:text-primary md:flex"
            >
              <ShieldCheck className="h-4 w-4" />
              {isAuthenticated ? "Administration" : "Espace administration"}
            </Link>

            {/* Mobile burger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-card/95 backdrop-blur-md lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground"
            >
              <ShieldCheck className="h-4 w-4" />
              {isAuthenticated ? "Administration" : "Espace administration"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
