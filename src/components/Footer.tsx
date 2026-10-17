import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  Facebook,
  Linkedin,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Twitter,
} from "lucide-react";

const quickLinks = [
  { to: "/", label: "Accueil" },
  { to: "/integration", label: "Intégration Africaine" },
  { to: "/diaspora", label: "Ivoiriens de l'Extérieur" },
  { to: "/circulation", label: "Libre Circulation" },
  { to: "/performance", label: "Performance" },
  { to: "/documents-rapports", label: "Documents & Rapports" },
];

const usefulLinks = [
  { href: "https://www.presidence.ci/", label: "Présidence de la République" },
  { href: "https://www.primature.ci/", label: "Primature" },
  { href: "https://web.diplomatie.gouv.ci/accueil", label: "Min. des Affaires Étrangères" },
  { href: "https://www.gouv.ci/", label: "Portail du Gouvernement" },
];

const socials = [
  { href: "https://facebook.com/DGIE.CI", label: "Facebook", icon: Facebook },
  { href: "https://twitter.com/DGIE_CI", label: "X (Twitter)", icon: Twitter },
  { href: "https://linkedin.com/company/dgie-ci", label: "LinkedIn", icon: Linkedin },
];

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-5">
    <h3 className="text-sm font-bold uppercase tracking-wider text-footer-foreground">{children}</h3>
    <span className="mt-2 block h-0.5 w-8 rounded-full bg-secondary" />
  </div>
);

export const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, userDisplayName } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "invalid" | "error">("idle");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: value });
    // 23505 = adresse déjà inscrite : on confirme sans exposer l'existence d'un compte
    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setEmail("");

  };

  return (
    <>
      <footer className="mt-auto">
        {/* Bandeau newsletter */}
        <div className="relative overflow-hidden bg-footer-gradient">
          <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-footer-foreground/10" />
          <div className="pointer-events-none absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-footer-foreground/10" />
          <div className="pointer-events-none absolute right-1/3 top-4 h-24 w-24 rounded-full bg-footer-foreground/10" />

          <div className="container relative mx-auto px-4 py-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-footer-foreground/30">
                  <Mail className="h-5 w-5 text-footer-foreground" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-footer-foreground">Restez informé</h2>
                  <p className="mt-1 max-w-md text-sm text-footer-foreground/80">
                    Recevez les nouvelles données, publications et rapports d'ECOBASE directement dans votre boîte mail.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-md">
                <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-footer-foreground/60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== "idle") setStatus("idle");
                      }}
                      placeholder="Votre adresse e-mail"
                      aria-label="Votre adresse e-mail"
                      className="h-11 w-full rounded-xl border border-footer-foreground/25 bg-footer/50 pl-10 pr-3 text-sm text-footer-foreground outline-none placeholder:text-footer-foreground/50 focus:border-footer-foreground/60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {status === "sending" ? "Envoi…" : "S'inscrire"}
                  </button>
                </form>
                <p
                  className={`mt-2 flex items-center gap-1.5 text-xs ${
                    status === "ok"
                      ? "text-footer-foreground"
                      : status === "error"
                        ? "text-primary"
                        : "text-footer-foreground/70"
                  }`}
                >
                  {status === "ok" ? (
                    <>Merci, votre inscription est bien enregistrée.</>
                  ) : status === "error" ? (
                    <>Merci de saisir une adresse e-mail valide.</>
                  ) : (
                    <>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Vos données sont protégées. Pas de spam, promis.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau tricolore */}
        <div className="h-1 w-full bg-flag-stripe" />

        {/* Corps du pied de page */}
        <div className="bg-footer text-footer-foreground">
          <div className="container mx-auto px-4 py-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {/* Présentation */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                    <span className="text-xl font-extrabold text-primary-foreground">E</span>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold leading-none">
                      ECO<span className="text-primary">BASE</span>
                    </p>
                    <p className="mt-1 text-xs text-footer-muted">Ministère de l'Intégration Africaine</p>
                  </div>
                </div>
                <ColumnTitle>La plateforme</ColumnTitle>
                <p className="text-sm leading-relaxed text-footer-muted">
                  ECOBASE centralise les données socioéconomiques et techniques sur l'intégration africaine,
                  les Ivoiriens de l'Extérieur et la libre circulation des personnes et des biens.
                </p>
                <div className="mt-5 flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-footer-surface text-footer-muted transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Liens rapides */}
              <div>
                <ColumnTitle>Liens rapides</ColumnTitle>
                <ul className="space-y-2.5">
                  {quickLinks.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="inline-flex items-center gap-1.5 text-sm text-footer-muted transition-colors hover:text-primary"
                      >
                        <span className="h-1 w-1 rounded-full bg-secondary" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Liens utiles */}
              <div>
                <ColumnTitle>Liens utiles</ColumnTitle>
                <ul className="space-y-2.5">
                  {usefulLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-footer-muted transition-colors hover:text-primary"
                      >
                        <span className="h-1 w-1 rounded-full bg-secondary" />
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <ColumnTitle>Contact</ColumnTitle>
                <ul className="space-y-3 text-sm text-footer-muted">
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>Abidjan Plateau, 2 plateaux, ENA — à côté de la Chambre Nationale des Métiers</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <a href="tel:+2252722555691" className="transition-colors hover:text-primary">
                      +225 27 22 55 56 91
                    </a>
                  </li>
                  <li className="flex gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <a
                      href="mailto:contact@ivoiriendelexterieur.com"
                      className="break-all transition-colors hover:text-primary"
                    >
                      contact@ivoiriendelexterieur.com
                    </a>
                  </li>
                  <li className="flex gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>Lundi – Vendredi : 8h00 – 16h30</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Barre inférieure */}
          <div className="border-t border-footer-border">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-5 pb-24 text-center md:flex-row md:items-center md:pb-5 md:pr-24 md:text-left">
              <p className="text-xs text-footer-muted">
                © Copyright ECOBASE – {new Date().getFullYear()} | Base de données socioéconomique et technique |
                Tous droits réservés
              </p>
              <div className="flex items-center gap-4">
                {isAuthenticated && userDisplayName && (
                  <span className="text-xs text-footer-muted">
                    Connecté : <span className="font-medium text-footer-foreground">{userDisplayName}</span>
                  </span>
                )}
                <button
                  onClick={handleAuth}
                  className="inline-flex items-center gap-2 rounded-lg border border-footer-border px-3 py-1.5 text-xs font-medium text-footer-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {isAuthenticated ? (
                    <>
                      <LogOut className="h-3.5 w-3.5" />
                      Se déconnecter
                    </>
                  ) : (
                    <>
                      <LogIn className="h-3.5 w-3.5" />
                      Espace administration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Retour en haut */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Revenir en haut de la page"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-soft transition-all duration-300 hover:opacity-90 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
};
