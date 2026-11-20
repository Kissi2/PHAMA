import type { IconName } from '../shared/icons';

export const CONTACT_EMAIL = 'tresopharm@gmail.com';


/** Numéros de l'équipe commerciale affichés dans la bulle « Contacter l'équipe » (header et encadré de contact). À REMPLACER par les vrais numéros. */
export const SALES_PHONES = ['+225 00 00 00 00 00', '+225 00 00 00 00 01'];

export const NAV_LINKS = [
  { label: 'Produit', href: '#produit' },
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Avis', href: '#avis' },
];

/* ── Hero ─────────────────────────────────────────────────────────── */

export const HERO_TRUST = ['Plan comptable OHADA', 'Web (PWA), installable sur PC et mobile', 'Installation et formation incluses'];

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
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Installation',
    amount: '500 000',
    unit: 'FCFA',
    period: 'Obtention de licence et mise en service',
    features: ['Installation et paramétrage complets', 'Reprise de vos données existantes', "Formation de votre équipe", 'Accompagnement au démarrage'],
    featured: true,
  },
  {
    name: 'Paiement trimestriel',
    amount: '60 000',
    unit: 'FCFA / trimestre',
    period: 'Chaque 3 mois, sans engagement',
    features: ['Tous les modules inclus', '1 pharmacie, utilisateurs illimités', 'Mises à jour automatiques', 'Support prioritaire WhatsApp'],
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


export const FOOTER_COLUMNS = [
  {
    title: 'Modules',
    // Les 7 modules présentés dans la section Fonctionnalités.
    links: [FEATURE_MAIN, ...FEATURES].map((m) => ({ label: m.title, href: '#fonctionnalites' })),
  },
  {
    title: 'Ressources',
    // Mêmes onglets que le header (sans le bouton « Contacter l'équipe »).
    links: NAV_LINKS,
  },
];
