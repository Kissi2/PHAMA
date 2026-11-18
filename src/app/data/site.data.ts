import type { IconName } from '../shared/icons';

export const CONTACT_EMAIL = 'etudes534@gmail.com';


/** Numéros de l'équipe commerciale affichés dans la modale « Contacter l'équipe » (bas de page). À REMPLACER par les vrais numéros. */
export const SALES_PHONES = ['+225 00 00 00 00 00', '+225 00 00 00 00 01'];

export const NAV_LINKS = [
  { label: 'Produit', href: '#produit' },
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Avis', href: '#avis' },
];

/* ── Hero ─────────────────────────────────────────────────────────── */

export const HERO_TRUST = ['Plan comptable OHADA', 'Desktop & Web (PWA)', "30 jours d'essai gratuit"];

/* ── Aperçu du tableau de bord (maquette décorative) ─────────────── */

export interface SideLink {
  icon: IconName;
  label: string;
  active?: boolean;
  count?: number;
}

export const MOCK_SIDEBAR: { label?: string; links: SideLink[] }[] = [
  {
    links: [
      { icon: 'layout-dashboard', label: 'Tableau de bord', active: true },
      { icon: 'clipboard-list', label: 'Ventes' },
      { icon: 'banknote', label: 'Caisse' },
      { icon: 'file-text', label: 'Factures', count: 4 },
      { icon: 'activity', label: 'Trésorerie' },
    ],
  },
  {
    label: 'Analyse',
    links: [
      { icon: 'chart-no-axes-column', label: 'Analyses' },
      { icon: 'panels-top-left', label: 'Rapports' },
      { icon: 'landmark', label: 'Banques' },
    ],
  },
  { label: 'Admin', links: [{ icon: 'users', label: 'Utilisateurs' }] },
];

export interface Kpi {
  label: string;
  icon: IconName;
  amber?: boolean;
  value: string;
  unit?: string;
  trend: 'up' | 'dn';
  delta: string;
  note: string;
}

export const MOCK_KPIS: Kpi[] = [
  { label: 'Solde de trésorerie', icon: 'landmark', value: '48 650 000', unit: 'FCFA', trend: 'up', delta: '+12,4 %', note: 'vs mois dernier' },
  { label: 'Ventes du jour', icon: 'clipboard-list', value: '2 318 500', unit: 'FCFA', trend: 'up', delta: '+8,1 %', note: 'vs mardi dernier' },
  { label: 'Factures à régler', icon: 'file-text', amber: true, value: '6 920 000', unit: 'FCFA', trend: 'dn', delta: '4 échéances', note: 'cette semaine' },
  { label: 'Marge du mois', icon: 'chart-no-axes-column', value: '27,8 %', trend: 'up', delta: '+1,2 pt', note: 'vs objectif' },
];

/** Courbe des encaissements (vert). */
export const CHART_IN =
  'M0.0 70.6 C9.0 70.6 9.0 57.8 17.9 57.8 C26.9 57.8 26.9 55.0 35.9 55.0 C44.8 55.0 44.8 31.7 53.8 31.7 C62.8 31.7 62.8 29.5 71.7 29.5 C80.7 29.5 80.7 31.2 89.7 31.2 C98.6 31.2 98.6 38.2 107.6 38.2 C116.6 38.2 116.6 40.2 125.5 40.2 C134.5 40.2 134.5 33.6 143.4 33.6 C152.4 33.6 152.4 40.8 161.4 40.8 C170.3 40.8 170.3 57.5 179.3 57.5 C188.3 57.5 188.3 57.1 197.2 57.1 C206.2 57.1 206.2 61.1 215.2 61.1 C224.1 61.1 224.1 71.4 233.1 71.4 C242.1 71.4 242.1 76.3 251.0 76.3 C260.0 76.3 260.0 77.4 269.0 77.4 C277.9 77.4 277.9 66.4 286.9 66.4 C295.9 66.4 295.9 68.8 304.8 68.8 C313.8 68.8 313.8 54.9 322.8 54.9 C331.7 54.9 331.7 46.6 340.7 46.6 C349.7 46.6 349.7 43.9 358.6 43.9 C367.6 43.9 367.6 32.4 376.6 32.4 C385.5 32.4 385.5 31.5 394.5 31.5 C403.4 31.5 403.4 11.8 412.4 11.8 C421.4 11.8 421.4 20.8 430.3 20.8 C439.3 20.8 439.3 13.5 448.3 13.5 C457.2 13.5 457.2 9.8 466.2 9.8 C475.2 9.8 475.2 2.5 484.1 2.5 C493.1 2.5 493.1 18.2 502.1 18.2 C511.0 18.2 511.0 20.5 520.0 20.5';

