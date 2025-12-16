// Detailed indicators catalog for ECOBASE

export interface Indicator {
  id: string;
  name: string;
  pillar: string;
  topic: string;
  unit: string;
  frequency: string;
  method: string;
  disaggregation: string[];
  data_source: string[];
  data_steward: string;
  quality?: {
    dq_checks?: string[];
    status?: string;
  };
  related_to: string[];
}

export const indicators: Indicator[] = [
  // Intégration régionale - Développement durable
  {
    id: "resilience_climatique_population_part",
    name: "Proportion de la population à résilience climatique améliorée",
    pillar: "INT",
    topic: "Développement durable",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "Mesure standard CILSS; population bénéficiaire / population totale * 100",
    disaggregation: ["geo_region", "year", "sex"],
    data_source: ["CILSS", "ANSTAT"],
    data_steward: "SPSE",
    quality: { dq_checks: ["cohérence temporelle", "valeurs hors bornes"], status: "provisoire" },
    related_to: []
  },
  {
    id: "prix_denrees_cedeao_evolution",
    name: "Évolution des denrées alimentaires (marché CEDEAO)",
    pillar: "INT",
    topic: "Sécurité alimentaire",
    unit: "indice (base 100)",
    frequency: "mensuelle",
    method: "Indice agrégé prix de détail/gros, base=année N",
    disaggregation: ["geo_region", "year"],
    data_source: ["CEDEAO", "DAFER", "ANSTAT"],
    data_steward: "SPSE",
    related_to: []
  },
  {
    id: "indice_capital_humain",
    name: "Indice de Développement du Capital Humain",
    pillar: "INT",
    topic: "Capital humain",
    unit: "indice (0-1)",
    frequency: "annuelle",
    method: "Méthodologie BAD/instances internationales",
    disaggregation: ["year", "geo_region"],
    data_source: ["BAD", "ANSTAT"],
    data_steward: "SPSE",
    related_to: []
  },
  {
    id: "indice_cooperation_tech_climat",
    name: "Indice de coopération technique bilatérale (climat/désertification/sécheresse)",
    pillar: "INT",
    topic: "Coopération",
    unit: "indice (0-100)",
    frequency: "annuelle",
    method: "Score composite (accords, projets, échanges) normalisé 0-100",
    disaggregation: ["year", "geo_region"],
    data_source: ["UA", "Min Environnement", "CEDEAO"],
    data_steward: "SPSE",
    related_to: ["resilience_climatique_population_part"]
  },

  // Commerce intrarégional (SLEC)
  {
    id: "slec_agrements_entreprises_nb",
    name: "Nombre d'agréments SLEC délivrés aux entreprises",
    pillar: "INT",
    topic: "Commerce intrarégional (SLEC)",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage administratif des agréments délivrés",
    disaggregation: ["year"],
    data_source: ["DGCE", "CEDEAO"],
    data_steward: "DGCE",
    related_to: ["slec_produits_agrees_nb", "slec_exportations_valeur", "slec_entreprises_commercent_nb", "slec_part_exportations_intra"]
  },
  {
    id: "slec_produits_agrees_nb",
    name: "Nombre de produits agréés SLEC",
    pillar: "INT",
    topic: "Commerce intrarégional (SLEC)",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage produits listés en agrément",
    disaggregation: ["year"],
    data_source: ["DGCE", "CEDEAO"],
    data_steward: "DGCE",
    related_to: ["slec_agrements_entreprises_nb"]
  },
  {
    id: "slec_exportations_valeur",
    name: "Valeur des exportations (entreprises agréées SLEC)",
    pillar: "INT",
    topic: "Commerce intrarégional (SLEC)",
    unit: "FCFA",
    frequency: "trimestrielle",
    method: "Somme valeurs douanières déclarées",
    disaggregation: ["year", "geo_region"],
    data_source: ["DGCE", "DOUANES"],
    data_steward: "DGCE",
    related_to: ["slec_agrements_entreprises_nb", "slec_part_exportations_intra"]
  },
  {
    id: "slec_entreprises_commercent_nb",
    name: "Nombre d'entreprises agréées commerçant effectivement (SLEC)",
    pillar: "INT",
    topic: "Commerce intrarégional (SLEC)",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage entreprises ayant réalisé au moins 1 exportation SLEC",
    disaggregation: ["year"],
    data_source: ["DGCE", "CEDEAO"],
    data_steward: "DGCE",
    related_to: ["slec_exportations_valeur"]
  },
  {
    id: "slec_part_exportations_intra",
    name: "Part des exportations sous SLEC dans les exportations intrarégionales",
    pillar: "INT",
    topic: "Commerce intrarégional (SLEC)",
    unit: "pourcentage",
    frequency: "trimestrielle",
    method: "100 * (Exportations SLEC) / (Exportations totales intra-CEDEAO)",
    disaggregation: ["year"],
    data_source: ["DGCE", "CEDEAO", "ANSTAT"],
    data_steward: "SPSE",
    related_to: ["slec_exportations_valeur"]
  },

  // Ivoiriens de l'Extérieur
  {
    id: "sensibilises_immigration_clandestine_nb",
    name: "Personnes sensibilisées aux dangers de l'immigration clandestine",
    pillar: "DIA",
    topic: "Sensibilisation",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage participants (listes de présence/rapports)",
    disaggregation: ["year", "sex", "geo_region"],
    data_source: ["DGIE", "OIM", "AVSI", "OFII"],
    data_steward: "DGIE",
    related_to: []
  },
  {
    id: "sensibilises_insertion_ci_nb",
    name: "Personnes sensibilisées aux mesures d'insertion en Côte d'Ivoire",
    pillar: "DIA",
    topic: "Insertion",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage participants (programmes DAOSAR/OIM)",
    disaggregation: ["year", "sex"],
    data_source: ["DGIE", "DAOSAR", "OIM"],
    data_steward: "DGIE",
    related_to: []
  },
  {
    id: "retours_reinseres_nb",
    name: "Ivoiriens de retour réinsérés",
    pillar: "DIA",
    topic: "Réinsertion",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage dossiers clos avec statut réinsertion effective",
    disaggregation: ["year", "sex", "geo_region"],
    data_source: ["DGIE", "DAOSAR", "OIM"],
    data_steward: "DGIE",
    related_to: ["sensibilises_insertion_ci_nb"]
  },
  {
    id: "fonction_publique_integres_nb",
    name: "Ivoiriens de l'extérieur intégrés dans la Fonction Publique",
    pillar: "DIA",
    topic: "Emploi public",
    unit: "nombre",
    frequency: "annuelle",
    method: "Comptage nominations/concours (statuts confirmés)",
    disaggregation: ["year"],
    data_source: ["Min_Fonction_Publique"],
    data_steward: "SPSE",
    related_to: []
  },
  {
    id: "transferts_diaspora_part_pib",
    name: "Part des transferts d'argent des Ivoiriens de l'extérieur dans le PIB",
    pillar: "DIA",
    topic: "Transferts",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (Transferts entrants) / (PIB courant)",
    disaggregation: ["year"],
    data_source: ["BCEAO", "BAD", "DGIE"],
    data_steward: "SPSE",
    related_to: ["pib_poids_ci_afrique"]
  },
  {
    id: "cnps_ti_diaspora_nb",
    name: "Ivoiriens de l'extérieur inscrits au régime TI (CNPS)",
    pillar: "DIA",
    topic: "Protection sociale",
    unit: "nombre",
    frequency: "trimestrielle",
    method: "Comptage immatriculations actives TI hors territoire",
    disaggregation: ["year", "sex"],
    data_source: ["CNPS"],
    data_steward: "CNPS",
    related_to: []
  },
  {
    id: "diaspora_assistee_part",
    name: "Proportion des Ivoiriens de l'extérieur assistés",
    pillar: "DIA",
    topic: "Assistance",
    unit: "pourcentage",
    frequency: "trimestrielle",
    method: "100 * (Bénéficiaires aidés) / (Population ciblée recensée)",
    disaggregation: ["year", "geo_region"],
    data_source: ["DGIE", "OIM", "ONG"],
    data_steward: "DGIE",
    related_to: []
  },

  // Macro & Transversal
  {
    id: "poids_ci_echanges_ouest_afrique",
    name: "Poids de la Côte d'Ivoire dans les échanges de l'Afrique de l'Ouest et de l'Afrique",
    pillar: "MACRO",
    topic: "Commerce extérieur",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (CI échanges) / (Total région/continent)",
    disaggregation: ["year", "geo_region"],
    data_source: ["DOUANES", "DGCE", "ANSTAT"],
    data_steward: "SPSE",
    related_to: ["slec_part_exportations_intra"]
  },
  {
    id: "poids_ci_importations",
    name: "Poids de la CI dans les importations africaines",
    pillar: "MACRO",
    topic: "Commerce extérieur",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (CI importations) / (Importations Afrique)",
    disaggregation: ["year"],
    data_source: ["DGCE", "ANSTAT"],
    data_steward: "SPSE",
    related_to: []
  },
  {
    id: "poids_ci_exportations",
    name: "Poids de la CI dans les exportations africaines",
    pillar: "MACRO",
    topic: "Commerce extérieur",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (CI exportations) / (Exportations Afrique)",
    disaggregation: ["year"],
    data_source: ["DGCE", "ANSTAT"],
    data_steward: "SPSE",
    related_to: ["slec_exportations_valeur"]
  },
  {
    id: "pib_poids_ci_afrique",
    name: "Poids de la CI dans le PIB de l'Afrique et des organisations sous-régionales",
    pillar: "MACRO",
    topic: "PIB",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (PIB CI) / (PIB zone)",
    disaggregation: ["year", "geo_region"],
    data_source: ["BCEAO", "BAD", "ANSTAT"],
    data_steward: "SPSE",
    related_to: ["transferts_diaspora_part_pib"]
  },
  {
    id: "masse_monetaire_poids_ci",
    name: "Poids de la CI dans la masse monétaire (Afrique & sous-régions)",
    pillar: "MACRO",
    topic: "Monnaie",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (Masse monétaire CI) / (Masse monétaire zone)",
    disaggregation: ["year", "geo_region"],
    data_source: ["BCEAO", "BAD"],
    data_steward: "SPSE",
    related_to: []
  },

  // Libre circulation & Mobilité
  {
    id: "part_ressortissants_africains_population_ci",
    name: "Proportion de ressortissants africains dans la population ivoirienne",
    pillar: "INT",
    topic: "Libre circulation",
    unit: "pourcentage",
    frequency: "annuelle",
    method: "100 * (Ressortissants africains résidents) / (Population CI)",
    disaggregation: ["year"],
    data_source: ["ONECI", "DST", "ANSTAT"],
    data_steward: "SPSE",
    related_to: []
  },
  {
    id: "trafic_ferroviaire_uemoa_nb",
    name: "Trafic ferroviaire de personnes CI–UEMOA",
    pillar: "INT",
    topic: "Mobilité",
    unit: "voyageurs",
    frequency: "mensuelle",
    method: "Comptage billets validés / embarquements",
    disaggregation: ["year", "mode_transport"],
    data_source: ["SITARAIL", "MIN_TRANS"],
    data_steward: "MIN_TRANS",
    related_to: []
  },
  {
    id: "trafic_routier_cedeao_nb",
    name: "Trafic routier de personnes CI–CEDEAO",
    pillar: "INT",
    topic: "Mobilité",
    unit: "voyageurs",
    frequency: "mensuelle",
    method: "Comptage postes frontaliers / opérateurs transport",
    disaggregation: ["year", "mode_transport"],
    data_source: ["DGTTM", "MIN_TRANS", "DST"],
    data_steward: "MIN_TRANS",
    related_to: []
  },
  {
    id: "voyageurs_aeriens_uemoa_nb",
    name: "Nombre de voyageurs aériens CI–UEMOA",
    pillar: "INT",
    topic: "Mobilité",
    unit: "voyageurs",
    frequency: "mensuelle",
    method: "Comptage AERIA / PNR agrégé",
    disaggregation: ["year", "mode_transport"],
    data_source: ["AERIA", "MIN_TRANS"],
    data_steward: "MIN_TRANS",
    related_to: []
  },
  {
    id: "voyageurs_aeriens_cedeao_nb",
    name: "Nombre de voyageurs aériens CI–CEDEAO",
    pillar: "INT",
    topic: "Mobilité",
    unit: "voyageurs",
    frequency: "mensuelle",
    method: "Comptage AERIA / PNR agrégé",
    disaggregation: ["year", "mode_transport"],
    data_source: ["AERIA", "MIN_TRANS"],
    data_steward: "MIN_TRANS",
    related_to: []
  },
  {
    id: "voyageurs_aeriens_hors_cedeao_nb",
    name: "Nombre de voyageurs aériens CI–Hors CEDEAO",
    pillar: "INT",
    topic: "Mobilité",
    unit: "voyageurs",
    frequency: "mensuelle",
    method: "Comptage AERIA / PNR agrégé",
    disaggregation: ["year", "mode_transport"],
    data_source: ["AERIA", "MIN_TRANS"],
    data_steward: "MIN_TRANS",
    related_to: []
  },
  {
    id: "etudiants_uemoa_ci_nb",
    name: "Étudiants ressortissants UEMOA inscrits en CI",
    pillar: "INT",
    topic: "Éducation",
    unit: "nombre",
    frequency: "annuelle",
    method: "Comptage inscriptions validées",
    disaggregation: ["year", "education_field"],
    data_source: ["MESRS", "Direction des Bourses", "ANSTAT"],
    data_steward: "MESRS",
    related_to: []
  },
  {
    id: "etudiants_cedeao_ci_nb",
    name: "Étudiants ressortissants CEDEAO inscrits en CI",
    pillar: "INT",
    topic: "Éducation",
    unit: "nombre",
    frequency: "annuelle",
    method: "Comptage inscriptions validées",
    disaggregation: ["year", "education_field"],
    data_source: ["MESRS", "Direction des Bourses", "ANSTAT"],
    data_steward: "MESRS",
    related_to: []
  }
];

export const relationships = [
  { from: "slec_agrements_entreprises_nb", to: "slec_produits_agrees_nb", type: "conceptual_group" },
  { from: "slec_agrements_entreprises_nb", to: "slec_entreprises_commercent_nb", type: "leading_indicator" },
  { from: "slec_exportations_valeur", to: "slec_part_exportations_intra", type: "denominator_link" },
  { from: "transferts_diaspora_part_pib", to: "pib_poids_ci_afrique", type: "uses_denominator" },
  { from: "indice_cooperation_tech_climat", to: "resilience_climatique_population_part", type: "impact_pathway" },
  { from: "voyageurs_aeriens_cedeao_nb", to: "part_ressortissants_africains_population_ci", type: "correlative" },
  { from: "retours_reinseres_nb", to: "sensibilises_insertion_ci_nb", type: "program_chain" }
];
