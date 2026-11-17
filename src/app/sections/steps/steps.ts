import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STEPS } from '../../data/site.data';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-steps',
  imports: [...MOTION],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Steps {
  protected readonly steps = STEPS;

  protected num(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
