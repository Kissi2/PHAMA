import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

/**
 * Préférences d'affichage : thème sombre et mouvement réduit.
 * Reproduit le panneau « Préférences » et la logique motion du site d'origine.
 */
@Injectable({ providedIn: 'root' })
export class PreferencesService {
  private readonly root = inject(DOCUMENT).documentElement;
  private readonly mq =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  readonly dark = signal(this.root.classList.contains('dark'));
  readonly reducedMotion = signal(!!this.mq?.matches);

  constructor() {
    this.mq?.addEventListener?.('change', (e) => this.reducedMotion.set(e.matches));

    effect(() => {
      const on = this.dark();
      this.root.classList.toggle('dark', on);
      try {
        localStorage.setItem('theme', on ? 'dark' : 'light');
      } catch {
        /* stockage indisponible */
      }
    });

    effect(() => this.root.classList.toggle('motion-off', this.reducedMotion()));
  }

  toggleDark(): void {
    this.dark.update((v) => !v);
  }

  toggleMotion(): void {
    this.reducedMotion.update((v) => !v);
  }
}
