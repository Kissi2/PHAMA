import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component, ElementRef, computed, input, viewChild } from '@angular/core';

let nextId = 0;

/**
 * Modale de contact en forme de bulle de conversation, avec seulement les numéros (chacun cliquable).
 * S'ouvre via `open()` ; se ferme avec la croix, la touche Échap ou un clic sur le voile.
 */
@Component({
  selector: 'app-pill-modal',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dialog class="pill-modal" [attr.aria-labelledby]="titleId" (click)="onBackdrop($event)">
      <!-- Bulle de conversation : uniquement les numéros (le titre reste pour les lecteurs d'écran). -->
      <div class="bubble">
        <span class="sr-only" [id]="titleId">{{ title() }}</span>
        @for (p of phones(); track p.tel) {
          <a class="bubble-num" [href]="'tel:' + p.tel">{{ p.label }}</a>
        }
        <button type="button" class="bubble-close" aria-label="Fermer" (click)="close()">
          <lucide-icon name="x" [size]="14" />
        </button>
      </div>
    </dialog>
  `,
})
export class PillModal {
  readonly title = input.required<string>();
  /** Un ou plusieurs numéros (affichés les uns sous les autres, chacun cliquable). */
  readonly phone = input.required<string | string[]>();

  protected readonly titleId = `pill-title-${nextId++}`;
  protected readonly phones = computed(() =>
    ([] as string[]).concat(this.phone()).map((label) => ({ label, tel: label.replace(/\s+/g, '') })),
  );
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  /** Un clic sur le voile (cible = le <dialog> lui-même) ferme la modale. */
  protected onBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
