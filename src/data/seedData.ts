// Données seed pour le backoffice ECOBASE
// Aucune persistance réelle, tout en mémoire

export const statuts = ["Brouillon", "En validation", "Validé SPSE", "Publié"] as const;
export type Statut = typeof statuts[number];

export const roles = ["SPSE_ADMIN", "DIRECTION", "POINT_FOCAL", "LECTEUR"] as const;
export type Role = typeof roles[number];

export interface Organisation {
  id: string;
  nom: string;
  sigle: string;
  type: "Régionale" | "Internationale" | "Nationale" | "Interne" | "PTF";
  siege?: string;
  statut: "Actif" | "Inactif";
  pays_membres_ids?: string[];
  representant_national?: string;
  date_adhesion?: string;
  site_web?: string;
  convention?: boolean;
  responsable?: string;
  contact?: string;
}

export interface Pays {
  code: string;
  nom: string;
}

export interface StructureInterne {
  id: string;
  nom: string;
  type: "service" | "générale" | "technique";
  point_focal: string;
  domaine: string;
}

export interface Programme {
  id: string;
  titre: string;
  description?: string;
  domaine: "Intégration" | "Ivoiriens Extérieur" | "Économie" | "Social";
  debut: string;
  fin: string;
  budget?: number;
  acteurs_ids?: string[];
  indicateurs_ids?: string[];
  statut: "Planifié" | "En cours" | "Clôturé";
}

export interface Indicateur {
  id: string;
  nom: string;
  type: "Intégration" | "Ivoiriens Extérieur" | "Économie" | "Social";
  unite: string;
  frequence: "Mensuelle" | "Trimestrielle" | "Annuelle";
  source: string;
  methode: "Saisie" | "API" | "Calcul";
  formule?: string;
  responsable_spse: string;
  description?: string;
  methodologie?: string;
}

export interface Relation {
  from_id: string;
  to_id: string;
  relation_type: "denominator_link" | "impact_pathway" | "correlative" | "program_chain";
}

export interface Donnee {
  id: string;
  indicateur_id: string;
  year?: number;
  month?: number;
  quarter?: number;
  geo_region?: string;
  value: number;
  unit: string;
  source_note: string;
  loaded_at: string;
  statut: Statut;
  auteur_id: string;
  commentaires?: string;
}

export interface Connecteur {
  id: string;
  nom: string;
  cible: string;
  etat: "ON" | "OFF";
  frequence: "Mensuelle" | "Trimestrielle" | "Annuelle";
  dernier_run?: string;
}

export interface RegleCalcul {
  id: string;
  nom: string;
  cible_indicateur_id: string;
  expression: string;
  etat: "ON" | "OFF";
}

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  structure_id: string;
  role: Role;
  statut: "Actif" | "Inactif";
  derniere_activite?: string;
}

// SEED DATA
export const organisations: Organisation[] = [
  {
    id: "ORG-CEDEAO",
    nom: "Communauté Économique des États de l'Afrique de l'Ouest",
    sigle: "CEDEAO",
    type: "Régionale",
    siege: "Abuja",
    statut: "Actif",
    pays_membres_ids: ["CI", "GH", "SN", "BF", "ML", "NE", "NG", "TG", "BJ", "GM", "GN", "LR", "SL", "CV", "GW"],
    representant_national: "Ambassadeur N'Guessan",
    date_adhesion: "1975-05-28",
    site_web: "https://www.ecowas.int",
    convention: true
  },
  {
    id: "ORG-UEMOA",
    nom: "Union Économique et Monétaire Ouest Africaine",
    sigle: "UEMOA",
    type: "Régionale",
    siege: "Ouagadougou",
    statut: "Actif",
    pays_membres_ids: ["CI", "BF", "BJ", "ML", "NE", "SN", "TG", "GW"],
    representant_national: "Dr. Kouadio",
    date_adhesion: "1994-01-10",
    site_web: "https://www.uemoa.int",
    convention: true
  },
  {
    id: "ORG-BAD",
    nom: "Banque Africaine de Développement",
    sigle: "BAD",
    type: "Internationale",
    siege: "Abidjan",
    statut: "Actif",
    site_web: "https://www.afdb.org",
    convention: true
  },
  {
    id: "ORG-OIM",
    nom: "Organisation Internationale pour les Migrations",
    sigle: "OIM",
    type: "Internationale",
    siege: "Genève",
    statut: "Actif",
    site_web: "https://www.iom.int",
    convention: true
  },
  {
    id: "ORG-ENABEL",
    nom: "Agence belge de développement",
    sigle: "ENABEL",
    type: "Internationale",
    siege: "Bruxelles",
    statut: "Actif",
    site_web: "https://www.enabel.be",
    convention: true
  },
  {
    id: "ORG-EF",
    nom: "Expertise France",
    sigle: "EXPERTISE FRANCE",
    type: "Internationale",
    siege: "Paris",
    statut: "Actif",
    site_web: "https://www.expertisefrance.fr",
    convention: true
  },
  {
    id: "ORG-OFII",
    nom: "Office Français de l'Immigration et de l'Intégration",
    sigle: "OFII",
    type: "Internationale",
    siege: "Paris",
    statut: "Actif",
    site_web: "https://www.ofii.fr",
    convention: true
  },
  {
    id: "ORG-DBDES",
    nom: "Direction du Budget et du Développement Économique et Social",
    sigle: "DBDES",
    type: "Nationale",
    statut: "Actif",
    responsable: "Direction DBDES",
    contact: "dbdes@finances.ci"
  },
  {
    id: "ORG-DGCE",
    nom: "Direction Générale du Commerce Extérieur",
    sigle: "DGCE",
    type: "Nationale",
    statut: "Actif",
    responsable: "DG Commerce",
    contact: "dgce@commerce.ci"
  },
  {
    id: "ORG-DOUANES",
    nom: "Direction Générale des Douanes",
    sigle: "DGD",
    type: "Nationale",
    statut: "Actif",
    responsable: "DG Douanes",
    contact: "dgd@douanes.ci"
  },
  {
    id: "ORG-CNPS",
    nom: "Caisse Nationale de Prévoyance Sociale",
    sigle: "CNPS",
    type: "Nationale",
    statut: "Actif",
    responsable: "DG CNPS",
    contact: "dg@cnps.ci"
  }
];

