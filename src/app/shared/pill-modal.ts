import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component, ElementRef, computed, input, viewChild } from '@angular/core';

let nextId = 0;

/**
 * Modale de contact en forme de gélule : moitié verte (logo) avec le titre, moitié blanche avec le numéro.
 * S'ouvre via `open()` ; se ferme avec la croix, la touche Échap ou un clic sur le voile.
 */
@Component({
  selector: 'app-pill-modal',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dialog class="pill-modal" [attr.aria-labelledby]="titleId" (click)="onBackdrop($event)">
      <div class="capsule">
        <div class="capsule-a">
          <lucide-icon name="pill" [size]="34" />
          <span [id]="titleId">{{ title() }}</span>
        </div>
        <div class="capsule-b">
          <small>Appelez-nous</small>
          @for (p of phones(); track p.tel) {
            <a class="capsule-num" [class.multi]="phones().length > 1" [href]="'tel:' + p.tel">{{ p.label }}</a>
          }
          @if (hours()) {
            <span class="capsule-hours">{{ hours() }}</span>
          }
        </div>
      </div>
      <button type="button" class="capsule-close" aria-label="Fermer" (click)="close()">
        <lucide-icon name="x" [size]="18" />
      </button>
    </dialog>
  `,
})
export class PillModal {
  readonly title = input.required<string>();
  /** Un ou plusieurs numéros (affichés les uns sous les autres, chacun cliquable). */
  readonly phone = input.required<string | string[]>();
  readonly hours = input<string>('');

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
