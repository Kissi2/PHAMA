import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MenuService } from '../../core/menu.service';
import { NAV_LINKS } from '../../data/site.data';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly menu = inject(MenuService);
  protected readonly links = NAV_LINKS;

  protected readonly scrolled = signal(false);
  protected readonly hidden = signal(false);
  protected readonly progress = signal(0);
  protected readonly active = signal('');

  private readonly burger = viewChild<ElementRef<HTMLButtonElement>>('burger');
  private lastY = 0;
  private ticking = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.lastY = window.scrollY;
      requestAnimationFrame(() => this.update());
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (!this.menu.open()) return;
    this.menu.close();
    this.burger()?.nativeElement.focus();
  }

  private update(): void {
    const y = window.scrollY;
    const doc = document.documentElement;

    this.scrolled.set(y > 24);
    this.hidden.set(y > this.lastY && y > 320);

    const max = doc.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? y / max : 0);

    // Scrollspy
    const probe = y + window.innerHeight * 0.35;
    let current = '';
    for (const link of this.links) {
      const el = document.getElementById(link.href.slice(1));
      if (el && el.offsetTop <= probe) current = link.href;
    }
    if (window.innerHeight + y >= doc.scrollHeight - 4) {
      current = this.links[this.links.length - 1].href;
    }
    this.active.set(current);

    this.lastY = y;
  }
}