export const pays: Pays[] = [
  { code: "CI", nom: "Côte d'Ivoire" },
  { code: "GH", nom: "Ghana" },
  { code: "SN", nom: "Sénégal" },
  { code: "BF", nom: "Burkina Faso" },
  { code: "ML", nom: "Mali" },
  { code: "NE", nom: "Niger" },
  { code: "NG", nom: "Nigeria" },
  { code: "TG", nom: "Togo" },
  { code: "BJ", nom: "Bénin" },
  { code: "GM", nom: "Gambie" },
  { code: "GN", nom: "Guinée" },
  { code: "LR", nom: "Libéria" },
  { code: "SL", nom: "Sierra Leone" },
  { code: "CV", nom: "Cap-Vert" },
  { code: "GW", nom: "Guinée-Bissau" }
];

export const structures_internes: StructureInterne[] = [
  {
    id: "INT-SPSE",
    nom: "Service Planification & Suivi-Évaluation",
    type: "service",
    point_focal: "Admin SPSE",
    domaine: "Planification"
  },
  {
    id: "INT-DGPI",
    nom: "Direction Générale des Politiques d'Intégration",
    type: "générale",
    point_focal: "Direction DGPI",
    domaine: "Intégration"
  },
  {
    id: "INT-DGIE",
    nom: "Direction Générale des Ivoiriens de l'Extérieur",
    type: "générale",
    point_focal: "Direction DGIE",
    domaine: "Diaspora"
  }
];

export const programmes: Programme[] = [
  {
    id: "PRG-INT-2527",
    titre: "Intégration Économique Régionale 2025–2027",
    description: "Programme de renforcement de l'intégration économique dans l'espace CEDEAO/UEMOA",
    domaine: "Intégration",
    debut: "2025-01-01",
    fin: "2027-12-31",
    budget: 15000000000,
    statut: "En cours",
    acteurs_ids: ["ORG-CEDEAO", "ORG-UEMOA", "INT-SPSE", "INT-DGPI", "ORG-DGCE", "ORG-BAD"]
  },
  {
    id: "PRG-DIAS-2526",
    titre: "Gestion des Ivoiriens de l'Extérieur 2025–2026",
    description: "Programme d'appui aux Ivoiriens de l'extérieur et réinsertion des Ivoiriens de retour",
    domaine: "Ivoiriens Extérieur",
    debut: "2025-01-01",
    fin: "2026-12-31",
    budget: 8000000000,
    statut: "En cours",
    acteurs_ids: ["ORG-OIM", "INT-SPSE", "INT-DGIE", "ORG-CNPS"]
  }
];

export const indicateurs: Indicateur[] = [
  {
    id: "slec_agrements_entreprises_nb",
    nom: "Nombre d'agréments SLEC délivrés aux entreprises",
    type: "Intégration",
    unite: "Nombre",
    frequence: "Trimestrielle",
    source: "DGCE/CEDEAO",
    methode: "Saisie",
    responsable_spse: "INT-SPSE"
  },
  {
    id: "slec_exportations_valeur",
    nom: "Valeur des exportations SLEC",
    type: "Intégration",
    unite: "Milliards FCFA",
    frequence: "Annuelle",
    source: "DGCE/DOUANES",
    methode: "API",
    responsable_spse: "INT-SPSE"
  },
  {
    id: "slec_part_exportations_intra",
    nom: "Part des exportations sous SLEC",
    type: "Intégration",
    unite: "%",
    frequence: "Trimestrielle",
    source: "DGCE/CEDEAO",
    methode: "Calcul",
    formule: "(EXPORT_SLEC / EXPORT_INTRA) * 100",
    responsable_spse: "INT-SPSE"
  },
  {
    id: "transferts_diaspora_part_pib",
    nom: "Transferts diaspora / PIB",
    type: "Économie",
    unite: "%",
    frequence: "Annuelle",
    source: "BCEAO",
    methode: "Saisie",
    responsable_spse: "INT-SPSE"
  },
  {
    id: "retours_reinseres_nb",
    nom: "Ivoiriens de retour réinsérés",
    type: "Ivoiriens Extérieur",
    unite: "Nombre",
    frequence: "Trimestrielle",
    source: "DGIE/OIM",
    methode: "Calcul",
    responsable_spse: "INT-SPSE"
  },
  {
    id: "voyageurs_aeriens_cedeao_nb",
    nom: "Voyageurs aériens CI-CEDEAO",
    type: "Intégration",
    unite: "Nombre",
    frequence: "Trimestrielle",
    source: "AERIA/Transports",
    methode: "API",
    responsable_spse: "INT-SPSE"
  }
];

