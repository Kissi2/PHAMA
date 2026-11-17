import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_EMAIL } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-cta',
  imports: [Icon, ...MOTION],
  template: `
    <section class="section pg-cta-band" id="contact">
      <div class="container-x cta-grid">
        <div>
          <h2 class="pg-cta-title reveal">PRÊT À MAÎTRISER<br />VOTRE TRÉSORERIE ?</h2>
          <p class="pg-cta-sub reveal">Demandez une démonstration gratuite. Mise en place en une journée.</p>
        </div>
        <div class="reveal">
          <a [href]="'mailto:' + email" class="btn btn-dark">
            Contacter l'équipe
            <i><svg appIcon="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg></i>
          </a>
          <div class="cta-note">Réponse sous 24h</div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .pg-cta-band { background: var(--pg-amber); }
    .cta-grid { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 32px; }
    @media (max-width:640px) { .cta-grid { grid-template-columns: 1fr; } }
    .pg-cta-title { font-size: clamp(32px,5vw,60px); font-weight: 800; text-transform: uppercase; letter-spacing: -.03em; color: var(--pg-amber-on); line-height: .95; }
    .pg-cta-sub { font-size: 16px; color: color-mix(in srgb, var(--pg-amber-on) 70%, transparent); margin-top: 16px; }
    .cta-note { margin-top: 12px; font-size: 13px; color: color-mix(in srgb, var(--pg-amber-on) 55%, transparent); text-align: center; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {
  protected readonly email = CONTACT_EMAIL;
}
