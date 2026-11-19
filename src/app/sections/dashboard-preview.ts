import { LucideAngularModule } from 'lucide-angular';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import {
  CHART_IN,
  CHART_OUT,
  CHART_X,
  MOCK_KPIS,
  MOCK_OPERATIONS,
  MOCK_REGISTERS,
  MOCK_SIDEBAR,
  MOCK_SPLIT,
} from '../data/site.data';

/** Largeur de rendu de la maquette sur desktop = largeur de la vidéo (video/src/DashboardLoop.tsx). */
const APP_WIDTH = 1152;

/** Maquette décorative du tableau de bord affichée sous le hero. */
@Component({
  // Posé directement sur <div class="app"> : il doit rester enfant direct de .showcase (perspective 3D).
  selector: 'div[appDashboardPreview]',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app', '[class.in]': 'ready()', 'aria-hidden': 'true' },
  template: `
      <div class="app-bar"><i></i><i></i><i></i>
        <div class="app-url"><lucide-icon name="lock" />app.tresopharm.ci/tableau-de-bord</div>
      </div>
      <div class="app-body">
        <aside class="side">
          <div class="logo"><img class="logo-img" src="logo-mark.png" alt="" /><span class="logo-name">Treso<span>Pharm</span></span></div>
          @for (group of sidebar; track $index) {
            @if (group.label) {
              <div class="side-label">{{ group.label }}</div>
            }
            @for (link of group.links; track link.label) {
              <a [class.on]="link.active">
                <lucide-icon [name]="link.icon" /><span>{{ link.label }}</span>
                @if (link.count) {
                  <em class="cnt">{{ link.count }}</em>
                }
              </a>
            }
          }
        </aside>

        <div class="main">
          <div class="main-top">
            <div><h4>Bonjour, Dr Koné</h4><small>Pharmacie du Plateau · Mardi 17 novembre</small></div>
            <div class="chips">
              <span class="chip"><lucide-icon name="calendar" />30 derniers jours</span>
              <span class="chip dark">Exporter</span>
              <span class="avatar">DK</span>
            </div>
          </div>

          <div class="kpis">
            @for (k of kpis; track k.label) {
              <div class="kpi">
                <div class="kpi-top">{{ k.label }}<span class="kpi-ic" [class.am]="k.amber"><lucide-icon [name]="k.icon" /></span></div>
                <div class="kpi-val">{{ k.value }}@if (k.unit) {<small>{{ k.unit }}</small>}</div>
                <div class="delta" [class]="k.trend">
                  <lucide-icon [name]="k.trend === 'up' ? 'arrow-up-right' : 'arrow-down-right'" [size]="12" [strokeWidth]="2.4" />{{ k.delta }} <span>{{ k.note }}</span>
                </div>
              </div>
            }
          </div>

          <div class="grid2">
            <div class="panel">
              <div class="panel-h"><b>Flux de trésorerie</b>
                <div class="legend"><span><i style="background:#2f7a45"></i>Encaissements</span><span><i style="background:#f4b73e"></i>Décaissements</span></div>
              </div>
              <svg class="chart" viewBox="0 0 520 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gEnc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f7a45" stop-opacity=".22" /><stop offset="1" stop-color="#2f7a45" stop-opacity="0" /></linearGradient>
                </defs>
                <g stroke="#eef2ef" stroke-width="1"><line x1="0" y1="37.5" x2="520" y2="37.5" /><line x1="0" y1="75" x2="520" y2="75" /><line x1="0" y1="112.5" x2="520" y2="112.5" /></g>
                <path [attr.d]="chartIn + ' L520 150 L0 150 Z'" fill="url(#gEnc)" />
                <path class="ln" [attr.d]="chartIn" fill="none" stroke="#2f7a45" stroke-width="2.5" stroke-linecap="round" />
                <path class="ln" [attr.d]="chartOut" fill="none" stroke="#f4b73e" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1400" />
              </svg>
              <div class="chart-x">
                @for (x of chartX; track x) {
                  <span>{{ x }}</span>
                }
              </div>
            </div>

            <div class="panel">
              <div class="panel-h"><b>Répartition des encaissements</b></div>
              <div class="donut-wrap">
                <div class="donut-c">
                  <svg viewBox="0 0 42 42" width="118" height="118" style="transform:rotate(-90deg)">
                    <circle cx="21" cy="21" r="15.9" fill="none" stroke="#eef2ef" stroke-width="5" />
                    @for (s of donut; track s.label) {
                      <circle
                        cx="21" cy="21" r="15.9" fill="none" stroke-width="5"
                        [attr.stroke]="s.color"
                        [attr.stroke-dasharray]="s.pct + ' ' + (100 - s.pct)"
                        [attr.stroke-dashoffset]="-s.offset"
                      />
                    }
                  </svg>
                  <div><span><b>64,2 M</b><br /><small>FCFA ce mois</small></span></div>
                </div>
                <ul class="dl">
                  @for (s of donut; track s.label) {
                    <li><i [style.background]="s.color"></i>{{ s.label }}<b>{{ s.pct }} %</b></li>
                  }
                </ul>
              </div>
              <div class="bars">
                @for (r of registers; track r.label) {
                  <div class="bar-row"><span>{{ r.label }}</span><div class="bar"><span [style.--w]="r.pct + '%'"></span></div><b>{{ r.pct }} %</b></div>
                }
              </div>
            </div>
          </div>

          <div class="panel tbl-wrap">
            <div class="panel-h"><b>Dernières opérations</b><span class="chip">Tout voir</span></div>
            <table class="tbl">
              <thead><tr><th>Opération</th><th>Compte</th><th>Date</th><th>Statut</th><th class="r">Montant</th></tr></thead>
              <tbody>
                @for (op of operations; track op.label) {
                  <tr>
                    <td>{{ op.label }}</td>
                    <td>{{ op.account }}</td>
                    <td>{{ op.date }}</td>
                    <td><span class="tag" [class]="op.tag">{{ op.status }}</span></td>
                    <td class="r" [class.pos]="op.positive" [class.neg]="!op.positive">{{ op.amount }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Vidéo Remotion (dossier video/) : même rendu que ci-dessus, animé en boucle.
           Elle prend le relais une fois l'intro CSS terminée ; sa 1re image est identique à l'état final. -->
      <video
        #loop
        class="app-video"
        [class.on]="videoOn()"
        src="dashboard-loop.mp4?v=4"
        [muted]="true"
        loop
        playsinline
        preload="auto"
        tabindex="-1"
        (playing)="videoOn.set(true)"
      ></video>
  `,
})
export class DashboardPreview implements OnInit, OnDestroy {
  protected readonly sidebar = MOCK_SIDEBAR;
  protected readonly kpis = MOCK_KPIS;
  protected readonly chartIn = CHART_IN;
  protected readonly chartOut = CHART_OUT;
  protected readonly chartX = CHART_X;
  protected readonly registers = MOCK_REGISTERS;
  protected readonly operations = MOCK_OPERATIONS;
  /** Segments du donut : décalage = somme des parts précédentes. */
  protected readonly donut = MOCK_SPLIT.map((s, i, all) => ({
    ...s,
    offset: all.slice(0, i).reduce((sum, x) => sum + x.pct, 0),
  }));

