import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MODULE_CATEGORIES } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-features',
  imports: [Icon, ...MOTION],
  templateUrl: './features.html',
  styleUrl: './features.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features {
  protected readonly categories = MODULE_CATEGORIES;
  protected readonly moduleCount = 27;
}
