import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Band } from './sections/band';
import { Compare } from './sections/compare';
import { Cta } from './sections/cta';
import { Features } from './sections/features';
import { Hero } from './sections/hero';
import { Pricing } from './sections/pricing';
import { Stats } from './sections/stats';
import { Steps } from './sections/steps';
import { Testimonials } from './sections/testimonials';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Band, Stats, Compare, Features, Steps, Pricing, Testimonials, Cta, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#main" class="skip">Aller au contenu</a>
    <app-header />
    <main id="main">
      <app-hero />
      <app-band />
      <app-stats />
      <app-compare />
      <app-features />
      <app-steps />
      <app-pricing />
      <app-testimonials />
      <app-cta />
    </main>
    <app-footer />
  `,
})
export class App {}