  /** Passe à `true` pour lancer le redressement 3D, le tracé des courbes et les barres. */
  protected readonly ready = signal(false);
  /** Passe à `true` quand la vidéo joue : elle apparaît alors par-dessus la maquette HTML. */
  protected readonly videoOn = signal(false);

  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('loop');
  private readonly host = inject(ElementRef<HTMLElement>);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private observer?: IntersectionObserver;
  private resize?: ResizeObserver;
  /** La vidéo a pris le relais de la maquette HTML. */
  private started = false;
  private visible = false;

  ngOnInit(): void {
    this.fitToShowcase();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduced) {
      // Pas d'animation : maquette HTML statique, sans vidéo.
      this.ready.set(true);
      return;
    }

    // Tout se déclenche quand le tableau de bord arrive à l'écran (au moins 20 % visible) :
    // intro CSS (redressement 3D, tracé des courbes, barres) puis vidéo Remotion en boucle.
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visible = entry.intersectionRatio >= 0.2;
        if (this.visible && !this.ready()) {
          this.ready.set(true);
          // L'intro dure ≈ 2,7 s ; la 1re image de la vidéo est identique à son état final.
          this.timers.push(setTimeout(() => { this.started = true; this.syncPlayback(); }, 2900));
        } else {
          this.syncPlayback();
        }
      },
      { threshold: [0, 0.2] },
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
    this.observer?.disconnect();
    this.resize?.disconnect();
  }

  /**
   * Sur desktop, la maquette est dessinée à sa largeur d'origine (APP_WIDTH, celle de la vidéo Remotion)
   * puis réduite en bloc (zoom) pour tenir dans .showcase (largeur du conteneur, du logo au bouton « Contacter l'équipe »).
   * Ainsi la vidéo garde ses proportions : rien n'est rogné, tout est simplement plus petit.
   */
  private fitToShowcase(): void {
    const host = this.host.nativeElement as HTMLElement;
    const showcase = host.parentElement;
    if (!showcase || !('ResizeObserver' in window)) return;
    this.resize = new ResizeObserver(() => {
      const k = Math.min(1, showcase.clientWidth / APP_WIDTH);
      host.style.setProperty('--app-k', k.toFixed(4));
    });
    this.resize.observe(showcase);
  }

  /** Lecture quand c'est visible ; hors écran, pause et retour au début pour revoir toute la scène au prochain passage. */
  private syncPlayback(): void {
    const v = this.video().nativeElement;
    if (!this.started) return;
    if (this.visible) {
      // Propriété (et pas seulement attribut) muette : sinon Chrome/Safari bloquent la lecture automatique.
      v.muted = true;
      v.play().catch(() => { /* lecture auto refusée : la maquette HTML reste affichée */ });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }
}
