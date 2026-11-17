import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from './core/menu.service';
import { PreferencesService } from './core/preferences.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { PreferencesPanel } from './layout/preferences-panel/preferences-panel';
import { Compare } from './sections/compare/compare';
import { Cta } from './sections/cta/cta';
import { Features } from './sections/features/features';
import { Hero } from './sections/hero/hero';
import { Pricing } from './sections/pricing/pricing';
import { Ribbon } from './sections/ribbon/ribbon';
import { Stats } from './sections/stats/stats';
import { Steps } from './sections/steps/steps';
import { Testimonials } from './sections/testimonials/testimonials';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Ribbon,
    Stats,
    Compare,
    Features,
    Steps,
    Pricing,
    Testimonials,
    Cta,
    Footer,
    PreferencesPanel,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly menu = inject(MenuService);
  // Instancié dès le démarrage pour appliquer thème et mouvement réduit.
  private readonly prefs = inject(PreferencesService);
}
