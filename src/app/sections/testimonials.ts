import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-testimonials',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="avis" style="background:var(--canvas)">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Avis</span>
          <h2>Ce qu'en disent les pharmaciens.</h2>
        </div>
        <div class="testi-grid">
          @for (t of items; track t.name) {
            <figure class="testi rv" style="margin:0">
              <p>{{ t.quote }}</p>
              <figcaption class="who">
                <span class="avatar">{{ t.initials }}</span>
                <div><b>{{ t.name }}</b><small>{{ t.role }}</small></div>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly items = TESTIMONIALS;
}
