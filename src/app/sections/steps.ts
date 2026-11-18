import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STEPS } from '../data/site.data';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-steps',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section steps-sec on-dark" id="etapes">
      <div class="container">
        <div class="sec-head rv">
          <span class="eyebrow">Prise en main</span>
          <h2>Opérationnel en une journée.</h2>
        </div>
        <div class="steps">
          @for (step of steps; track step.title; let i = $index) {
            <div class="step rv">
              <div class="step-n">{{ (i + 1).toString().padStart(2, '0') }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Steps {
  protected readonly steps = STEPS;
}
