import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';
import { PreferencesService } from '../../core/preferences.service';

/** Compteur animé déclenché à l'affichage : `<div [appCountUp]="27">27</div>`. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly prefs = inject(PreferencesService);
  private io?: IntersectionObserver;

  readonly appCountUp = input.required<number>();
  readonly decimals = input(0);
  readonly suffix = input('');

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) return;
    this.io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this.io?.disconnect();
        this.run();
      },
      { threshold: 0.4 },
    );
    this.io.observe(this.el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private format(n: number): string {
    const d = this.decimals();
    return n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }) + this.suffix();
  }

  private run(): void {
    const to = this.appCountUp();
    if (this.prefs.reducedMotion()) {
      this.el.textContent = this.format(to);
      return;
    }
    const t0 = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      this.el.textContent = this.format(to * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
