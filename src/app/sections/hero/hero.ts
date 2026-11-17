import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_META } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-hero',
  imports: [Icon, ...MOTION],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly meta = HERO_META;
}
