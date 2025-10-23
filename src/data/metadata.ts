// Metadata for ECOBASE system

export const metadata = {
  version: "1.0",
  updated_at: "2025-10-23",
  owner_org: "SPSE / Ministère délégué (Intégration & Ivoiriens de l'Extérieur)",
  license: "CC-BY 4.0"
};

export const dimensions = [
  { id: "geo_region", label: "Région", values: ["CI", "UEMOA", "CEDEAO", "Afrique", "Hors_CEDEAO"] },
  { id: "year", label: "Année", values: [] },
  { id: "sex", label: "Sexe", values: ["H", "F", "Total"] },
  { id: "mode_transport", label: "Mode de transport", values: ["Air", "Route", "Rail"] },
  { id: "education_field", label: "Filière", values: ["Economie", "Droit", "Culture", "Autres"] }
];

export const organizations = [
  { id: "SPSE", name: "Service Planification & Suivi-Evaluation (SPSE)" },
  { id: "DGCE", name: "Direction Générale du Commerce Extérieur" },
  { id: "DOUANES", name: "Direction Générale des Douanes" },
  { id: "ANSTAT", name: "Agence Nationale de la Statistique" },
  { id: "BCEAO", name: "Banque Centrale des États de l'Afrique de l'Ouest" },
  { id: "BAD", name: "Banque Africaine de Développement" },
  { id: "CEDEAO", name: "Commission CEDEAO" },
  { id: "OIM", name: "Organisation Internationale pour les Migrations" },
  { id: "OFII", name: "Office Français de l'Immigration et de l'Intégration" },
  { id: "CNPS", name: "Caisse Nationale de Prévoyance Sociale" },
  { id: "ONECI", name: "Office National de l'État Civil et de l'Identification" },
  { id: "MESRS", name: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique" },
  { id: "MIN_TRANS", name: "Ministère des Transports (AERIA, DGTTM, SITARAIL)" },
  { id: "CILSS", name: "Comité permanent Inter-États de Lutte contre la Sécheresse (CILSS)" }
];

export const pillars = [
  { id: "INT", label: "Intégration régionale" },
  { id: "DIA", label: "Diaspora & Ivoiriens de l'extérieur" },
  { id: "MACRO", label: "Macroéconomie & Transversal" }
];
