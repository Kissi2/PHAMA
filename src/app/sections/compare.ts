import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPARE_AFTER, COMPARE_BEFORE } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-compare',
  imports: [LucideAngularModule, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="comparer">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Avant / Après</span>
          <h2>Ce que ça change, concrètement.</h2>
        </div>
        <div class="compare">
          <div class="cmp cmp-before rv">
            <h3>Sans TresoPharm</h3>
            <ul>
              @for (item of before; track item) {
                <li><lucide-icon name="circle-x" />{{ item }}</li>
              }
            </ul>
          </div>
          <div class="cmp cmp-after rv">
            <h3>Avec TresoPharm</h3>
            <ul>
              @for (item of after; track item) {
                <li><lucide-icon name="circle-check" />{{ item }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Compare {
  protected readonly before = COMPARE_BEFORE;
  protected readonly after = COMPARE_AFTER;
}
