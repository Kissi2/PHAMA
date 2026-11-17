import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../data/site.data';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-testimonials',
  imports: [...MOTION],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  protected readonly items = TESTIMONIALS;
}
