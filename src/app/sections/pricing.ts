import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLANS } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-pricing',
  imports: [LucideAngularModule, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="tarifs">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Tarifs</span>
          <h2>Un abonnement, zéro surprise.</h2>
          <p>Tous les modules sont inclus dans l'abonnement. Aucun module payant en supplément.</p>
        </div>
        <div class="price-grid">
          @for (plan of plans; track plan.name) {
            <div class="price rv" [class.featured]="plan.featured">
              <div class="price-name">{{ plan.name }}</div>
              <div class="price-amt">{{ plan.amount }} @if (plan.unit) {<small>{{ plan.unit }}</small>}</div>
              <div class="price-per">{{ plan.period }}</div>
              <ul>
                @for (feat of plan.features; track feat) {
                  <li><lucide-icon name="check" [strokeWidth]="2.4" />{{ feat }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Pricing {
  protected readonly plans = PLANS;
}
