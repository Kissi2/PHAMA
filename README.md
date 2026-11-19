# TresoPharm — site vitrine

Landing page de **TresoPharm**, l'application de gestion de trésorerie pour les pharmacies en Côte d'Ivoire, développée par e-sphere.

- Angular 21 (composants autonomes, `OnPush`), une seule feuille de style globale : `src/styles.css`
- Icônes : `lucide-angular` (liste des icônes embarquées : `src/app/shared/icons.ts`)
- Hébergement : Vercel, relié au dépôt GitHub. Chaque push sur `main` est déployé automatiquement.

## Lancer et construire

```bash
npm install
npm start          # http://localhost:4200
npm run build      # sortie dans dist/le-tresorier/browser
```

## Où modifier quoi

| Contenu | Fichier |
|---|---|
| Textes, chiffres, tarifs, avis, liens du pied de page, numéros et e-mail de contact | `src/app/data/site.data.ts` |
| Sections de la page (hero, fonctionnalités, tarifs…) | `src/app/sections/` |
| Header, pied de page | `src/app/layout/` |
| Bulle « Contacter l'équipe » | `src/app/shared/pill-modal.ts` |
| Intro d'ouverture (logo + « TresoPharm » tapé), balises de partage | `src/index.html` |
| Capture du tableau de bord et son animation au défilement | `public/dashboard.webp`, `src/app/sections/dashboard-preview.ts` |
| Image d'aperçu des partages (1200 × 630) | `public/og-image.png` |

## À savoir

- **Intro :** jouée une fois par visite (onglet), sautée si l'utilisateur a désactivé les animations. Angular démarre après elle (`src/main.ts`).
- **Capture du tableau de bord :** si vous la remplacez, changez aussi le numéro `?v=` de `dashboard.webp` dans `dashboard-preview.ts`, pour que les navigateurs ne gardent pas l'ancienne en cache.
- **Branche :** tout se fait sur `main`.
