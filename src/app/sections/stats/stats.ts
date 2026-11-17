import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-stats',
  imports: [Icon, ...MOTION],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stats {
  protected readonly stats = STATS;
}
