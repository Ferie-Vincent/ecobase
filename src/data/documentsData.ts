export interface Document {
  id: string;
  title: string;
  acronym: string;
  description: string;
  yearStart: number;
  yearEnd: number;
  category: 'document' | 'rapport';
  fileUrl?: string;
  fileSize?: string;
  fileType?: string;
}

export const documentsData: Document[] = [
  {
    id: 'pnd',
    title: 'Plan National de Développement',
    acronym: 'PND',
    description: `Le Plan National de Développement (PND) 2026-2030 constitue le cadre de référence de la politique de développement de la Côte d'Ivoire. Il définit les grandes orientations stratégiques et les priorités nationales pour la transformation structurelle et le développement inclusif du pays. Ce plan s'articule autour de plusieurs axes majeurs : la consolidation de la croissance économique, le développement du capital humain, l'amélioration des infrastructures, la gouvernance et la cohésion sociale. Il intègre également les Objectifs de Développement Durable (ODD) et vise à positionner la Côte d'Ivoire comme un hub régional de premier plan.`,
    yearStart: 2026,
    yearEnd: 2030,
    category: 'document',
    fileUrl: '/documents/pnd-2026-2030.pdf',
    fileSize: '12.5 MB',
    fileType: 'PDF'
  },
  {
    id: 'dppd-pap',
    title: 'Document de Programmation Pluriannuelle des Dépenses - Programme Annuel de Performance',
    acronym: 'DPPD-PAP',
    description: `Le DPPD-PAP est un document stratégique de programmation budgétaire qui établit le lien entre les objectifs de développement et l'allocation des ressources publiques. Il présente une projection triennale des dépenses par programme et définit les indicateurs de performance permettant de mesurer l'efficacité de l'action publique. Ce document permet d'assurer la cohérence entre les engagements politiques, les objectifs sectoriels et les moyens budgétaires mobilisés, tout en garantissant une gestion axée sur les résultats.`,
    yearStart: 2024,
    yearEnd: 2027,
    category: 'document',
    fileUrl: '/documents/dppd-pap-2024-2027.pdf',
    fileSize: '8.2 MB',
    fileType: 'PDF'
  },
  {
    id: 'psi',
    title: 'Plan Stratégique Intégré',
    acronym: 'PSI',
    description: `Le Plan Stratégique Intégré (PSI) définit la vision et les orientations stratégiques du Ministère de l'Intégration Africaine et des Ivoiriens de l'Extérieur. Il établit les objectifs à moyen et long terme en matière d'intégration régionale, de mobilisation de la diaspora et de libre circulation des personnes. Le PSI articule les actions autour de quatre piliers majeurs : le renforcement de la participation de la Côte d'Ivoire aux processus d'intégration africaine, la valorisation des compétences de la diaspora ivoirienne, la facilitation de la mobilité dans l'espace CEDEAO et UEMOA, et la promotion des échanges commerciaux intra-africains.`,
    yearStart: 2023,
    yearEnd: 2027,
    category: 'document',
    fileUrl: '/documents/psi-2023-2027.pdf',
    fileSize: '6.8 MB',
    fileType: 'PDF'
  },
  {
    id: 'pngdi',
    title: 'Plan National de Gestion de la Diaspora Ivoirienne',
    acronym: 'PNGDI',
    description: `Le Plan National de Gestion de la Diaspora Ivoirienne (PNGDI) vise à structurer et optimiser la contribution de la diaspora ivoirienne au développement national. Il définit les mécanismes de mobilisation des compétences, des ressources et des réseaux de la diaspora pour soutenir les projets de développement en Côte d'Ivoire. Le plan couvre plusieurs domaines : l'identification et le recensement de la diaspora, la protection sociale et consulaire, la facilitation des transferts de fonds et des investissements, le programme de retour et de réinsertion, ainsi que la participation aux instances de gouvernance. Il prévoit également la mise en place d'une plateforme digitale pour renforcer les liens entre la diaspora et le pays d'origine.`,
    yearStart: 2024,
    yearEnd: 2028,
    category: 'document',
    fileUrl: '/documents/pngdi-2024-2028.pdf',
    fileSize: '9.4 MB',
    fileType: 'PDF'
  },
  {
    id: 'developpement-durable',
    title: 'Document Développement Durable et Intégration Régionale',
    acronym: 'Document Durable',
    description: `Ce document cadre intègre les principes du développement durable dans la stratégie d'intégration régionale de la Côte d'Ivoire. Il aligne les politiques d'intégration africaine avec les Objectifs de Développement Durable (ODD) de l'Agenda 2030 et l'Agenda 2063 de l'Union Africaine. Le document aborde les questions environnementales, sociales et économiques liées à l'intégration régionale, notamment la gestion durable des ressources transfrontalières, la transition énergétique, l'adaptation au changement climatique, l'économie verte et l'inclusion sociale. Il propose des mécanismes de coordination entre les différents acteurs pour assurer une intégration régionale respectueuse de l'environnement et socialement inclusive.`,
    yearStart: 2023,
    yearEnd: 2030,
    category: 'document',
    fileUrl: '/documents/developpement-durable-2023-2030.pdf',
    fileSize: '7.6 MB',
    fileType: 'PDF'
  },
  {
    id: 'resilience',
    title: 'Cadre Stratégique de Résilience et Gestion des Crises',
    acronym: 'Résilience',
    description: `Le Cadre Stratégique de Résilience définit les mécanismes de prévention, de préparation et de réponse aux crises susceptibles d'affecter l'intégration régionale et les communautés ivoiriennes à l'étranger. Il couvre les crises politiques, économiques, sanitaires, climatiques et sécuritaires. Le document établit des protocoles de coordination avec les organisations régionales (CEDEAO, Union Africaine) et internationales pour assurer la protection des citoyens ivoiriens en situation de crise, faciliter les évacuations d'urgence, et maintenir la continuité des échanges économiques régionaux. Il intègre également un volet sur la résilience communautaire et la cohésion sociale dans les zones transfrontalières.`,
    yearStart: 2024,
    yearEnd: 2029,
    category: 'document',
    fileUrl: '/documents/resilience-2024-2029.pdf',
    fileSize: '5.9 MB',
    fileType: 'PDF'
  },
  {
    id: 'textes-cedeao',
    title: 'Recueil des Textes Communautaires CEDEAO',
    acronym: 'Textes Communautaires CEDEAO',
    description: `Ce recueil compile l'ensemble des textes juridiques, protocoles, conventions et directives de la Communauté Économique des États de l'Afrique de l'Ouest (CEDEAO). Il constitue le cadre normatif régissant l'intégration régionale en Afrique de l'Ouest. Le document comprend : le traité révisé de la CEDEAO, les protocoles additionnels sur la libre circulation des personnes et des biens, les directives sectorielles (commerce, transport, énergie, télécommunications), les actes relatifs à la paix et à la sécurité, ainsi que les mécanismes de règlement des différends. Ce recueil sert de référence pour la transposition des normes communautaires dans la législation nationale et facilite la mise en œuvre des engagements régionaux de la Côte d'Ivoire.`,
    yearStart: 1975,
    yearEnd: 2024,
    category: 'document',
    fileUrl: '/documents/textes-cedeao-2024.pdf',
    fileSize: '15.3 MB',
    fileType: 'PDF'
  }
];

