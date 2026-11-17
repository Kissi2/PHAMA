import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPARE } from '../../data/site.data';
import { MOTION } from '../../shared/directives';

@Component({
  selector: 'app-compare',
  imports: [...MOTION],
  templateUrl: './compare.html',
  styleUrl: './compare.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Compare {
  protected readonly before = COMPARE.before;
  protected readonly after = COMPARE.after;
}
