import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PreferencesService } from '../../core/preferences.service';

@Component({
  selector: 'app-preferences-panel',
  template: `
    <details class="tweaks">
      <summary>Préférences</summary>
      <div class="tw-body">
        <label>
          Thème sombre
          <button
            role="switch"
            aria-label="Activer le thème sombre"
            [attr.aria-pressed]="prefs.dark()"
            (click)="prefs.toggleDark()"
          >
            <span class="switch"><i></i></span>
          </button>
        </label>
        <label>
          Mouvement réduit
          <button
            role="switch"
            aria-label="Réduire les animations"
            [attr.aria-pressed]="prefs.reducedMotion()"
            (click)="prefs.toggleMotion()"
          >
            <span class="switch"><i></i></span>
          </button>
        </label>
      </div>
    </details>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesPanel {
  protected readonly prefs = inject(PreferencesService);
}
