import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_EMAIL, FOOTER_COLUMNS } from '../../data/site.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly columns = FOOTER_COLUMNS;
  protected readonly email = CONTACT_EMAIL;
  protected readonly year = 2026;
}
