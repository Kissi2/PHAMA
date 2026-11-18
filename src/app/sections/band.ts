import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BAND_ITEMS } from '../data/site.data';

@Component({
  selector: 'app-band',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="band" aria-hidden="true">
      <div class="marquee">
        <!-- Liste doublée : le défilement translateX(-50 %) boucle sans couture -->
        @for (item of loop; track $index) {
          <span>{{ item }}</span>
        }
      </div>
    </div>
  `,
})
export class Band {
  protected readonly loop = [...BAND_ITEMS, ...BAND_ITEMS];
}
