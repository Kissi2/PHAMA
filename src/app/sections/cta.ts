import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SALES_PHONES } from '../data/site.data';
import { PillModal } from '../shared/pill-modal';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [PillModal, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta section" id="contact" style="background:var(--canvas);padding-top:0">
      <div class="container">
        <div class="cta-box rv">
          <div>
            <h2>Prêt à maîtriser votre trésorerie ?</h2>
            <p>Demandez une démonstration gratuite. Installation, formation de votre équipe et accompagnement au démarrage inclus.</p>
          </div>
          <div class="cta-actions">
            <button type="button" class="btn btn-primary" aria-haspopup="dialog" (click)="team.open()">Contacter l'équipe</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Bulle « Contacter l'équipe » : numéros de l'équipe commerciale -->
    <app-pill-modal #team title="Équipe commerciale" [phone]="phones" />
  `,
})
export class Cta {
  protected readonly phones = SALES_PHONES;
}
