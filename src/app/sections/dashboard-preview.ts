import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Capture du vrai tableau de bord TresoPharm affichée sous le hero.
 *
 * Animation reprise du modèle 21st.dev « Treasury Management Fintech Landing Page » :
 * - à l'arrivée, le bloc monte de 140 px en apparaissant (CSS, `.showcase`) ;
 * - au défilement, l'écran est « couché » (rotateX 40°, échelle 0,86 : plus marqué que le modèle, 24° / 0,9)
 *   et se redresse jusqu'à plat entre le moment où son haut atteint le bas de l'écran et celui où il atteint 15 %
 *   (20° / 0,94 / 40 % sous 900 px), avec un léger lissage comme le `scrub: 0.7` de GSAP.
 */
@Component({
  // Posé directement sur <div class="app"> : il doit rester enfant direct de .showcase (perspective 3D).
  selector: 'div[appDashboardPreview]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app' },
  template: `
    <img
      src="dashboard.webp"
      width="2876"
      height="1420"
      alt="Tableau de bord TresoPharm : soldes bancaires et de caisse, factures en attente, activité commerciale"
      fetchpriority="high"
      decoding="async"
    />
  `,
})
export class DashboardPreview implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private current = 0;
  private target = 0;
  private last = 0;
  private raf = 0;
  private wide = true;
  private readonly onScroll = () => this.update();

  ngOnInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    addEventListener('scroll', this.onScroll, { passive: true });
    addEventListener('resize', this.onScroll);
    this.target = this.progress();
    this.current = this.target;
    this.apply();
  }

  ngOnDestroy(): void {
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.raf);
  }

  /** 0 = couché, 1 = à plat, selon la position du haut de .showcase dans l'écran. */
  private progress(): number {
    const wrap = this.host.nativeElement.parentElement ?? this.host.nativeElement;
    this.wide = innerWidth >= 900;
    const top = wrap.getBoundingClientRect().top;
    const start = innerHeight;
    const end = innerHeight * (this.wide ? 0.15 : 0.4);
    return Math.min(1, Math.max(0, (start - top) / (start - end)));
  }

  private update(): void {
    this.target = this.progress();
    if (!this.raf) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  private readonly tick = (now: number) => {
    const dt = now - this.last;
    this.last = now;
    // Rattrapage exponentiel (≈ 0,7 s pour arriver), comme scrub: 0.7.
    this.current += (this.target - this.current) * (1 - Math.exp(-dt / 230));
    if (Math.abs(this.target - this.current) < 0.0005) this.current = this.target;
    this.apply();
    this.raf = this.current === this.target ? 0 : requestAnimationFrame(this.tick);
  };

  private apply(): void {
    const p = this.current;
    const rx = (this.wide ? 40 : 20) * (1 - p);
    const s = (this.wide ? 0.86 : 0.94) + (this.wide ? 0.14 : 0.06) * p;
    const y = (this.wide ? -10 : 0) * (1 - p);
    this.host.nativeElement.style.transform = `translateY(${y.toFixed(2)}px) rotateX(${rx.toFixed(3)}deg) scale(${s.toFixed(4)})`;
  }
}
