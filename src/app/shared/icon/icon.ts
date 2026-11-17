import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'arrow-down'
  | 'check'
  | 'clipboard'
  | 'file'
  | 'pulse'
  | 'register'
  | 'bars'
  | 'grid'
  | 'users';

/**
 * Icônes SVG (tracé 24×24). S'utilise sur un élément <svg> :
 * `<svg appIcon="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg>`
 */
@Component({
  selector: 'svg[appIcon]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (appIcon()) {
      @case ('arrow-right') { <svg:path d="M5 12h14M13 6l6 6-6 6" /> }
      @case ('arrow-down') { <svg:path d="M12 5v14M6 13l6 6 6-6" /> }
      @case ('check') { <svg:path d="M20 6L9 17l-5-5" /> }
      @case ('clipboard') {
        <svg:path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      }
      @case ('file') {
        <svg:path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <svg:polyline points="14 2 14 8 20 8" />
        <svg:line x1="16" y1="13" x2="8" y2="13" />
        <svg:line x1="16" y1="17" x2="8" y2="17" />
      }
      @case ('pulse') { <svg:polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> }
      @case ('register') {
        <svg:rect x="2" y="7" width="20" height="14" rx="2" />
        <svg:path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      }
      @case ('bars') { <svg:path d="M18 20V10M12 20V4M6 20v-6" /> }
      @case ('grid') {
        <svg:rect x="3" y="3" width="18" height="18" rx="2" />
        <svg:path d="M3 9h18M9 21V9" />
      }
      @case ('users') {
        <svg:path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <svg:circle cx="9" cy="7" r="4" />
        <svg:path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      }
    }
  `,
})
export class Icon {
  readonly appIcon = input.required<IconName>();
}