export const rapportsData: Document[] = [
  {
    id: 'rap-2023',
    title: 'Rapport Annuel de Performance 2023',
    acronym: 'RAP 2023',
    description: `Le Rapport Annuel de Performance (RAP) 2023 présente les réalisations du Ministère de l'Intégration Africaine et des Ivoiriens de l'Extérieur au cours de l'année écoulée. Il évalue l'atteinte des objectifs fixés dans le cadre du budget programme et mesure la performance à travers des indicateurs précis. Le rapport couvre tous les axes d'intervention du ministère : la participation aux instances régionales et continentales, les résultats en matière de commerce intra-africain et d'agrément au Schéma de Libéralisation des Échanges (SLE), les actions de mobilisation et de protection de la diaspora, les progrès dans la facilitation de la libre circulation, ainsi que les initiatives de modernisation administrative. Il inclut également une analyse financière détaillée de l'exécution budgétaire et des recommandations pour l'amélioration continue.`,
    yearStart: 2023,
    yearEnd: 2023,
    category: 'rapport',
    fileUrl: '/documents/rap-2023.pdf',
    fileSize: '11.2 MB',
    fileType: 'PDF'
  },
  {
    id: 'rapport-pnd-2023',
    title: 'Rapport Annuel de Mise en Œuvre du PND 2023',
    acronym: 'Rapport Annuel PND 2023',
    description: `Le Rapport Annuel de Mise en Œuvre du Plan National de Développement (PND) 2023 évalue la contribution du Ministère de l'Intégration Africaine à l'exécution du PND. Il présente les progrès réalisés dans la mise en œuvre des projets et programmes relevant du secteur de l'intégration régionale, en cohérence avec les axes stratégiques du PND. Le rapport analyse les indicateurs de résultats liés à l'intégration économique régionale, au renforcement du capital humain à travers la mobilisation de la diaspora, et à l'amélioration de la mobilité des personnes et des biens. Il identifie les défis rencontrés, les facteurs de blocage, et propose des mesures correctives pour accélérer l'atteinte des cibles du PND. Une section est consacrée aux bonnes pratiques et aux innovations introduites au cours de l'année.`,
    yearStart: 2023,
    yearEnd: 2023,
    category: 'rapport',
    fileUrl: '/documents/rapport-pnd-2023.pdf',
    fileSize: '9.7 MB',
    fileType: 'PDF'
  },
  {
    id: 'seminaire-bilan-2023',
    title: 'Rapport du Séminaire Bilan 2023',
    acronym: 'Rapport Séminaire Bilan 2023',
    description: `Le Rapport du Séminaire Bilan 2023 restitue les travaux du séminaire annuel d'évaluation et de planification du Ministère de l'Intégration Africaine. Ce séminaire réunit l'ensemble des cadres et responsables des directions centrales, des services déconcentrés et des structures sous tutelle pour dresser un bilan exhaustif des activités de l'année écoulée et définir les priorités pour l'année suivante. Le rapport synthétise les présentations sectorielles, les analyses SWOT (forces, faiblesses, opportunités, menaces), les débats en ateliers thématiques, et les recommandations stratégiques issues des travaux de groupe. Il comprend également les résolutions adoptées, le plan d'action prévisionnel, la feuille de route pour la mise en œuvre des recommandations, ainsi que les indicateurs de suivi retenus. Le document inclut les allocutions des autorités et les contributions des partenaires techniques et financiers.`,
    yearStart: 2023,
    yearEnd: 2023,
    category: 'rapport',
    fileUrl: '/documents/seminaire-bilan-2023.pdf',
    fileSize: '14.8 MB',
    fileType: 'PDF'
  }
];

export const getAllDocuments = () => [...documentsData, ...rapportsData];
export const getDocumentsByCategory = (category: 'document' | 'rapport') => 
  category === 'document' ? documentsData : rapportsData;
