import type { IconName } from '../shared/icon/icon';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Contact', href: '#contact' },
];

export const CONTACT_EMAIL = 'etudes534@gmail.com';

export const HERO_META = [
  { value: '27', label: 'Modules intégrés' },
  { value: 'OHADA', label: 'Plan comptable' },
  { value: 'Desktop + Web', label: 'Electron & PWA' },
];

export const RIBBON_ITEMS = [
  'Factures', 'Trésorerie', 'Caisse', 'ASC', 'Reporting',
  'Versements', 'Billetage', 'Plan OHADA', 'Journal SGM', 'Notifications push',
];

export const STATS = [
  { value: 27, label: 'Modules métier intégrés — de la caisse au journal SGM' },
  { value: 6, label: "Rôles et profils d'accès — contrôle précis par utilisateur" },
  { value: 18, label: 'Postes comptables OHADA adaptés à la pharmacie CI' },
];

export const COMPARE = {
  before: [
    'Tableurs Excel fragmentés entre plusieurs personnes',
    'Clôture de caisse manuelle — 20 à 40 minutes par jour',
    'Suivi des factures fournisseurs par papier ou SMS',
    'Pas de vision hebdomadaire ni de trésorerie prévisionnelle',
    'Écarts de caisse inexpliqués, bilans difficiles à produire',
  ],
  after: [
    'Journal de trésorerie automatique — toujours à jour',
    'Clôture de caisse avec billetage en moins de 2 minutes',
    'Suivi des factures, règlements et restes à payer en temps réel',
    'Trésorerie prévisionnelle et journal SGM hebdomadaire',
    "Rapports financiers en 1 clic, contrôle d'accès par rôle",
  ],
};

export interface ModuleCategory {
  title: string;
  icon: IconName;
  modules: string[];
}

export const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    title: 'Ventes',
    icon: 'clipboard',
    modules: [
      'Journal des ventes quotidien',
      'Saisie espèces & chèques',
      'Récapitulatif mensuel des ventes',
      'Récapitulatif annuel des ventes',
      'Stock & analyse des gains',
    ],
  },
  {
    title: 'Factures & Fournisseurs',
    icon: 'file',
    modules: [
      'Gestion des fournisseurs (grossistes)',
      'Factures fournisseurs (brouillon → validée)',
      'Règlements & restes à payer',
      'Situation fournisseur en temps réel',
      'Prévisions de règlements',
    ],
  },
  {
    title: 'Trésorerie',
    icon: 'pulse',
    modules: [
      'Versements caisse → banque',
      'Virements bancaires',
      'Remises de chèques',
      'Virements par chèques',
      'Journal de trésorerie hebdomadaire (SGM)',
      'Trésorerie prévisionnelle (7 / 15 / 30 jours)',
      'Rapprochement bancaire',
    ],
  },
  {
    title: 'Caisse',
    icon: 'register',
    modules: [
      'Point de caisse quotidien',
      'Billetage par coupure (détection écarts)',
      'Fonds de caisse',
      'Ajustements de soldes',
      'ASC directes & déléguées (bon imprimable)',
      "Jours fériés Côte d'Ivoire",
    ],
  },
  {
    title: 'Analyses',
    icon: 'bars',
    modules: [
      'Analyses financières comparatives',
      'Récapitulatif des achats fournisseurs',
      'Récapitulatif annuel consolidé',
      'Prévisions de trésorerie',
      "Marge d'activité mensuelle",
    ],
  },
  {
    title: 'Reporting',
    icon: 'grid',
    modules: [
      'Dashboard financier en temps réel',
      'Rapport de caisse exportable',
      'Rapport ASC complet',
      'Récap mensuel & annuel',
      'Plan comptable OHADA (18 postes)',
    ],
  },
  {
    title: 'Administration & Accès',
    icon: 'users',
    modules: [
      'Gestion multi-pharmacies',
      'Utilisateurs & profils',
      '6 rôles métier configurables',
      '18 permissions granulaires',
      'Comptes bancaires & caisses',
      'Notifications push (alertes temps réel)',
    ],
  },
];

