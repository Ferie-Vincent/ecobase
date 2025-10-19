// Mock data for ECOBASE dashboard

export const dashboardStats = {
  integration: {
    slecEnterprises: 245,
    slecProducts: 1834,
    exportVolume: 45600, // millions FCFA
    activeEnterprises: 189
  },
  diaspora: {
    sensibilized: 12450,
    reinserted: 3890,
    publicFunction: 567,
    transfertsGDP: 8.4, // percentage
    cnpsRegistered: 8920,
    assisted: 4560
  },
  circulation: {
    africanPopulation: 28.5, // percentage
    railwayUEMOA: 145000,
    airUEMOA: 342000,
    airCEDEAO: 589000,
    roadUEMOA: 2340000,
    roadCEDEAO: 3450000
  }
};

export const integrationIndicators = [
  {
    name: "Résilience climatique",
    value: 67.5,
    unit: "%",
    trend: "+5.2%",
    category: "CILSS"
  },
  {
    name: "Développement Capital Humain",
    value: 0.68,
    unit: "indice",
    trend: "+0.04",
    category: "Social"
  },
  {
    name: "Entreprises SLEC agréées",
    value: 245,
    unit: "entreprises",
    trend: "+18",
    category: "Commerce"
  },
  {
    name: "Produits SLEC agréés",
    value: 1834,
    unit: "produits",
    trend: "+127",
    category: "Commerce"
  },
  {
    name: "Exportations SLEC",
    value: 45.6,
    unit: "Mds FCFA",
    trend: "+12.3%",
    category: "Commerce"
  },
  {
    name: "Part exportations SLE",
    value: 34.2,
    unit: "%",
    trend: "+3.1%",
    category: "Commerce"
  }
];

export const diasporaIndicators = [
  {
    name: "Sensibilisés immigration clandestine",
    value: 12450,
    unit: "personnes",
    trend: "+2340",
    category: "Sensibilisation"
  },
  {
    name: "Sensibilisés insertion CI",
    value: 9870,
    unit: "personnes",
    trend: "+1890",
    category: "Sensibilisation"
  },
  {
    name: "Ivoiriens réinsérés",
    value: 3890,
    unit: "personnes",
    trend: "+456",
    category: "Réinsertion"
  },
  {
    name: "Intégrés Fonction Publique",
    value: 567,
    unit: "personnes",
    trend: "+89",
    category: "Emploi"
  },
  {
    name: "Transferts d'argent / PIB",
    value: 8.4,
    unit: "%",
    trend: "+0.6%",
    category: "Économie"
  },
  {
    name: "Enregistrés CNPS",
    value: 8920,
    unit: "personnes",
    trend: "+1240",
    category: "Social"
  },
  {
    name: "Ivoiriens assistés",
    value: 4560,
    unit: "personnes",
    trend: "+678",
    category: "Assistance"
  }
];

export const circulationIndicators = [
  {
    name: "Ressortissants africains en CI",
    value: 28.5,
    unit: "% population",
    trend: "+1.2%",
    category: "Population"
  },
  {
    name: "Trafic ferroviaire UEMOA",
    value: 145000,
    unit: "voyageurs",
    trend: "+8900",
    category: "Transport"
  },
  {
    name: "Voyageurs aériens UEMOA",
    value: 342000,
    unit: "voyageurs",
    trend: "+23400",
    category: "Transport"
  },
  {
    name: "Voyageurs aériens CEDEAO",
    value: 589000,
    unit: "voyageurs",
    trend: "+45600",
    category: "Transport"
  },
  {
    name: "Trafic routier UEMOA",
    value: 2340000,
    unit: "voyageurs",
    trend: "+156000",
    category: "Transport"
  },
  {
    name: "Trafic routier CEDEAO",
    value: 3450000,
    unit: "voyageurs",
    trend: "+234000",
    category: "Transport"
  }
];

export const studentsData = [
  { region: "UEMOA", total: 45600, economie: 12300, droit: 15400, culture: 8900, autres: 9000 },
  { region: "CEDEAO", total: 67800, economie: 18900, droit: 22400, culture: 12300, autres: 14200 },
  { region: "UFM", total: 8900, economie: 2300, droit: 3400, culture: 1800, autres: 1400 }
];

export const tradeEvolution = [
  { year: "2020", exports: 28.4, imports: 31.2, intraAfrica: 15.2 },
  { year: "2021", exports: 32.1, imports: 34.8, intraAfrica: 17.8 },
  { year: "2022", exports: 38.5, imports: 39.2, intraAfrica: 21.4 },
  { year: "2023", exports: 42.3, imports: 41.6, intraAfrica: 24.7 },
  { year: "2024", exports: 48.9, imports: 45.3, intraAfrica: 28.3 },
  { year: "2025", exports: 52.4, imports: 48.7, intraAfrica: 31.6 }
];

export const regionalWeights = {
  pibAfrica: 3.8, // %
  pibCEDEAO: 35.2, // %
  pibUEMOA: 38.7, // %
  exportsAfrica: 4.2, // %
  exportsCEDEAO: 38.5, // %
  importsAfrica: 3.9, // %
  importsCEDEAO: 36.8, // %
};

export const structuresData = [
  {
    category: "Directions Ministère",
    structures: [
      "Service Planification et Suivi-évaluation",
      "Direction Politiques Communautaires Promotion Humaine",
      "Direction Politiques Commerce et Libre Circulation",
      "Direction Accueil, Orientation et Suivi Réinsertion",
      "Direction Mobilisation Compétences et Ressources",
      "Direction Action Sociale"
    ]
  },
  {
    category: "Structures Nationales",
    structures: [
      "Direction Bases Données Économiques (DBDES)",
      "Direction Affaires Économiques Régionales (DAFER)",
      "Agence Nationale Statistiques (ANSTAT)",
      "Direction Générale des Douanes",
      "Direction Commerce Extérieur",
      "CNPS",
      "ONECI"
    ]
  },
  {
    category: "Institutions Internationales",
    structures: [
      "CEDEAO",
      "Banque Africaine de Développement",
      "Organisation Internationale Migration",
      "Office Français de l'Immigration",
      "AVSI"
    ]
  }
];
