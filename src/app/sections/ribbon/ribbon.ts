import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RIBBON_ITEMS } from '../../data/site.data';

@Component({
  selector: 'app-ribbon',
  template: `
    <div class="pg-ribbon-band" aria-hidden="true">
      <div class="ribbon">
        <div>
          <!-- Liste doublée pour un défilement continu (translateX -50 %) -->
          @for (item of loop; track $index) {
            <span>{{ item }}</span><span>·</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .pg-ribbon-band { background: var(--pg-amber); padding: 0; }
    .pg-ribbon-band .ribbon > div { font-weight: 800; font-size: 14px; letter-spacing: .2em; text-transform: uppercase; color: var(--pg-amber-on); }
    .pg-ribbon-band .ribbon span { margin: 0 24px; opacity: .4; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ribbon {
  protected readonly loop = [...RIBBON_ITEMS, ...RIBBON_ITEMS];
}
