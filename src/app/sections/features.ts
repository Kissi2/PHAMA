import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEATURES, FEATURE_MAIN } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-features',
  imports: [LucideAngularModule, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="fonctionnalites" style="background:var(--canvas)">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Modules &amp; fonctionnalités</span>
          <h2>Tout ce dont votre pharmacie a besoin, dans un seul outil.</h2>
          <p>27 modules organisés en 7 domaines métier, pensés pour la réalité des pharmacies en Côte d'Ivoire.</p>
        </div>
        <div class="feat-grid">
          <div class="feat wide rv">
            <div class="feat-ic"><lucide-icon [name]="main.icon" /></div>
            <div>
              <h3>{{ main.title }}</h3>
              <p style="margin-top:10px;font-size:15px">{{ main.desc }}</p>
            </div>
            <ul>
              @for (item of main.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
          @for (f of features; track f.title) {
            <div class="feat rv">
              <div class="feat-ic"><lucide-icon [name]="f.icon" /></div>
              <h3>{{ f.title }}</h3>
              <ul>
                @for (item of f.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Features {
  protected readonly main = FEATURE_MAIN;
  protected readonly features = FEATURES;
}
