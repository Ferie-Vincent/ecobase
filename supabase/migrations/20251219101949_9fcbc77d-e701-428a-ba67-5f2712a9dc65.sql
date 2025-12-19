-- Table pour les informations du ministre
CREATE TABLE public.ministre_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL DEFAULT 'S.E.M ADAMA DOSSO',
  titre TEXT NOT NULL DEFAULT 'Ministre Délégué',
  titre_complet TEXT NOT NULL DEFAULT 'Le Ministre Délégué auprès du Ministre des Affaires Étrangères, chargé de l''Intégration Africaine et des Ivoiriens de l''Extérieur',
  citation TEXT NOT NULL DEFAULT 'L''intégration africaine et l''accompagnement de nos compatriotes de l''extérieur constituent des leviers essentiels pour le développement de notre Nation. Ensemble, bâtissons une Côte d''Ivoire ouverte sur l''Afrique et connectée à sa diaspora.',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les piliers stratégiques
CREATE TABLE public.piliers_strategiques (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  titre TEXT NOT NULL,
  description TEXT,
  icone TEXT NOT NULL DEFAULT 'Globe2',
  ordre INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les partenaires
CREATE TABLE public.partenaires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  sigle TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('National', 'Régional', 'International', 'Nationale', 'Internationale', 'Régionale', 'PTF')),
  url TEXT,
  statut TEXT NOT NULL DEFAULT 'Actif' CHECK (statut IN ('Actif', 'Inactif')),
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les statistiques du dashboard par année
CREATE TABLE public.dashboard_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  annee TEXT NOT NULL,
  nom TEXT NOT NULL,
  valeur TEXT NOT NULL,
  unite TEXT,
  tendance TEXT,
  categorie TEXT NOT NULL CHECK (categorie IN ('Intégration', 'Diaspora', 'Circulation')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les poids régionaux
CREATE TABLE public.poids_regionaux (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  valeur DECIMAL NOT NULL,
  unite TEXT NOT NULL DEFAULT '%',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ministre_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.piliers_strategiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partenaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poids_regionaux ENABLE ROW LEVEL SECURITY;

-- Public read policies (données publiques accessibles à tous)
CREATE POLICY "Public read access for ministre_info" 
ON public.ministre_info FOR SELECT 
USING (true);

CREATE POLICY "Public read access for piliers_strategiques" 
ON public.piliers_strategiques FOR SELECT 
USING (true);

CREATE POLICY "Public read access for partenaires" 
ON public.partenaires FOR SELECT 
USING (true);

CREATE POLICY "Public read access for dashboard_stats" 
ON public.dashboard_stats FOR SELECT 
USING (true);

CREATE POLICY "Public read access for poids_regionaux" 
ON public.poids_regionaux FOR SELECT 
USING (true);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ministre_info_updated_at
BEFORE UPDATE ON public.ministre_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_piliers_updated_at
BEFORE UPDATE ON public.piliers_strategiques
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partenaires_updated_at
BEFORE UPDATE ON public.partenaires
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dashboard_stats_updated_at
BEFORE UPDATE ON public.dashboard_stats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_poids_regionaux_updated_at
BEFORE UPDATE ON public.poids_regionaux
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data for ministre_info
INSERT INTO public.ministre_info (nom, titre, titre_complet, citation) VALUES (
  'S.E.M ADAMA DOSSO',
  'Ministre Délégué',
  'Le Ministre Délégué auprès du Ministre des Affaires Étrangères, chargé de l''Intégration Africaine et des Ivoiriens de l''Extérieur',
  'L''intégration africaine et l''accompagnement de nos compatriotes de l''extérieur constituent des leviers essentiels pour le développement de notre Nation. Ensemble, bâtissons une Côte d''Ivoire ouverte sur l''Afrique et connectée à sa diaspora.'
);

-- Insert initial piliers
INSERT INTO public.piliers_strategiques (code, titre, description, icone, ordre) VALUES 
('INT', 'Intégration régionale', 'Mesure de l''intégration régionale et du commerce intra-africain', 'Globe2', 1),
('DIA', 'Ivoiriens de l''Extérieur', 'Suivi des Ivoiriens de l''extérieur et accompagnement de leur contribution au développement national', 'Users', 2),
('MACRO', 'Données transversales', 'Indicateurs macroéconomiques et transversaux', 'TrendingUp', 3);