export const STEPS = [
  {
    name: 'Configuration de la pharmacie',
    desc: 'Renseignez le profil, les comptes bancaires, le fournisseur principal et les utilisateurs. Moins de 30 minutes.',
  },
  {
    name: 'Saisie des opérations',
    desc: 'Ventes, versements, factures, caisses — chaque opération se saisit en quelques clics selon votre rôle.',
  },
  {
    name: 'Journal automatique',
    desc: 'Le journal de trésorerie se construit en temps réel. Les soldes journaliers et les prévisions sont calculés automatiquement.',
  },
  {
    name: 'Analyses et rapports',
    desc: 'Tableau de bord, récapitulatifs, rapport ASC, analyse de marge — disponibles en un clic à tout moment.',
  },
];

export interface Plan {
  name: string;
  amount: string;
  currency?: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    name: 'Découverte',
    amount: 'Gratuit',
    period: '30 jours pour tester',
    features: [
      'Tous les modules inclus',
      "1 pharmacie, jusqu'à 5 utilisateurs",
      "Données conservées à l'issue",
      'Support par e-mail',
    ],
    cta: 'Commencer gratuitement',
  },
  {
    name: 'Pharmacie Pro',
    amount: '20 000',
    currency: 'FCFA',
    period: 'par mois · facturation mensuelle',
    features: [
      'Tous les modules inclus',
      '1 pharmacie, utilisateurs illimités',
      'Mises à jour automatiques',
      'Support prioritaire WhatsApp',
    ],
    cta: "S'abonner",
    featured: true,
    badge: 'Recommandé',
  },
  {
    name: 'Réseau',
    amount: '45 000',
    currency: 'FCFA',
    period: 'par mois · multi-pharmacies',
    features: [
      "Jusqu'à 5 pharmacies",
      'Utilisateurs illimités par site',
      'Vue consolidée multi-sites',
      'Onboarding personnalisé',
    ],
    cta: 'Nous contacter',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "« Le Trésorier nous a permis de clôturer la caisse en moins de 2 minutes au lieu de 30. Les écarts de billetage ont disparu depuis la première semaine d'utilisation. »",
    name: 'Pélagie A.',
    role: 'Pharmacienne gérante · Pharmacie Divine Espérance, Kouao',
  },
  {
    quote:
      "« Enfin un logiciel qui comprend la réalité de nos pharmacies en Côte d'Ivoire. Le plan OHADA est parfaitement intégré et les rapports sont conformes à ce que demande la comptabilité. »",
    name: 'Nathalie K.',
    role: 'Responsable caisse · Pharmacie de la Cité Verte',
  },
  {
    quote:
      "« Le journal hebdomadaire me donne une vision claire de ma trésorerie à 15 jours. Je sais exactement où j'en suis sans attendre la fin du mois pour faire mes comptes. »",
    name: 'Dr. Fatou D.',
    role: 'Pharmacienne gérante · Pharmacie du Plateau, Abidjan',
  },
];

export const FOOTER_COLUMNS = [
  {
    label: 'Modules',
    links: [
      { label: 'Journal des ventes', href: '#fonctionnalites' },
      { label: 'Factures fournisseurs', href: '#fonctionnalites' },
      { label: 'Caisse & billetage', href: '#fonctionnalites' },
      { label: 'ASC', href: '#fonctionnalites' },
      { label: 'Reporting', href: '#fonctionnalites' },
    ],
  },
  {
    label: 'Ressources',
    links: [
      { label: 'Prise en main', href: '#etapes' },
      { label: 'Tarifs', href: '#tarifs' },
      { label: 'Témoignages', href: '#temoignages' },
      { label: 'Demander une démo', href: '#contact' },
    ],
  },
];
