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
      "Direction Action Sociale",
      "Direction Générale de l'Intégration Africaine (DGIA)"
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
      "ONECI",
      "INS (Institut National de la Statistique)"
    ]
  },
  {
    category: "Institutions Internationales",
    structures: [
      "CEDEAO",
      "Union Africaine (UA)",
      "Banque Africaine de Développement",
      "Organisation Internationale Migration",
      "Office Français de l'Immigration",
      "AVSI",
      "UNTRADE"
    ]
  }
];

export const performanceIndicators = {
  administration: [
    {
      objectif: "Promouvoir une administration moderne et performante",
      indicateurs: [
        {
          nom: "Taux de réalisation des activités planifiées",
          reference: "68%",
          cible2022: "69%",
          cible2023: "70%",
          cible2024: "72%"
        },
        {
          nom: "Taux de digitalisation des services du Ministère",
          reference: "20%",
          cible2022: "25%",
          cible2023: "28%",
          cible2024: "32%"
        },
        {
          nom: "Nombre de partenaires mobilisés",
          reference: "5",
          cible2022: "5",
          cible2023: "6",
          cible2024: "7"
        },
        {
          nom: "Taux de participation aux réunions régionales",
          reference: "33%",
          cible2022: "40%",
          cible2023: "45%",
          cible2024: "50%"
        }
      ]
    },
    {
      objectif: "Système performant de planification et suivi-évaluation",
      indicateurs: [
        {
          nom: "Proportion des Directions avec plans d'actions",
          reference: "26%",
          cible2022: "30%",
          cible2023: "35%",
          cible2024: "40%"
        },
        {
          nom: "Proportion des services rédigeant des rapports trimestriels",
          reference: "13%",
          cible2022: "20%",
          cible2023: "25%",
          cible2024: "30%"
        },
        {
          nom: "Taux d'exécution des dépenses en biens et services",
          reference: "89%",
          cible2022: "90%",
          cible2023: "95%",
          cible2024: "95%"
        }
      ]
    }
  ],
  integrationAfricaine: [
    {
      objectif: "Promouvoir une meilleure intégration africaine",
      indicateurs: [
        {
          nom: "Indice d'intégration Régionale en Afrique (IIRA)",
          reference: "0.55",
          cible2022: "0.6",
          cible2023: "0.64",
          cible2024: "0.67"
        }
      ]
    },
    {
      objectif: "Renforcer le rôle de la CI en matière d'intégration",
      indicateurs: [
        {
          nom: "Taux de pénétration des produits ivoiriens sur marchés africains",
          reference: "3%",
          cible2022: "3.5%",
          cible2023: "4.2%",
          cible2024: "5%"
        },
        {
          nom: "Nombre d'entreprises ivoiriennes assistées sur marchés africains",
          reference: "5",
          cible2022: "8",
          cible2023: "12",
          cible2024: "15"
        }
      ]
    },
    {
      objectif: "Contribution de l'intégration au développement économique",
      indicateurs: [
        {
          nom: "Nombre d'agréments d'entreprises au SLE CEDEAO",
          reference: "20",
          cible2022: "25",
          cible2023: "30",
          cible2024: "35"
        },
        {
          nom: "Taux de mise en œuvre de la stratégie APE intérimaires",
          reference: "45%",
          cible2022: "55%",
          cible2023: "65%",
          cible2024: "75%"
        }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: 1,
    titre: "Administration Générale",
    dateDebut: "2021-01-10",
    dateFin: "2021-12-31",
    leader: "Service Planification",
    niveau: 51,
    statut: "En cours"
  },
  {
    id: 2,
    titre: "Intégration Régionale",
    dateDebut: "2021-01-10",
    dateFin: "2021-12-28",
    leader: "DGIA",
    niveau: 78,
    statut: "En cours"
  },
  {
    id: 3,
    titre: "Mobilisation de la Diaspora",
    dateDebut: "2021-02-01",
    dateFin: "2021-11-30",
    leader: "Direction Mobilisation Compétences",
    niveau: 62,
    statut: "En cours"
  }
];