export const relations: Relation[] = [
  {
    from_id: "slec_exportations_valeur",
    to_id: "slec_part_exportations_intra",
    relation_type: "denominator_link"
  }
];

export const donnees: Donnee[] = [
  {
    id: "DATA-001",
    indicateur_id: "slec_exportations_valeur",
    year: 2020,
    geo_region: "CEDEAO",
    value: 30.2,
    unit: "Milliards FCFA",
    source_note: "seed",
    loaded_at: "2025-10-23T00:00:00Z",
    statut: "Publié",
    auteur_id: "USR-SPSE"
  },
  {
    id: "DATA-002",
    indicateur_id: "slec_exportations_valeur",
    year: 2025,
    geo_region: "CEDEAO",
    value: 52.4,
    unit: "Milliards FCFA",
    source_note: "seed",
    loaded_at: "2025-10-23T00:00:00Z",
    statut: "Publié",
    auteur_id: "USR-SPSE"
  },
  {
    id: "DATA-003",
    indicateur_id: "slec_part_exportations_intra",
    year: 2025,
    geo_region: "CEDEAO",
    value: 37.6,
    unit: "%",
    source_note: "seed",
    loaded_at: "2025-10-23T00:00:00Z",
    statut: "Validé SPSE",
    auteur_id: "USR-DGPI"
  },
  {
    id: "DATA-004",
    indicateur_id: "transferts_diaspora_part_pib",
    year: 2024,
    value: 9.1,
    unit: "%",
    source_note: "seed",
    loaded_at: "2025-10-23T00:00:00Z",
    statut: "Publié",
    auteur_id: "USR-SPSE"
  },
  {
    id: "DATA-005",
    indicateur_id: "retours_reinseres_nb",
    year: 2025,
    geo_region: "CI",
    value: 4320,
    unit: "Nombre",
    source_note: "seed",
    loaded_at: "2025-10-23T00:00:00Z",
    statut: "En validation",
    auteur_id: "USR-DGIE"
  }
];

export const connecteurs: Connecteur[] = [
  {
    id: "CONN-CEDEAO",
    nom: "CEDEAO API",
    cible: "slec_part_exportations_intra",
    etat: "ON",
    frequence: "Trimestrielle",
    dernier_run: "2025-04-15T06:00:00Z"
  },
  {
    id: "CONN-BCEAO",
    nom: "BCEAO API",
    cible: "transferts_diaspora_part_pib",
    etat: "OFF",
    frequence: "Annuelle"
  }
];

export const regles_calcul: RegleCalcul[] = [
  {
    id: "RULE-SLEC-PART",
    nom: "Part SLEC",
    cible_indicateur_id: "slec_part_exportations_intra",
    expression: "(EXPORT_SLEC / EXPORT_INTRA) * 100",
    etat: "ON"
  }
];

export const utilisateurs: Utilisateur[] = [
  {
    id: "USR-SPSE",
    nom: "Admin SPSE",
    email: "spse.admin@exemple.ci",
    structure_id: "INT-SPSE",
    role: "SPSE_ADMIN",
    statut: "Actif",
    derniere_activite: "2025-10-22T15:30:00Z"
  },
  {
    id: "USR-DGPI",
    nom: "Direction DGPI",
    email: "dir.dgpi@exemple.ci",
    structure_id: "INT-DGPI",
    role: "DIRECTION",
    statut: "Actif",
    derniere_activite: "2025-10-22T14:00:00Z"
  },
  {
    id: "USR-DGIE",
    nom: "Direction DGIE",
    email: "dir.dgie@exemple.ci",
    structure_id: "INT-DGIE",
    role: "DIRECTION",
    statut: "Actif",
    derniere_activite: "2025-10-22T16:45:00Z"
  },
  {
    id: "USR-LECT",
    nom: "Lecteur Interne",
    email: "lecteur@exemple.ci",
    structure_id: "INT-SPSE",
    role: "LECTEUR",
    statut: "Actif",
    derniere_activite: "2025-10-21T10:00:00Z"
  }
];
