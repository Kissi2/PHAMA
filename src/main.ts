import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

declare global {
  interface Window {
    /** Résolue à la fin de l'intro d'ouverture (index.html), ou tout de suite si elle est passée/désactivée. */
    __intro?: Promise<void>;
    __introHide?: () => void;
  }
}

// Angular démarre après l'intro : les animations du site (hero, tableau de bord…) se jouent
// sous les yeux du visiteur et non derrière l'écran d'intro. L'intro s'efface une fois le site rendu.
(window.__intro ?? Promise.resolve())
  .then(() => bootstrapApplication(App, appConfig))
  .then(() => requestAnimationFrame(() => window.__introHide?.()))
  .catch((err) => console.error(err));
