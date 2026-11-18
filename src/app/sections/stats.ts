import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-stats',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="chiffres" style="padding-bottom:0">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">En chiffres</span>
          <h2>Un outil conçu pour le terrain.</h2>
        </div>
        <div class="stats rv">
          @for (s of stats; track s.label) {
            <div class="stat">
              <div class="stat-n" [attr.data-count]="s.count ?? null">{{ s.value }}</div>
              <div class="stat-l">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Stats {
  protected readonly stats = STATS;
}
