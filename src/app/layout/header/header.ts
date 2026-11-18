import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
            <a [href]="link.href">{{ link.label }}</a>
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
        <a [href]="link.href" (click)="open.set(false)">{{ link.label }}</a>
      }
      <button type="button" class="btn btn-primary" aria-haspopup="dialog" (click)="open.set(false); sales.open()">Contacter l'équipe</button>
    </div>

    <!-- Même modale gélule que l'encadré de contact : numéros de l'équipe commerciale -->
    <app-pill-modal #sales title="Équipe commerciale" [phone]="phones" hours="Du lundi au vendredi, 8 h – 18 h" />
  `,
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly phones = SALES_PHONES;
  protected readonly scrolled = signal(typeof window !== 'undefined' && window.scrollY > 20);
  protected readonly open = signal(false);

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}
