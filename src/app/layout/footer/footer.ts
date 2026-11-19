import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_EMAIL, FOOTER_COLUMNS, PLATFORMS } from '../../data/site.data';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="foot-grid">
          <div>
            <a href="#" class="logo" aria-label="TresoPharm — accueil"><img class="logo-img" src="logo-mark.png" alt="" /><span class="logo-name">Treso<span>Pharm</span></span></a>
            <p>Application de gestion financière et de trésorerie pour les pharmacies en Côte d'Ivoire. Développée par e-sphere.</p>
            <div class="dl-row">
              @for (p of platforms; track p) {
                <span class="dl-btn"><lucide-icon name="layout-dashboard" />{{ p }}</span>
              }
            </div>
          </div>

          @for (col of columns; track col.title) {
            <div>
              <div class="foot-h">{{ col.title }}</div>
              @for (link of col.links; track link.label) {
                <a [href]="link.href" class="fl">{{ link.label }}</a>
              }
            </div>
          }

          <div>
            <div class="foot-h">Contact</div>
            <span class="fl">e-sphere</span>
            <span class="fl">Abidjan, Côte d'Ivoire</span>
            <a [href]="'mailto:' + email" class="fl" style="word-break:break-all">{{ email }}</a>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2026 e-sphere · TresoPharm. Tous droits réservés.</span>
          <span>e-Pharma · Gestion de trésorerie pour pharmacies</span>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly columns = FOOTER_COLUMNS;
  protected readonly platforms = PLATFORMS;
  protected readonly email = CONTACT_EMAIL;
}
