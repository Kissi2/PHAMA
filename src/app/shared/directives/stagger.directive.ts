import { AfterViewInit, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Décale l'apparition des enfants `.reveal` directs :
 * `<div appStagger="0.1">` → --d: 0s, 0.1s, 0.2s…
 */
@Directive({ selector: '[appStagger]' })
export class StaggerDirective implements AfterViewInit {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly appStagger = input<string | number>(0.08);

  ngAfterViewInit(): void {
    const step = Number(this.appStagger()) || 0.08;
    this.el.querySelectorAll<HTMLElement>(':scope > .reveal').forEach((child, i) => {
      if (!child.style.getPropertyValue('--d')) {
        child.style.setProperty('--d', `${(i * step).toFixed(2)}s`);
      }
    });
  }
}
