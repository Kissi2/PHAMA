import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PLANS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-pricing',
  imports: [Icon, ...MOTION],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  protected readonly plans = PLANS;
}
