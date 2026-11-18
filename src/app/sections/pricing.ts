import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLANS, SALES_PHONES } from '../data/site.data';
import { PillModal } from '../shared/pill-modal';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-pricing',
  imports: [LucideAngularModule, PillModal, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="tarifs">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Tarifs</span>
          <h2>Un abonnement, zéro surprise.</h2>
          <p>Tous les modules inclus dès le premier plan. Aucun module payant en supplément.</p>
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
              @if (plan.contact) {
                <button type="button" class="btn btn-block" [class.btn-primary]="plan.featured" [class.btn-outline]="!plan.featured" aria-haspopup="dialog" (click)="contact.open()">{{ plan.cta }}</button>
              } @else {
                <a href="#contact" class="btn btn-block" [class.btn-primary]="plan.featured" [class.btn-outline]="!plan.featured">{{ plan.cta }}</a>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- « Demander l'installation » : modale gélule de l'équipe commerciale -->
    <app-pill-modal #contact title="Équipe commerciale" [phone]="phones" hours="Du lundi au vendredi, 8 h – 18 h" />
  `,
})
export class Pricing {
  protected readonly plans = PLANS;
  protected readonly phones = SALES_PHONES;
}
