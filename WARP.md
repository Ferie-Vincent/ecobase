# ECOBASE — Spécification Complète pour Reconstruction

## 1. PRÉSENTATION GÉNÉRALE

**ECOBASE** est une plateforme web de tableau de bord socio-économique pour le **Ministère Délégué chargé de l'Intégration Africaine et des Ivoiriens de l'Extérieur** de la Côte d'Ivoire.

- **Propriétaire** : Service Planification & Suivi-Évaluation (SPSE)
- **Objectif** : Suivi et évaluation des politiques publiques d'intégration régionale, de gestion de la diaspora et d'indicateurs macroéconomiques
- **URL publiée** : https://ecobase.lovable.app

---

## 2. STACK TECHNIQUE

| Couche | Technologie |
|--------|-------------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 (SWC) |
| Routing | React Router v6 |
| State serveur | TanStack Query v5 |
| UI Components | shadcn/ui (base "slate", CSS variables) |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Export | jspdf + jspdf-autotable + xlsx |
| Auth & Backend | Supabase (via Lovable Cloud) |
| Validation | Zod |
| Formulaires | React Hook Form |

### Alias de chemin
@/* → ./src/*

---

## 3. DESIGN SYSTEM

### Palette de couleurs (HSL)

Variables CSS racine (mode clair) :
- --background: 0 0% 98%
- --foreground: 24 100% 12%
- --card: 0 0% 100%
- --primary: 27 96% 51% (Orange vif)
- --primary-foreground: 0 0% 100%
- --secondary: 142 76% 36% (Vert)
- --secondary-foreground: 0 0% 100%
- --muted: 24 20% 95%
- --muted-foreground: 24 10% 45%
- --accent: 27 96% 51%
- --destructive: 0 84.2% 60.2%
- --border: 24 20% 88%
- --radius: 0.75rem

Variables CSS mode sombre (.dark) :
- --background: 24 30% 8%
- --foreground: 0 0% 98%
- --card: 24 25% 12%
- --muted: 24 20% 20%
- --border: 24 20% 22%

### Principes visuels
- Glassmorphism : bg-card/60 backdrop-blur-sm border-border/50
- Hover animations : hover:scale-[1.02] hover:shadow-xl transition-all duration-300
- Gradients : bg-gradient-to-br from-primary via-primary/90 to-primary/80
- Toutes les couleurs via tokens sémantiques Tailwind (jamais de couleurs directes)

---

## 4. ARCHITECTURE DES ROUTES

### Front Office (public)
| Route | Page | Description |
|-------|------|-------------|
| / | Index | Page d'accueil avec hero, message ministre, piliers, stats, partenaires |
| /integration | Integration | Dashboard intégration africaine (SLEC, commerce) |
| /diaspora | Diaspora | Dashboard ivoiriens de l'extérieur |
| /circulation | Circulation | Dashboard libre circulation des personnes |
| /performance | Performance | Tableaux de performance avec cibles |
| /documents-rapports | DocumentsRapports | Documents stratégiques et rapports |
| /auth | Auth | Page de connexion (pas d'inscription publique) |

### Back Office (admin, protégé par auth)
| Route | Page | Description |
|-------|------|-------------|
| /admin | AdminDashboard | Vue d'ensemble |
| /admin/page-accueil | PageAccueil | Gestion contenu page d'accueil |
| /admin/page-integration | PageIntegration | Gestion contenu intégration |
| /admin/page-diaspora | PageDiaspora | Gestion contenu diaspora |
| /admin/page-circulation | PageCirculation | Gestion contenu circulation |
| /admin/page-performance | PagePerformance | Gestion contenu performance |
| /admin/page-documents | PageDocuments | Gestion documents & rapports |
| /admin/organisations | Organisations | CRUD organisations régionales |
| /admin/structures-nationales | StructuresNationales | CRUD structures nationales |
| /admin/structures-internes | StructuresInternes | CRUD structures internes ministère |
| /admin/partenaires | Partenaires | CRUD partenaires (PTF) |
| /admin/pays | Pays | CRUD pays membres |
| /admin/programmes | Programmes | CRUD programmes & projets |
| /admin/indicateurs | Indicateurs | CRUD indicateurs |
| /admin/donnees | Donnees | CRUD données |
| /admin/workflow | Workflow | Gestion workflow de validation |
| /admin/rapports | Rapports | Génération rapports & exports |
| /admin/connecteurs | Connecteurs | Gestion connecteurs de données |
| /admin/utilisateurs | Utilisateurs | Gestion utilisateurs & rôles |
| /admin/parametres | Parametres | Paramètres système |
| /admin/notifications | NotificationsHistory | Historique notifications |

### Layout Admin
- AdminLayout : Vérifie l'authentification, redirige vers /auth si non connecté
- Composants : AdminSidebar (navigation latérale collapsible) + AdminTopbar
- Wrappé dans SidebarProvider et NotificationsProvider

---

## 5. AUTHENTIFICATION & SÉCURITÉ

### Règles
- **Pas d'inscription publique** : seuls les admins créent les utilisateurs
- Auth via Supabase signInWithPassword
- Page /auth : formulaire login uniquement + message "Contactez votre administrateur"
- Validation Zod sur email et mot de passe

### Rôles (enum app_role)
| Rôle | Droits |
|------|--------|
| admin | Accès total, création utilisateurs, validation finale |
| editor | Modification données, validation intermédiaire |
| viewer | Lecture seule |

### Rôles legacy (compatibilité)
| Ancien | Nouveau |
|--------|---------|
| SPSE_ADMIN | admin |
| DIRECTION | editor |
| POINT_FOCAL | editor |
| LECTEUR | viewer |

### Edge Function create-user
- Vérifie que l'appelant est admin (via JWT + user_roles)
- Crée l'utilisateur avec admin.createUser (service role key)
- Assigne le rôle via user_roles
- Auto-confirme l'email

---

## 6. BASE DE DONNÉES (Supabase)

### Tables existantes

#### profiles
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | Lié à auth.users |
| email | text | Email |
| full_name | text? | Nom complet |
| created_at | timestamptz | |
| updated_at | timestamptz | |

RLS : users can view/update own profile only.

#### user_roles
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid (PK) | |
| user_id | uuid | Lié à auth.users |
| role | app_role | admin/editor/viewer |
| created_at | timestamptz | |

RLS : admins can manage all, users can view own.

#### ministre_info
| Colonne | Type | Default |
|---------|------|---------|
| id | uuid | auto |
| nom | text | 'S.E.M ADAMA DOSSO' |
| titre | text | 'Ministre Délégué' |
| titre_complet | text | (long) |
| citation | text | (long) |
| photo_url | text? | |

RLS : public read only.

#### piliers_strategiques
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | |
| code | text | INT, DIA, MACRO |
| titre | text | |
| description | text? | |
| icone | text | Nom d'icône Lucide |
| ordre | int | |

RLS : public read only.

#### dashboard_stats
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | |
| annee | text | Année |
| nom | text | Nom indicateur |
| valeur | text | Valeur |
| unite | text? | |
| tendance | text? | |
| categorie | text | Intégration/Diaspora/Circulation |

RLS : public read only.

#### poids_regionaux
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | |
| nom | text | ex: "PIB Afrique" |
| valeur | numeric | |
| unite | text | ex: "%" |

RLS : public read only.

#### partenaires
| Colonne | Type | Description |
|---------|------|-------------|
| id | uuid | |
| nom | text | Nom complet |
| sigle | text | CEDEAO, OIM, etc. |
| type | text | Nationale/Régionale/Internationale/PTF |
| url | text? | Site web |
| statut | text | Actif/Inactif |
| logo_url | text? | |

RLS : public read only.

### Fonctions DB
- has_role(uuid, app_role) → boolean : SECURITY DEFINER
- get_user_role(uuid) → app_role : SECURITY DEFINER
- handle_new_user() : trigger on auth.users INSERT → crée profile + role viewer
- update_updated_at_column() : trigger pour updated_at

### Trigger
- handle_new_user sur auth.users INSERT

---

## 7. DONNÉES MÉTIER (actuellement en mock/mémoire)

### 7.1 Indicateurs d'Intégration (par année 2020-2024)
| Indicateur | Catégorie |
|------------|-----------|
| Résilience climatique | CILSS |
| Développement Capital Humain | Social |
| Entreprises SLEC agréées | Commerce |
| Produits SLEC agréés | Commerce |
| Exportations SLEC (Mds FCFA) | Commerce |
| Part exportations SLE (%) | Commerce |

### 7.2 Indicateurs Diaspora (par année 2020-2024)
| Indicateur | Catégorie |
|------------|-----------|
| Sensibilisés immigration clandestine | Sensibilisation |
| Sensibilisés insertion CI | Sensibilisation |
| Ivoiriens réinsérés | Réinsertion |
| Intégrés Fonction Publique | Emploi |
| Transferts d'argent / PIB | Économie |
| Enregistrés CNPS | Social |
| Ivoiriens assistés | Assistance |

### 7.3 Indicateurs Circulation (par année 2020-2024)
| Indicateur | Catégorie |
|------------|-----------|
| Ressortissants africains en CI (%) | Population |
| Trafic ferroviaire UEMOA | Transport |
| Voyageurs aériens UEMOA | Transport |
| Voyageurs aériens CEDEAO | Transport |
| Trafic routier UEMOA | Transport |
| Trafic routier CEDEAO | Transport |

### 7.4 Détails SLEC par année
- entreprisesAgreees, entreprisesActives, tauxActivite
- produitsAgrees, volumeExports, partSleIntraRegional

### 7.5 Étudiants étrangers par région
| Région | Total | Économie | Droit | Culture | Autres |
|--------|-------|----------|-------|---------|--------|
| UEMOA | 45600 | 12300 | 15400 | 8900 | 9000 |
| CEDEAO | 67800 | 18900 | 22400 | 12300 | 14200 |
| UFM | 8900 | 2300 | 3400 | 1800 | 1400 |

### 7.6 Performance (3 onglets avec indicateurs cibles)

#### Administration Générale
- Taux de réalisation des activités planifiées (68% → 72%)
- Taux de digitalisation (20% → 32%)
- Partenaires mobilisés (5 → 7)
- Participation réunions régionales (33% → 50%)
- Directions avec plans d'actions (26% → 40%)
- Services avec rapports trimestriels (13% → 30%)
- Exécution dépenses biens/services (89% → 95%)

#### Intégration Africaine
- IIRA (0.55 → 0.67)
- Pénétration marchés africains (3% → 5%)
- Entreprises assistées (5 → 15)
- Agréments SLE CEDEAO (20 → 35)
- Mise en œuvre APE (45% → 75%)

#### Ivoiriens de l'Extérieur
- Sensibilisés immigration clandestine (8920 → 13780)
- Réinsérés (2780 → 4320)
- Fonction publique (389 → 634)
- Transferts/PIB (6.8% → 9.1%)
- CNPS (6340 → 9870)
- Assistés (3120 → 5120)

### 7.7 Projets en cours
| Projet | Leader | Progression |
|--------|--------|-------------|
| Administration Générale | Service Planification | 51% |
| Intégration Régionale | DGIA | 78% |
| Mobilisation Diaspora | Direction Mobilisation | 62% |

### 7.8 Poids régionaux de la CI
| Indicateur | Valeur |
|------------|--------|
| PIB Afrique | 3.8% |
| PIB CEDEAO | 35.2% |
| PIB UEMOA | 38.7% |
| Exports Afrique | 4.2% |
| Exports CEDEAO | 38.5% |
| Imports Afrique | 3.9% |
| Imports CEDEAO | 36.8% |

---

## 8. DOCUMENTS STRATÉGIQUES

### Documents
| Acronyme | Titre | Période |
|----------|-------|---------|
| PND | Plan National de Développement | 2026-2030 |
| DPPD-PAP | Document de Programmation Pluriannuelle des Dépenses | 2024-2027 |
| PSI | Plan Stratégique Intégré | 2023-2027 |
| PNGDI | Plan National Gestion Diaspora Ivoirienne | 2024-2028 |
| Document Durable | Développement Durable et Intégration Régionale | 2023-2030 |
| Résilience | Cadre Stratégique de Résilience | 2024-2029 |
| Textes CEDEAO | Recueil des Textes Communautaires | 1975-2024 |

### Rapports
| Acronyme | Titre | Année |
|----------|-------|-------|
| RAP 2023 | Rapport Annuel de Performance | 2023 |
| Rapport PND 2023 | Rapport Annuel Mise en Œuvre PND | 2023 |
| Séminaire Bilan 2023 | Rapport du Séminaire Bilan | 2023 |

Chaque document a une description détaillée de 5-6 phrases, une taille de fichier, et un lien de téléchargement (simulé).

---

## 9. CATALOGUE D'INDICATEURS (Référentiel)

25 indicateurs détaillés répartis en 3 piliers :

### Pilier INT (Intégration régionale) — ~18 indicateurs
- Résilience climatique, Prix denrées CEDEAO, Capital Humain, Coopération technique
- SLEC : agréments entreprises, produits agréés, exportations, entreprises actives, part exports
- Libre circulation : ressortissants africains, trafic ferroviaire/routier/aérien (UEMOA/CEDEAO/Hors)
- Étudiants : UEMOA et CEDEAO en CI

### Pilier DIA (Diaspora) — 7 indicateurs
- Sensibilisation immigration clandestine, insertion CI
- Réinsérés, Fonction Publique, Transferts/PIB, CNPS, Assistés

### Pilier MACRO (Transversal) — 4 indicateurs
- Poids CI échanges Afrique Ouest, Importations, Exportations, PIB, Masse monétaire

Chaque indicateur a :
- id, name, pillar, topic, unit, frequency, method
- disaggregation : geo_region, year, sex, mode_transport, education_field
- data_source : organisations sources
- data_steward : responsable qualité
- related_to : indicateurs liés

### Relations entre indicateurs
- denominator_link, impact_pathway, correlative, program_chain, conceptual_group, leading_indicator, uses_denominator

---

## 10. ORGANISATIONS & ENTITÉS

### Organisations régionales/internationales
| Sigle | Nom | Type | Siège |
|-------|-----|------|-------|
| CEDEAO | Communauté Économique des États de l'Afrique de l'Ouest | Régionale | Abuja |
| UEMOA | Union Économique et Monétaire Ouest Africaine | Régionale | Ouagadougou |
| BAD | Banque Africaine de Développement | Internationale | Abidjan |
| OIM | Organisation Internationale pour les Migrations | Internationale | Genève |
| ENABEL | Agence belge de développement | Internationale | Bruxelles |
| EXPERTISE FRANCE | Expertise France | Internationale | Paris |
| OFII | Office Français de l'Immigration et de l'Intégration | Internationale | Paris |

### Structures nationales
| Sigle | Nom |
|-------|-----|
| DBDES | Direction du Budget et du Développement Économique et Social |
| DGCE | Direction Générale du Commerce Extérieur |
| DGD | Direction Générale des Douanes |
| CNPS | Caisse Nationale de Prévoyance Sociale |

### Structures internes du ministère
| ID | Nom | Domaine |
|----|-----|---------|
| INT-SPSE | Service Planification & Suivi-Évaluation | Planification |
| INT-DGPI | Direction Générale des Politiques d'Intégration | Intégration |
| INT-DGIE | Direction Générale des Ivoiriens de l'Extérieur | Diaspora |

### Pays membres CEDEAO
CI, GH, SN, BF, ML, NE, NG, TG, BJ, GM, GN, LR, SL, CV, GW

### Logos partenaires (fichiers locaux)
BAD, CEDEAO, CNPS, DGBF, DGCE, Douanes, Enabel, Expertise-France, OFII, OIM, UEMOA

---

## 11. COMPOSANTS RÉUTILISABLES

### Composants Front Office
| Composant | Description |
|-----------|-------------|
| Navigation | Barre de nav sticky avec logo ECOBASE et 6 liens |
| Footer | Footer avec connexion/déconnexion et nom utilisateur |
| IndicatorCard | Carte indicateur avec nom, valeur, unité, tendance, catégorie + modal détails |
| StatCard | Carte statistique avec variantes default/primary/secondary |
| TimelineChart | Graphique recharts multi-lignes avec tooltip stylisé |
| YearSelector | Select année avec icône calendrier |
| MultiYearSelector | Sélection multiple d'années |
| IndicatorSelector | Sélection d'indicateurs pour graphiques |
| AdvancedFilters | Filtres par objectif et statut |
| ExportMenu | Menu dropdown avec export CSV/Excel/PDF + aperçu |
| ExportPreviewDialog | Dialog d'aperçu avant export avec personnalisation |

### Composants Admin
| Composant | Description |
|-----------|-------------|
| AdminSidebar | Sidebar collapsible avec 5 groupes de menu |
| AdminTopbar | Barre supérieure admin |
| DeleteConfirmDialog | Dialog de confirmation de suppression |
| NotificationsDropdown | Dropdown notifications |
| YearSelectorAdmin | Sélecteur année admin |
| Modals CRUD | CreateConnecteurModal, CreateDonneeModal, CreateIndicateurModal, CreateOrganisationModal, CreatePartenaireModal, CreatePaysModal, CreateProgrammeModal, CreateStructureModal, CreateUtilisateurModal, EditOrganisationModal, EditProgrammeModal, EditStructureInterneModal, ViewOrganisationModal, ViewProgrammeModal, ViewStructureInterneModal |

---

## 12. FONCTIONNALITÉS DÉTAILLÉES PAR PAGE

### 12.1 Page d'accueil (/)
1. **Hero Section** : Motif africain en SVG, badge "Plateforme Officielle", titre ECOBASE en 3 couleurs, description, 2 CTA, 3 stats (indicateurs, partenaires, piliers)
2. **Message du Ministre** : Animation IntersectionObserver, photo avec cadre décoratif, citation avec guillemets stylisés, titre officiel
3. **Mini-Charts** : 3 cartes avec AreaChart/BarChart (Exports SLEC, Transferts/PIB, Voyageurs CEDEAO)
4. **Accordion** : Missions (2 cartes image+overlay), Documents (liens téléchargement), Structure Organisationnelle (DGPI, DGIE, SPSE)
5. **Piliers Stratégiques** : 3 cartes avec badge nombre indicateurs
6. **Partenaires** : Groupés par type (National, Régional/Communautaire, International), logos cliquables
7. **Statistiques Dashboard** : Grille de StatCards alimentée par DB

### 12.2 Intégration Africaine (/integration)
- Header vert gradient
- YearSelector + ExportMenu
- ToggleGroup filtrage par catégorie (Commerce, Social, CILSS)
- TimelineChart multi-lignes
- Grille d'IndicatorCards avec descriptions détaillées
- Section SLEC : entreprises agréées/actives, produits, exports, taux

### 12.3 Diaspora (/diaspora)
- Header orange gradient
- YearSelector + ExportMenu
- ToggleGroup (Sensibilisation, Réinsertion, Emploi, Économie, Social, Assistance)
- TimelineChart
- Grille d'IndicatorCards
- PieChart répartition des actions
- Card Impact Économique
- Card Programmes de Sensibilisation

### 12.4 Circulation (/circulation)
- Header vert foncé hsl(155,75%,35%)
- YearSelector + ExportMenu
- ToggleGroup (Population, Transport)
- TimelineChart
- Grille d'IndicatorCards
- BarChart comparaison modes de transport
- BarChart étudiants étrangers par région (empilé)
- Cards détails étudiants par région

### 12.5 Performance (/performance)
- Header orange gradient
- MultiYearSelector + ExportMenu
- 2 TimelineCharts avec IndicatorSelector (Administration, Intégration)
- Section Projets en Cours : 3 cards avec Progress bars
- Tabs 3 onglets (Administration, Intégration, Diaspora) :
  - AdvancedFilters par objectif/statut
  - Tableaux avec colonnes : Indicateur, Référence, 2022, 2023, 2024, Statut
  - Badges statut : Atteint (vert), En cours, À risque (orange), Non atteint (rouge)
- Card "À Propos d'ECOBASE"

### 12.6 Documents & Rapports (/documents-rapports)
- Header orange gradient
- 2 sections : Documents Stratégiques + Rapports d'Activités
- Cards cliquables ouvrant un Dialog avec description complète, metadata, bouton téléchargement
- Card information en bas

### 12.7 Page d'Auth (/auth)
- Formulaire login uniquement (pas de signup)
- Validation Zod
- Redirection vers /admin après connexion
- Message : "Les comptes sont créés par les administrateurs"

---

## 13. WORKFLOW DE VALIDATION DES DONNÉES

### Statuts
Brouillon → En validation → Validé SPSE → Publié

### Structure d'une donnée (interface Donnee)
- id : identifiant unique
- indicateur_id : référence à l'indicateur
- year : année (optionnel)
- month : mois (optionnel)
- quarter : trimestre (optionnel)
- geo_region : région géographique (optionnel)
- value : valeur numérique
- unit : unité de mesure
- source_note : note sur la source
- loaded_at : date de chargement
- statut : "Brouillon" | "En validation" | "Validé SPSE" | "Publié"
- auteur_id : identifiant de l'auteur
- commentaires : commentaires (optionnel)

---

## 14. EXPORTS

### Formats supportés
- **CSV** : export direct
- **Excel** : via xlsx
- **PDF** : via jspdf + jspdf-autotable

### Fonctionnalité
- Menu dropdown avec export rapide par format
- Dialog d'aperçu avec personnalisation des colonnes avant export
- Disponible sur toutes les pages de données (Integration, Diaspora, Circulation, Performance)

---

## 15. CONTEXTE DE DONNÉES (DataContext)

Le DataContext centralise toutes les données de l'application :

### État
- integrationIndicatorsByYear, diasporaIndicatorsByYear, circulationIndicatorsByYear
- slecDetailsByYear, studentsDataByYear
- partners, piliers, poidsRegionaux
- dashboardStatsByYear, ministreInfo
- availableYears

### Actions
- updateIntegrationIndicators(year, indicators)
- updateDiasporaIndicators(year, indicators)
- updateCirculationIndicators(year, indicators)
- updateSlecDetails(year, details)
- updateStudentsData(year, data)
- addPartner/removePartner/updatePartner
- updatePiliers, updatePoidsRegionaux
- updateDashboardStats(year, stats)
- updateMinistreInfo(info)
- addYear/removeYear

**Note** : Certaines données (ministre_info, piliers, partenaires, dashboard_stats, poids_regionaux) sont persistées en DB Supabase. Le reste est en mémoire (mock data).

---

## 16. CONNECTEURS DE DONNÉES (mock)

| ID | Nom | Cible | État | Fréquence |
|----|-----|-------|------|-----------|
| CONN-CEDEAO | CEDEAO API | slec_part_exportations_intra | ON | Trimestrielle |
| CONN-BCEAO | BCEAO API | transferts_diaspora_part_pib | OFF | Annuelle |

---

## 17. SIDEBAR ADMIN — STRUCTURE

Tableau de bord
  └ Vue d'ensemble

Gestion des Pages
  ├ Page d'accueil
  ├ Intégration Africaine
  ├ Ivoiriens de l'Extérieur
  ├ Libre Circulation
  ├ Performance
  └ Documents & Rapports

Gestion des Acteurs & Entités
  ├ Organisations régionales
  ├ Structures nationales
  ├ Structures internes
  ├ Partenaires (PTF)
  └ Pays membres

Programmes & Données
  ├ Programmes & Projets
  ├ Indicateurs
  ├ Données
  └ Workflow

Rapports & Paramètres
  ├ Rapports & Exports
  ├ Connecteurs
  ├ Utilisateurs & Rôles
  └ Paramètres

---

## 18. ASSETS & IMAGES

### Images statiques
- src/assets/ministre-dosso-adama.png — Photo du ministre
- src/assets/integration-policy.jpg — Image politique intégration
- src/assets/diaspora-policy.jpg — Image politique diaspora

### Logos partenaires (src/assets/logos/)
BAD.png, CNPS.png, DGBF.png, DGCE.png, Douanes.png, Enabel.png, Expertise-France.png, OFII.png, OIM.png, UEMOA.png, cedeao.png

---

## 19. DESCRIPTIONS DÉTAILLÉES DES INDICATEURS

Chaque indicateur a une description de 4-5 phrases expliquant :
- Ce que mesure l'indicateur
- La méthodologie de calcul
- Les tendances observées
- L'impact sur l'intégration/diaspora/mobilité

(Voir src/data/indicatorDescriptions.ts pour les textes complets — 3 dictionnaires : intégration, diaspora, circulation)

---

## 20. POINTS D'ATTENTION POUR LA RECONSTRUCTION

1. **Pas d'inscription publique** : seuls les admins créent les utilisateurs via Edge Function
2. **RLS Supabase** : toutes les tables publiques en lecture seule, écritures réservées aux admins authentifiés
3. **DataContext** : actuellement hybride (certaines données en DB, d'autres en mock) — à migrer entièrement vers DB
4. **Workflow validation** : actuellement en mock, à implémenter avec persistance
5. **Tous les CRUD backoffice** doivent aligner parfaitement avec le front office
6. **Les exports** (CSV/Excel/PDF) sont fonctionnels sur toutes les pages de données
7. **Responsive** : navigation desktop avec icônes + labels, mobile icônes seules
8. **Dark mode** : supporté via CSS variables
9. **Animations** : IntersectionObserver sur la section ministre, hover effects partout
10. **Recharts** : tooltips et légendes stylisés avec les couleurs du design system

---

## 21. METADATA SYSTÈME

- version : 1.0
- updated_at : 2025-10-23
- owner_org : SPSE / Ministère délégué (Intégration & Ivoiriens de l'Extérieur)
- license : CC-BY 4.0

### Dimensions de désagrégation
| ID | Label | Valeurs |
|----|-------|---------|
| geo_region | Région | CI, UEMOA, CEDEAO, Afrique, Hors_CEDEAO |
| year | Année | dynamique |
| sex | Sexe | H, F, Total |
| mode_transport | Mode de transport | Air, Route, Rail |
| education_field | Filière | Economie, Droit, Culture, Autres |
