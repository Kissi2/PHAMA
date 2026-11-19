import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { NAV_LINKS, SALES_PHONES } from '../../data/site.data';
import { PillModal } from '../../shared/pill-modal';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, PillModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <header class="header" [class.scrolled]="scrolled()">
      <div class="container nav">
        <a href="#" class="logo" aria-label="TresoPharm — accueil"><img class="logo-img" src="logo-mark.png" alt="" /><span class="logo-name">Treso<span>Pharm</span></span></a>
        <nav class="nav-links" aria-label="Navigation principale">
          @for (link of links; track link.href) {
            <a [href]="link.href" [class.active]="active() === link.href" [attr.aria-current]="active() === link.href ? 'location' : null">{{ link.label }}</a>
          }
        </nav>
        <div class="nav-cta">
          <button type="button" class="btn btn-primary btn-sm" aria-haspopup="dialog" (click)="sales.open()">Contacter l'équipe</button>
          <button
            class="burger"
            aria-label="Ouvrir le menu"
            aria-controls="mobile-menu"
            [attr.aria-expanded]="open()"
            (click)="open.set(!open())"
          >
            <lucide-icon name="menu" [size]="22" />
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" [class.open]="open()">
      @for (link of links; track link.href) {
        <a [href]="link.href" [class.active]="active() === link.href" [attr.aria-current]="active() === link.href ? 'location' : null" (click)="open.set(false)">{{ link.label }}</a>
      }
      <button type="button" class="btn btn-primary" aria-haspopup="dialog" (click)="open.set(false); sales.open()">Contacter l'équipe</button>
    </div>

    <!-- Même modale gélule que l'encadré de contact : numéros de l'équipe commerciale -->
    <app-pill-modal #sales title="Équipe commerciale" [phone]="phones" />
  `,
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly phones = SALES_PHONES;
  protected readonly scrolled = signal(typeof window !== 'undefined' && window.scrollY > 20);
  protected readonly open = signal(false);

  /** Onglet de la section en cours de lecture (ex. '#tarifs'), mis en évidence dans le header. */
  protected readonly active = signal<string | null>(null);

  constructor() {
    afterNextRender(() => this.updateActive());
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    this.updateActive();
  }

  /**
   * La section active est la dernière dont le haut a dépassé le tiers supérieur de l'écran.
   * Les sections intermédiaires (chiffres, avant/après, étapes…) gardent l'onglet précédent.
   */
  private updateActive(): void {
    const mark = window.innerHeight / 3;
    let current: string | null = null;
    for (const link of this.links) {
      const section = document.querySelector(link.href);
      if (section && section.getBoundingClientRect().top <= mark) current = link.href;
    }
    this.active.set(current);
  }
}
