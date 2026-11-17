import { Injectable, signal } from '@angular/core';

/** État partagé du menu mobile (le contenu principal devient inerte quand il est ouvert). */
@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
  }
}
