import React, { createContext, useContext, useState, ReactNode } from "react";

// Types pour les indicateurs
export interface Indicator {
  name: string;
  value: number;
  unit: string;
  trend: string;
  category: string;
}

export interface SlecDetails {
  entreprisesAgreees: number;
  entreprisesActives: number;
  tauxActivite: number;
  produitsAgrees: number;
  volumeExports: number;
  partSleIntraRegional: number;
}

export interface Partner {
  id: string;
  nom: string;
  sigle: string;
  type: "National" | "Régional" | "International";
  url?: string;
  statut: "Actif" | "Inactif";
}

export interface ContentSection {
  id: string;
  titre: string;
  contenu: string;
}

export interface PilierStrategique {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

export interface PoidsRegional {
  id: string;
  nom: string;
  valeur: number;
  unite: string;
}

// État global des données
interface DataState {
  // Indicateurs par année et par domaine
  integrationIndicatorsByYear: Record<string, Indicator[]>;
  diasporaIndicatorsByYear: Record<string, Indicator[]>;
  circulationIndicatorsByYear: Record<string, Indicator[]>;
  
  // Détails SLEC par année
  slecDetailsByYear: Record<string, SlecDetails>;
  
  // Partenaires
  partners: Partner[];
  
  // Sections de contenu
  integrationContentSections: ContentSection[];
  diasporaContentSections: ContentSection[];
  
  // Piliers stratégiques
  piliers: PilierStrategique[];
  
  // Poids régionaux
  poidsRegionaux: PoidsRegional[];
  
  // Années disponibles
  availableYears: string[];
}

// Actions pour mettre à jour les données
interface DataActions {
  // Indicateurs
  updateIntegrationIndicators: (year: string, indicators: Indicator[]) => void;
  updateDiasporaIndicators: (year: string, indicators: Indicator[]) => void;
  updateCirculationIndicators: (year: string, indicators: Indicator[]) => void;
  
  // SLEC
  updateSlecDetails: (year: string, details: SlecDetails) => void;
  
  // Partenaires
  updatePartners: (partners: Partner[]) => void;
  addPartner: (partner: Partner) => void;
  removePartner: (id: string) => void;
  
  // Sections de contenu
  updateIntegrationContent: (sections: ContentSection[]) => void;
  updateDiasporaContent: (sections: ContentSection[]) => void;
  
  // Piliers
  updatePiliers: (piliers: PilierStrategique[]) => void;
  
  // Poids régionaux
  updatePoidsRegionaux: (poids: PoidsRegional[]) => void;
  
