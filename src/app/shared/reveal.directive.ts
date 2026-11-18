import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        // Décalage selon la position parmi les frères (max 6 × 70 ms), comme l'original.
        const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(index, 6) * 70 + 'ms';
        el.classList.add('in');
        observer!.unobserve(el);
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  return observer;
}

/** Compteur animé (1,2 s, easing cubique) ; ignoré si l'utilisateur réduit les animations. */
function countUp(el: HTMLElement): void {
  const target = Number(el.dataset['count']) || 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let start: number | null = null;
  const frame = (ts: number) => {
    start ??= ts;
    const p = Math.min((ts - start) / 1200, 1);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/**
 * Apparition au défilement : tout élément portant la classe `rv` reçoit `in`
 * lorsqu'il entre dans la fenêtre, puis lance les compteurs `[data-count]` qu'il contient.
 */
@Directive({ selector: '.rv' })
export class Reveal implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.el.classList.add('in');
      return;
    }
    getObserver().observe(this.el);
  }

  ngOnDestroy(): void {
    observer?.unobserve(this.el);
  }
}
