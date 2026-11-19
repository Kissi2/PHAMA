import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_TRUST } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';
import { DashboardPreview } from './dashboard-preview';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, Reveal, DashboardPreview],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero on-dark" id="produit">
      <div class="container">
        <div class="hero-inner">
          <h1 class="rv">Pilotez la trésorerie de votre pharmacie avec <span class="hl">précision</span></h1>
          <p class="hero-sub rv"> Un Journal de trésorerie, caisses, factures  et fournisseurs, réunis dans un seul outil pensé pour les pharmacies en Côte d'Ivoire.</p>
          <div class="hero-trust rv">
            @for (item of trust; track item) {
              <span><lucide-icon name="check" [strokeWidth]="2.4" />{{ item }}</span>
            }
          </div>
        </div>

        <div class="showcase">
          <div appDashboardPreview></div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly trust = HERO_TRUST;
}