  // Années
  addYear: (year: string) => void;
  removeYear: (year: string) => void;
}

type DataContextType = DataState & DataActions;

const DataContext = createContext<DataContextType | undefined>(undefined);

// Données initiales (importées de mockData)
const initialIntegrationIndicators: Record<string, Indicator[]> = {
  "2020": [
    { name: "Résilience climatique", value: 58.3, unit: "%", trend: "+2.1%", category: "CILSS" },
    { name: "Développement Capital Humain", value: 0.60, unit: "indice", trend: "+0.02", category: "Social" },
    { name: "Entreprises SLEC agréées", value: 189, unit: "entreprises", trend: "+12", category: "Commerce" },
    { name: "Produits SLEC agréés", value: 1456, unit: "produits", trend: "+98", category: "Commerce" },
    { name: "Exportations SLEC", value: 32.4, unit: "Mds FCFA", trend: "+8.2%", category: "Commerce" },
    { name: "Part exportations SLE", value: 26.8, unit: "%", trend: "+1.8%", category: "Commerce" }
  ],
  "2021": [
    { name: "Résilience climatique", value: 61.2, unit: "%", trend: "+2.9%", category: "CILSS" },
    { name: "Développement Capital Humain", value: 0.63, unit: "indice", trend: "+0.03", category: "Social" },
    { name: "Entreprises SLEC agréées", value: 207, unit: "entreprises", trend: "+18", category: "Commerce" },
    { name: "Produits SLEC agréés", value: 1589, unit: "produits", trend: "+133", category: "Commerce" },
    { name: "Exportations SLEC", value: 37.8, unit: "Mds FCFA", trend: "+9.5%", category: "Commerce" },
    { name: "Part exportations SLE", value: 29.3, unit: "%", trend: "+2.5%", category: "Commerce" }
  ],
  "2022": [
    { name: "Résilience climatique", value: 64.1, unit: "%", trend: "+2.9%", category: "CILSS" },
    { name: "Développement Capital Humain", value: 0.65, unit: "indice", trend: "+0.02", category: "Social" },
    { name: "Entreprises SLEC agréées", value: 227, unit: "entreprises", trend: "+20", category: "Commerce" },
    { name: "Produits SLEC agréés", value: 1707, unit: "produits", trend: "+118", category: "Commerce" },
    { name: "Exportations SLEC", value: 41.3, unit: "Mds FCFA", trend: "+10.8%", category: "Commerce" },
    { name: "Part exportations SLE", value: 31.1, unit: "%", trend: "+1.8%", category: "Commerce" }
  ],
  "2023": [
    { name: "Résilience climatique", value: 67.5, unit: "%", trend: "+3.4%", category: "CILSS" },
    { name: "Développement Capital Humain", value: 0.68, unit: "indice", trend: "+0.03", category: "Social" },
    { name: "Entreprises SLEC agréées", value: 245, unit: "entreprises", trend: "+18", category: "Commerce" },
    { name: "Produits SLEC agréés", value: 1834, unit: "produits", trend: "+127", category: "Commerce" },
    { name: "Exportations SLEC", value: 45.6, unit: "Mds FCFA", trend: "+12.3%", category: "Commerce" },
    { name: "Part exportations SLE", value: 34.2, unit: "%", trend: "+3.1%", category: "Commerce" }
  ],
  "2024": [
    { name: "Résilience climatique", value: 70.8, unit: "%", trend: "+3.3%", category: "CILSS" },
    { name: "Développement Capital Humain", value: 0.71, unit: "indice", trend: "+0.03", category: "Social" },
    { name: "Entreprises SLEC agréées", value: 268, unit: "entreprises", trend: "+23", category: "Commerce" },
    { name: "Produits SLEC agréés", value: 1978, unit: "produits", trend: "+144", category: "Commerce" },
    { name: "Exportations SLEC", value: 51.2, unit: "Mds FCFA", trend: "+13.5%", category: "Commerce" },
    { name: "Part exportations SLE", value: 37.6, unit: "%", trend: "+3.4%", category: "Commerce" }
  ]
};

const initialDiasporaIndicators: Record<string, Indicator[]> = {
  "2020": [
    { name: "Sensibilisés immigration clandestine", value: 8920, unit: "personnes", trend: "+1450", category: "Sensibilisation" },
    { name: "Sensibilisés insertion CI", value: 7120, unit: "personnes", trend: "+980", category: "Sensibilisation" },
    { name: "Ivoiriens réinsérés", value: 2780, unit: "personnes", trend: "+290", category: "Réinsertion" },
    { name: "Intégrés Fonction Publique", value: 389, unit: "personnes", trend: "+45", category: "Emploi" },
    { name: "Transferts d'argent / PIB", value: 6.8, unit: "%", trend: "+0.4%", category: "Économie" },
    { name: "Enregistrés CNPS", value: 6340, unit: "personnes", trend: "+720", category: "Social" },
    { name: "Ivoiriens assistés", value: 3120, unit: "personnes", trend: "+380", category: "Assistance" }
  ],
  "2021": [
    { name: "Sensibilisés immigration clandestine", value: 10230, unit: "personnes", trend: "+1310", category: "Sensibilisation" },
    { name: "Sensibilisés insertion CI", value: 8340, unit: "personnes", trend: "+1220", category: "Sensibilisation" },
    { name: "Ivoiriens réinsérés", value: 3210, unit: "personnes", trend: "+430", category: "Réinsertion" },
    { name: "Intégrés Fonction Publique", value: 456, unit: "personnes", trend: "+67", category: "Emploi" },
    { name: "Transferts d'argent / PIB", value: 7.4, unit: "%", trend: "+0.6%", category: "Économie" },
    { name: "Enregistrés CNPS", value: 7450, unit: "personnes", trend: "+1110", category: "Social" },
    { name: "Ivoiriens assistés", value: 3680, unit: "personnes", trend: "+560", category: "Assistance" }
  ],
  "2022": [
    { name: "Sensibilisés immigration clandestine", value: 11340, unit: "personnes", trend: "+1110", category: "Sensibilisation" },
    { name: "Sensibilisés insertion CI", value: 9010, unit: "personnes", trend: "+670", category: "Sensibilisation" },
    { name: "Ivoiriens réinsérés", value: 3520, unit: "personnes", trend: "+310", category: "Réinsertion" },
    { name: "Intégrés Fonction Publique", value: 512, unit: "personnes", trend: "+56", category: "Emploi" },
    { name: "Transferts d'argent / PIB", value: 7.9, unit: "%", trend: "+0.5%", category: "Économie" },
    { name: "Enregistrés CNPS", value: 8120, unit: "personnes", trend: "+670", category: "Social" },
    { name: "Ivoiriens assistés", value: 4050, unit: "personnes", trend: "+370", category: "Assistance" }
  ],
  "2023": [
    { name: "Sensibilisés immigration clandestine", value: 12450, unit: "personnes", trend: "+1110", category: "Sensibilisation" },
    { name: "Sensibilisés insertion CI", value: 9870, unit: "personnes", trend: "+860", category: "Sensibilisation" },
    { name: "Ivoiriens réinsérés", value: 3890, unit: "personnes", trend: "+370", category: "Réinsertion" },
    { name: "Intégrés Fonction Publique", value: 567, unit: "personnes", trend: "+55", category: "Emploi" },
    { name: "Transferts d'argent / PIB", value: 8.4, unit: "%", trend: "+0.5%", category: "Économie" },
    { name: "Enregistrés CNPS", value: 8920, unit: "personnes", trend: "+800", category: "Social" },
    { name: "Ivoiriens assistés", value: 4560, unit: "personnes", trend: "+510", category: "Assistance" }
  ],
  "2024": [
    { name: "Sensibilisés immigration clandestine", value: 13780, unit: "personnes", trend: "+1330", category: "Sensibilisation" },
    { name: "Sensibilisés insertion CI", value: 10890, unit: "personnes", trend: "+1020", category: "Sensibilisation" },
    { name: "Ivoiriens réinsérés", value: 4320, unit: "personnes", trend: "+430", category: "Réinsertion" },
    { name: "Intégrés Fonction Publique", value: 634, unit: "personnes", trend: "+67", category: "Emploi" },
    { name: "Transferts d'argent / PIB", value: 9.1, unit: "%", trend: "+0.7%", category: "Économie" },
    { name: "Enregistrés CNPS", value: 9870, unit: "personnes", trend: "+950", category: "Social" },
    { name: "Ivoiriens assistés", value: 5120, unit: "personnes", trend: "+560", category: "Assistance" }
  ]
};

const initialCirculationIndicators: Record<string, Indicator[]> = {
  "2020": [
    { name: "Ressortissants africains en CI", value: 25.3, unit: "% population", trend: "+0.8%", category: "Population" },
    { name: "Trafic ferroviaire UEMOA", value: 118000, unit: "voyageurs", trend: "+5200", category: "Transport" },
    { name: "Voyageurs aériens UEMOA", value: 276000, unit: "voyageurs", trend: "+12800", category: "Transport" },
    { name: "Voyageurs aériens CEDEAO", value: 467000, unit: "voyageurs", trend: "+28900", category: "Transport" },
    { name: "Trafic routier UEMOA", value: 1890000, unit: "voyageurs", trend: "+98000", category: "Transport" },
    { name: "Trafic routier CEDEAO", value: 2780000, unit: "voyageurs", trend: "+145000", category: "Transport" }
  ],
  "2021": [
    { name: "Ressortissants africains en CI", value: 26.4, unit: "% population", trend: "+1.1%", category: "Population" },
    { name: "Trafic ferroviaire UEMOA", value: 128000, unit: "voyageurs", trend: "+10000", category: "Transport" },
    { name: "Voyageurs aériens UEMOA", value: 298000, unit: "voyageurs", trend: "+22000", category: "Transport" },
    { name: "Voyageurs aériens CEDEAO", value: 512000, unit: "voyageurs", trend: "+45000", category: "Transport" },
    { name: "Trafic routier UEMOA", value: 2070000, unit: "voyageurs", trend: "+180000", category: "Transport" },
    { name: "Trafic routier CEDEAO", value: 3020000, unit: "voyageurs", trend: "+240000", category: "Transport" }
  ],
  "2022": [
    { name: "Ressortissants africains en CI", value: 27.2, unit: "% population", trend: "+0.8%", category: "Population" },
    { name: "Trafic ferroviaire UEMOA", value: 135000, unit: "voyageurs", trend: "+7000", category: "Transport" },
    { name: "Voyageurs aériens UEMOA", value: 318000, unit: "voyageurs", trend: "+20000", category: "Transport" },
    { name: "Voyageurs aériens CEDEAO", value: 548000, unit: "voyageurs", trend: "+36000", category: "Transport" },
    { name: "Trafic routier UEMOA", value: 2190000, unit: "voyageurs", trend: "+120000", category: "Transport" },
    { name: "Trafic routier CEDEAO", value: 3210000, unit: "voyageurs", trend: "+190000", category: "Transport" }
  ],
  "2023": [
    { name: "Ressortissants africains en CI", value: 28.5, unit: "% population", trend: "+1.3%", category: "Population" },
    { name: "Trafic ferroviaire UEMOA", value: 145000, unit: "voyageurs", trend: "+10000", category: "Transport" },
    { name: "Voyageurs aériens UEMOA", value: 342000, unit: "voyageurs", trend: "+24000", category: "Transport" },
    { name: "Voyageurs aériens CEDEAO", value: 589000, unit: "voyageurs", trend: "+41000", category: "Transport" },
    { name: "Trafic routier UEMOA", value: 2340000, unit: "voyageurs", trend: "+150000", category: "Transport" },
    { name: "Trafic routier CEDEAO", value: 3450000, unit: "voyageurs", trend: "+240000", category: "Transport" }
  ],
  "2024": [
    { name: "Ressortissants africains en CI", value: 29.7, unit: "% population", trend: "+1.2%", category: "Population" },
    { name: "Trafic ferroviaire UEMOA", value: 156000, unit: "voyageurs", trend: "+11000", category: "Transport" },
    { name: "Voyageurs aériens UEMOA", value: 368000, unit: "voyageurs", trend: "+26000", category: "Transport" },
    { name: "Voyageurs aériens CEDEAO", value: 634000, unit: "voyageurs", trend: "+45000", category: "Transport" },
    { name: "Trafic routier UEMOA", value: 2520000, unit: "voyageurs", trend: "+180000", category: "Transport" },
    { name: "Trafic routier CEDEAO", value: 3720000, unit: "voyageurs", trend: "+270000", category: "Transport" }
  ]
};

const initialSlecDetails: Record<string, SlecDetails> = {
  "2020": { entreprisesAgreees: 189, entreprisesActives: 146, tauxActivite: 77.2, produitsAgrees: 1456, volumeExports: 32.4, partSleIntraRegional: 26.8 },
  "2021": { entreprisesAgreees: 207, entreprisesActives: 160, tauxActivite: 77.3, produitsAgrees: 1589, volumeExports: 37.8, partSleIntraRegional: 29.3 },
  "2022": { entreprisesAgreees: 227, entreprisesActives: 175, tauxActivite: 77.1, produitsAgrees: 1707, volumeExports: 41.3, partSleIntraRegional: 31.1 },
  "2023": { entreprisesAgreees: 245, entreprisesActives: 189, tauxActivite: 77.1, produitsAgrees: 1834, volumeExports: 45.6, partSleIntraRegional: 34.2 },
  "2024": { entreprisesAgreees: 268, entreprisesActives: 207, tauxActivite: 77.2, produitsAgrees: 1978, volumeExports: 51.2, partSleIntraRegional: 37.6 }
};

const initialPartners: Partner[] = [
  { id: "1", nom: "Direction des Bases de Données Économiques et Sociales", sigle: "DBDES", type: "National", url: "https://www.dgbf.ci/", statut: "Actif" },
  { id: "2", nom: "Direction Générale du Commerce Extérieur", sigle: "DGCE", type: "National", url: "https://www.gucecotedivoire.ci/", statut: "Actif" },
  { id: "3", nom: "Direction Générale des Douanes", sigle: "DGD", type: "National", url: "https://www.douanes.ci/", statut: "Actif" },
  { id: "4", nom: "Caisse Nationale de Prévoyance Sociale", sigle: "CNPS", type: "National", url: "https://www.cnps.ci/", statut: "Actif" },
  { id: "5", nom: "Communauté Économique des États de l'Afrique de l'Ouest", sigle: "CEDEAO", type: "Régional", url: "https://www.ecowas.int/?lang=fr", statut: "Actif" },
  { id: "6", nom: "Union Économique et Monétaire Ouest-Africaine", sigle: "UEMOA", type: "Régional", url: "https://uemoa.switch-maker.net/", statut: "Actif" },
  { id: "7", nom: "Banque Africaine de Développement", sigle: "BAD", type: "International", url: "https://www.afdb.org/fr", statut: "Actif" },
  { id: "8", nom: "Organisation Internationale pour les Migrations", sigle: "OIM", type: "International", url: "https://rodakar.iom.int/fr/cote-divoire", statut: "Actif" },
  { id: "9", nom: "Agence belge de développement", sigle: "ENABEL", type: "International", url: "https://www.enabel.be/fr/", statut: "Actif" },
  { id: "10", nom: "Expertise France", sigle: "EXPERTISE FRANCE", type: "International", url: "https://www.expertisefrance.fr/fr", statut: "Actif" },
  { id: "11", nom: "Office Français de l'Immigration et de l'Intégration", sigle: "OFII", type: "International", url: "https://www.ofii.fr/", statut: "Actif" }
];

const initialPiliers: PilierStrategique[] = [
  { id: "1", titre: "Intégration Africaine", description: "Suivi des politiques d'intégration régionale CEDEAO/UEMOA", icone: "Globe2" },
  { id: "2", titre: "Ivoiriens de l'Extérieur", description: "Gestion et accompagnement de la diaspora", icone: "Users" },
  { id: "3", titre: "Indicateurs Macro", description: "Données macro-économiques et statistiques", icone: "TrendingUp" }
];

const initialPoidsRegionaux: PoidsRegional[] = [
  { id: "1", nom: "PIB Afrique", valeur: 3.8, unite: "%" },
  { id: "2", nom: "PIB CEDEAO", valeur: 35.2, unite: "%" },
  { id: "3", nom: "PIB UEMOA", valeur: 38.7, unite: "%" },
  { id: "4", nom: "Exports Afrique", valeur: 4.2, unite: "%" },
  { id: "5", nom: "Exports CEDEAO", valeur: 38.5, unite: "%" },
  { id: "6", nom: "Imports Afrique", valeur: 3.9, unite: "%" },
  { id: "7", nom: "Imports CEDEAO", valeur: 36.8, unite: "%" }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [integrationIndicatorsByYear, setIntegrationIndicatorsByYear] = useState(initialIntegrationIndicators);
  const [diasporaIndicatorsByYear, setDiasporaIndicatorsByYear] = useState(initialDiasporaIndicators);
  const [circulationIndicatorsByYear, setCirculationIndicatorsByYear] = useState(initialCirculationIndicators);
  const [slecDetailsByYear, setSlecDetailsByYear] = useState(initialSlecDetails);
  const [partners, setPartners] = useState(initialPartners);
  const [integrationContentSections, setIntegrationContentSections] = useState<ContentSection[]>([]);
  const [diasporaContentSections, setDiasporaContentSections] = useState<ContentSection[]>([]);
  const [piliers, setPiliers] = useState(initialPiliers);
  const [poidsRegionaux, setPoidsRegionaux] = useState(initialPoidsRegionaux);
  const [availableYears, setAvailableYears] = useState(["2024", "2023", "2022", "2021", "2020"]);

  // Actions
  const updateIntegrationIndicators = (year: string, indicators: Indicator[]) => {
    setIntegrationIndicatorsByYear(prev => ({ ...prev, [year]: indicators }));
  };

  const updateDiasporaIndicators = (year: string, indicators: Indicator[]) => {
    setDiasporaIndicatorsByYear(prev => ({ ...prev, [year]: indicators }));
  };

  const updateCirculationIndicators = (year: string, indicators: Indicator[]) => {
    setCirculationIndicatorsByYear(prev => ({ ...prev, [year]: indicators }));
  };

  const updateSlecDetails = (year: string, details: SlecDetails) => {
    setSlecDetailsByYear(prev => ({ ...prev, [year]: details }));
  };

  const updatePartners = (newPartners: Partner[]) => {
    setPartners(newPartners);
  };

  const addPartner = (partner: Partner) => {
    setPartners(prev => [...prev, partner]);
  };

  const removePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const updateIntegrationContent = (sections: ContentSection[]) => {
    setIntegrationContentSections(sections);
  };

  const updateDiasporaContent = (sections: ContentSection[]) => {
    setDiasporaContentSections(sections);
  };

  const updatePiliers = (newPiliers: PilierStrategique[]) => {
    setPiliers(newPiliers);
  };

  const updatePoidsRegionaux = (poids: PoidsRegional[]) => {
    setPoidsRegionaux(poids);
  };

  const addYear = (year: string) => {
    if (!availableYears.includes(year)) {
      setAvailableYears(prev => [...prev, year].sort().reverse());
    }
  };

  const removeYear = (year: string) => {
    setAvailableYears(prev => prev.filter(y => y !== year));
  };

  const value: DataContextType = {
    integrationIndicatorsByYear,
    diasporaIndicatorsByYear,
    circulationIndicatorsByYear,
    slecDetailsByYear,
    partners,
    integrationContentSections,
    diasporaContentSections,
    piliers,
    poidsRegionaux,
    availableYears,
    updateIntegrationIndicators,
    updateDiasporaIndicators,
    updateCirculationIndicators,
    updateSlecDetails,
    updatePartners,
    addPartner,
    removePartner,
    updateIntegrationContent,
    updateDiasporaContent,
    updatePiliers,
    updatePoidsRegionaux,
    addYear,
    removeYear
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