/** Courbe des décaissements (ambre). */
export const CHART_OUT =
  'M0.0 79.2 C9.0 79.2 9.0 75.8 17.9 75.8 C26.9 75.8 26.9 72.3 35.9 72.3 C44.8 72.3 44.8 69.4 53.8 69.4 C62.8 69.4 62.8 83.6 71.7 83.6 C80.7 83.6 80.7 89.8 89.7 89.8 C98.6 89.8 98.6 99.8 107.6 99.8 C116.6 99.8 116.6 94.1 125.5 94.1 C134.5 94.1 134.5 100.8 143.4 100.8 C152.4 100.8 152.4 112.3 161.4 112.3 C170.3 112.3 170.3 105.1 179.3 105.1 C188.3 105.1 188.3 98.2 197.2 98.2 C206.2 98.2 206.2 104.0 215.2 104.0 C224.1 104.0 224.1 88.0 233.1 88.0 C242.1 88.0 242.1 88.1 251.0 88.1 C260.0 88.1 260.0 82.9 269.0 82.9 C277.9 82.9 277.9 66.7 286.9 66.7 C295.9 66.7 295.9 73.3 304.8 73.3 C313.8 73.3 313.8 70.3 322.8 70.3 C331.7 70.3 331.7 70.1 340.7 70.1 C349.7 70.1 349.7 82.6 358.6 82.6 C367.6 82.6 367.6 89.6 376.6 89.6 C385.5 89.6 385.5 98.9 394.5 98.9 C403.4 98.9 403.4 109.0 412.4 109.0 C421.4 109.0 421.4 104.5 430.3 104.5 C439.3 104.5 439.3 107.3 448.3 107.3 C457.2 107.3 457.2 108.7 466.2 108.7 C475.2 108.7 475.2 106.6 484.1 106.6 C493.1 106.6 493.1 100.2 502.1 100.2 C511.0 100.2 511.0 91.8 520.0 91.8';

export const CHART_X = ['18 oct.', '25 oct.', '1 nov.', '8 nov.', '17 nov.'];

export const MOCK_SPLIT = [
  { label: 'Espèces', color: '#1e4d2b', pct: 58 },
  { label: 'Tiers payant', color: '#f4b73e', pct: 24 },
  { label: 'Chèques', color: '#7fbf92', pct: 18 },
];

export const MOCK_REGISTERS = [
  { label: 'Caisse 1', pct: 86 },
  { label: 'Caisse 2', pct: 64 },
];

export const MOCK_OPERATIONS = [
  { label: 'Versement caisse → banque', account: 'SGBCI ••• 4821', date: '17/11 · 09:42', status: 'Validé', tag: 'ok', amount: '+ 3 450 000', positive: true },
  { label: 'Facture grossiste n° F-2611', account: 'Fournisseur', date: '16/11 · 17:10', status: 'À régler', tag: 'wt', amount: '− 1 245 000', positive: false },
  { label: 'Remise de chèques (6)', account: 'SIB ••• 0937', date: '16/11 · 11:05', status: 'En cours', tag: 'in', amount: '+ 812 300', positive: true },
];

/* ── Bandeau défilant ─────────────────────────────────────────────── */

export const BAND_ITEMS = [
  'Factures', 'Trésorerie', 'Caisse', 'ASC', 'Reporting',
  'Versements', 'Billetage', 'Plan OHADA', 'Journal SGM', 'Notifications push',
];

/* ── Chiffres ─────────────────────────────────────────────────────── */

export const STATS: { value: string; count?: number; label: string }[] = [
  { value: '27', count: 27, label: 'Modules métier intégrés, de la caisse au journal SGM' },
  { value: '6', count: 6, label: "Rôles et profils d'accès, contrôle précis par utilisateur" },
  { value: '18', count: 18, label: 'Postes comptables OHADA adaptés à la pharmacie' },
  { value: '< 2 min', label: 'Pour clôturer une caisse avec billetage' },
];

/* ── Avant / Après ────────────────────────────────────────────────── */

export const COMPARE_BEFORE = [
  'Tableurs Excel fragmentés entre plusieurs personnes',
  'Clôture de caisse manuelle : 20 à 40 minutes par jour',
  'Suivi des factures fournisseurs sur papier ou par SMS',
  'Aucune vision hebdomadaire ni trésorerie prévisionnelle',
  'Écarts de caisse inexpliqués, bilans difficiles à produire',
];

export const COMPARE_AFTER = [
  'Journal de trésorerie automatique, toujours à jour',
  'Clôture de caisse avec billetage en moins de 2 minutes',
  'Factures, règlements et restes à payer suivis en temps réel',
  'Trésorerie prévisionnelle et journal SGM hebdomadaire',
  "Rapports financiers en 1 clic, contrôle d'accès par rôle",
];

/* ── Fonctionnalités ──────────────────────────────────────────────── */

export const FEATURE_MAIN = {
  icon: 'activity' as IconName,
  title: 'Trésorerie',
  desc: "Le cœur de l'application : chaque mouvement alimente automatiquement votre journal et vos prévisions.",
  items: [
    'Versements caisse → banque',
    'Virements bancaires & par chèques',
    'Remises de chèques',
    'Journal de trésorerie hebdomadaire (SGM)',
    'Trésorerie prévisionnelle (7 / 15 / 30 jours)',
    'Rapprochement bancaire',
  ],
};

