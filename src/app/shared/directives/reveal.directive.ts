import { Directive, ElementRef, OnDestroy, effect, inject } from '@angular/core';
import { PreferencesService } from '../../core/preferences.service';

let sharedObserver: IntersectionObserver | null = null;

function observer(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          sharedObserver!.unobserve(e.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  );
  return sharedObserver;
}

/**
 * Apparition au défilement : tout élément portant la classe `reveal`
 * reçoit la classe `in` lorsqu'il entre dans la fenêtre.
 */
@Directive({ selector: '.reveal' })
export class RevealDirective implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly prefs = inject(PreferencesService);

  constructor() {
    effect(() => {
      if (this.prefs.reducedMotion() || !('IntersectionObserver' in window)) {
        this.el.classList.add('in');
        sharedObserver?.unobserve(this.el);
      } else if (!this.el.classList.contains('in')) {
        observer().observe(this.el);
      }
    });
  }

  ngOnDestroy(): void {
    sharedObserver?.unobserve(this.el);
  }
}