export const FEATURES: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: 'clipboard-list',
    title: 'Ventes',
    items: ['Journal des ventes quotidien', 'Saisie espèces & chèques', 'Récapitulatifs mensuel et annuel', 'Stock & analyse des gains'],
  },
  {
    icon: 'file-text',
    title: 'Factures & fournisseurs',
    items: ['Gestion des grossistes', 'Factures (brouillon → validée)', 'Règlements & restes à payer', 'Situation fournisseur et prévisions'],
  },
  {
    icon: 'banknote',
    title: 'Caisse',
    items: ['Point de caisse quotidien', "Billetage par coupure (détection d'écarts)", 'Fonds de caisse & ajustements', 'ASC directes & déléguées'],
  },
  {
    icon: 'chart-no-axes-column',
    title: 'Analyses',
    items: ['Analyses financières comparatives', 'Récapitulatif des achats fournisseurs', 'Récapitulatif annuel consolidé', "Marge d'activité mensuelle"],
  },
  {
    icon: 'panels-top-left',
    title: 'Reporting',
    items: ['Dashboard financier en temps réel', 'Rapport de caisse exportable', 'Rapport ASC complet', 'Plan comptable OHADA (18 postes)'],
  },
  {
    icon: 'users',
    title: 'Administration',
    items: ['Gestion multi-pharmacies', '6 rôles, 18 permissions granulaires', 'Comptes bancaires & caisses', 'Notifications push en temps réel'],
  },
];

/* ── Prise en main ────────────────────────────────────────────────── */

export const STEPS = [
  { title: 'Configuration', desc: 'Profil de la pharmacie, comptes bancaires, fournisseur principal et utilisateurs. Moins de 30 minutes.' },
  { title: 'Saisie des opérations', desc: 'Ventes, versements, factures, caisses : chaque opération se saisit en quelques clics selon votre rôle.' },
  { title: 'Journal automatique', desc: 'Le journal se construit en temps réel. Soldes journaliers et prévisions sont calculés automatiquement.' },
  { title: 'Analyses et rapports', desc: 'Tableau de bord, récapitulatifs, rapport ASC, analyse de marge : disponibles en un clic.' },
];

/* ── Tarifs ───────────────────────────────────────────────────────── */

export interface Plan {
  name: string;
  amount: string;
  unit?: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
  /** Ouvre la modale du service client au lieu de pointer vers #contact. */
  contact?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Installation',
    amount: '700 000',
    unit: 'FCFA',
    period: 'Paiement unique, à la mise en service',
    features: ['Installation et paramétrage complets', 'Reprise de vos données existantes', "Formation de votre équipe", 'Accompagnement au démarrage'],
    cta: "Demander l'installation",
    contact: true,
    featured: true,
  },
  {
    name: 'Pharmacie Pro',
    amount: '200 000',
    unit: 'FCFA / trimestre',
    period: 'Facturation trimestrielle, sans engagement',
    features: ['Tous les modules inclus', '1 pharmacie, utilisateurs illimités', 'Mises à jour automatiques', 'Support prioritaire WhatsApp'],
    cta: 'Payez maintenant',
    featured: true,
  },
];

/* ── Avis ──────────────────────────────────────────────────── */

export const TESTIMONIALS = [
  {
    quote: "« TresoPharm nous a permis de clôturer la caisse en moins de 2 minutes au lieu de 30. Les écarts de billetage ont disparu dès la première semaine d'utilisation. »",
    initials: 'PA',
    name: 'Pélagie A.',
    role: 'Pharmacienne gérante · Pharmacie Divine Espérance, Kouao',
  },
  {
    quote: "« Enfin un logiciel qui comprend la réalité de nos pharmacies en Côte d'Ivoire. Le plan OHADA est parfaitement intégré et les rapports sont conformes à ce que demande la comptabilité. »",
    initials: 'NK',
    name: 'Nathalie K.',
    role: 'Responsable caisse · Pharmacie de la Cité Verte',
  },
  {
    quote: "« Le journal hebdomadaire me donne une vision claire de ma trésorerie à 15 jours. Je sais exactement où j'en suis sans attendre la fin du mois. »",
    initials: 'FD',
    name: 'Dr Fatou D.',
    role: 'Pharmacienne gérante · Pharmacie du Plateau, Abidjan',
  },
];

/* ── Pied de page ─────────────────────────────────────────────────── */

export const PLATFORMS = ['Web (PWA)'];

export const FOOTER_COLUMNS = [
  {
    title: 'Modules',
    links: [
      { label: 'Journal des ventes', href: '#fonctionnalites' },
      { label: 'Factures fournisseurs', href: '#fonctionnalites' },
      { label: 'Caisse & billetage', href: '#fonctionnalites' },
      { label: 'ASC', href: '#fonctionnalites' },
      { label: 'Reporting', href: '#fonctionnalites' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Prise en main', href: '#etapes' },
      { label: 'Tarifs', href: '#tarifs' },
      { label: 'Avis', href: '#avis' },
      { label: 'Demander une démo', href: '#contact' },
    ],
  },
];
