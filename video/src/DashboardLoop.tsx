/**
 * Vidéo en boucle du tableau de bord TresoPharm, posée par-dessus l'aperçu HTML du hero.
 *
 * Elle réutilise la feuille de style et les données du site : la première image est identique
 * à l'aperçu HTML une fois son intro terminée, ce qui permet au site de basculer sur la vidéo
 * sans saut visible. La dernière seconde fond la scène vers cet état initial (boucle sans couture).
 *
 * Scénario (60 i/s, 12 s) : un pointeur entre, survole la courbe (bulle de valeur), clique sur
 * « À régler » de la facture grossiste → elle passe « Payée », une vente arrive dans le tableau et
 * les 4 cadres KPI se mettent à jour ensemble ; le pointeur survole ensuite « Trésorerie » puis sort.
 */
import '../../src/styles.css';
import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';
import {
  Activity, ArrowDownRight, ArrowUpRight, Banknote, Calendar, ChartNoAxesColumn, ClipboardList, FileText,
  Landmark, LayoutDashboard, Lock, PanelsTopLeft, Users, type LucideIcon,
} from 'lucide-react';
import {
  CHART_IN, CHART_OUT, CHART_X, MOCK_KPIS, MOCK_OPERATIONS, MOCK_REGISTERS, MOCK_SIDEBAR, MOCK_SPLIT,
} from '../../src/app/data/site.data';

loadInter('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'] });
loadJakarta('normal', { weights: ['600', '700', '800'], subsets: ['latin', 'latin-ext'] });

export const FPS = 60;
export const DURATION = 12 * FPS;
export const WIDTH = 1152; // largeur de .app sur le site (desktop, = largeur du conteneur)
export const HEIGHT = 772; // hauteur de .app (771 px) arrondie au pair pour l'encodage

/** Les temps du scénario sont écrits en secondes. */
const s2f = (sec: number) => sec * FPS;

/* Géométrie mesurée sur le site (coordonnées dans .app, 1152 px de large). */
const ROW_H = 39; // hauteur d'une ligne du tableau « Dernières opérations »
const TABLE_H = 143.390625; // en-tête + 3 lignes
const CHART = { x: 251, y: 303, w: 528.5, h: 152.5 }; // <svg class="chart">
const FACTURE_TAG = { x: 886, y: 676 }; // centre du statut « À régler »
const TRESO_LINK = { x: 70, y: 277 }; // lien « Trésorerie » du menu latéral
const OUTSIDE = { x: 1185, y: 800 }; // hors champ, en bas à droite

const TH: CSSProperties = { position: 'relative', zIndex: 1, background: '#fff' }; // la nouvelle ligne glisse sous l'en-tête
const EASE = Easing.bezier(0.22, 1, 0.36, 1); // = --ease du site
const MOVE = Easing.bezier(0.45, 0, 0.2, 1); // déplacement du pointeur (départ doux, arrivée douce)

const ICONS: Record<string, LucideIcon> = {
  activity: Activity, banknote: Banknote, calendar: Calendar, 'chart-no-axes-column': ChartNoAxesColumn,
  'clipboard-list': ClipboardList, 'file-text': FileText, landmark: Landmark, 'layout-dashboard': LayoutDashboard,
  lock: Lock, 'panels-top-left': PanelsTopLeft, users: Users, 'arrow-up-right': ArrowUpRight, 'arrow-down-right': ArrowDownRight,
};

/** Équivalent de <lucide-icon> (hôte en display:block, SVG en display:block). */
const Icon = ({ name, size = 24, strokeWidth = 2 }: { name: string; size?: number; strokeWidth?: number }) => {
  const Svg = ICONS[name];
  return (
    <span style={{ display: 'block' }}>
      <Svg size={size} strokeWidth={strokeWidth} style={{ display: 'block' }} />
    </span>
  );
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
/** Progression 0 → 1 entre deux instants (secondes), avec l'easing du site. */
const prog = (f: number, a: number, b: number, easing = EASE) => interpolate(f, [s2f(a), s2f(b)], [0, 1], { ...clamp, easing });
/** Montée puis descente (0 → 1 → 0). */
const pulse = (f: number, a: number, peak: number, b: number) => interpolate(f, [s2f(a), s2f(peak), s2f(b)], [0, 1, 0], clamp);
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

const fcfa = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* ── Courbe : position (x → y) le long du tracé des encaissements ───────────────────────────── */

const CHART_PTS = (() => {
  const nums = CHART_IN.replace(/[MC]/g, ' ').trim().split(/\s+/).map(Number);
  const pts: [number, number][] = [[nums[0], nums[1]]];
  for (let i = 2; i < nums.length; i += 6) pts.push([nums[i + 4], nums[i + 5]]);
  return pts;
})();

/** Chaque segment est une Bézier à tangentes horizontales : x(t)=1.5t−1.5t²+t³, y(t)=3t²−2t³. */
function chartY(x: number): number {
  const i = Math.min(CHART_PTS.length - 2, Math.max(0, CHART_PTS.findIndex((p, k) => k > 0 && p[0] >= x) - 1));
  const [x0, y0] = CHART_PTS[i];
  const [x1, y1] = CHART_PTS[i + 1];
  const target = (x - x0) / (x1 - x0);
  let lo = 0, hi = 1;
  for (let k = 0; k < 24; k++) {
    const t = (lo + hi) / 2;
    if (1.5 * t - 1.5 * t * t + t * t * t < target) lo = t; else hi = t;
  }
  const t = (lo + hi) / 2;
  return y0 + (y1 - y0) * (3 * t * t - 2 * t * t * t);
}

/** Point de la courbe (coordonnées .app) pour une abscisse du graphique (0 → 520). */
const curvePoint = (cx: number) => ({ x: CHART.x + (cx / 520) * CHART.w, y: CHART.y + (chartY(cx) / 150) * CHART.h });

const DAYS = Array.from({ length: 31 }, (_, i) => {
  const d = new Date(2026, 9, 18 + i);
  return `${d.getDate()} ${d.getMonth() === 9 ? 'oct.' : 'nov.'}`;
});

/* ── Pointeur ────────────────────────────────────────────────────────────────────────────────── */

const HOVER_FROM = 300; // abscisse graphique de début / fin du survol de la courbe
const HOVER_TO = 505;

/** Abscisse graphique survolée à l'instant f (le pointeur glisse le long de la courbe). */
const hoverX = (f: number) => mix(HOVER_FROM, HOVER_TO, prog(f, 1.8, 4.2, MOVE));

type Pt = { x: number; y: number };
/** Trajets du pointeur : [début, fin] en secondes, point d'arrivée, courbure du trajet. */
const MOVES: { t: [number, number]; to: Pt | ((f: number) => Pt); arc: number }[] = [
  { t: [0.5, 1.6], to: () => curvePoint(HOVER_FROM), arc: -40 },
  { t: [1.8, 4.2], to: (f) => curvePoint(hoverX(f)), arc: 0 }, // suit la courbe
  { t: [4.4, 5.4], to: FACTURE_TAG, arc: 50 },
  { t: [6.2, 7.4], to: TRESO_LINK, arc: -60 },
  { t: [8.9, 9.9], to: OUTSIDE, arc: 40 },
];

function cursorAt(f: number): Pt {
  let pos: Pt = OUTSIDE;
  for (const m of MOVES) {
    const [a, b] = m.t;
    if (f < s2f(a)) return pos;
    const end = typeof m.to === 'function' ? m.to(Math.min(f, s2f(b))) : m.to;
    if (f >= s2f(b)) { pos = end; continue; }
    if (m.arc === 0) return end; // suivi direct (survol de la courbe)
    // Trajet courbe : interpolation douce + léger arc perpendiculaire (geste naturel).
    const p = prog(f, a, b, MOVE);
    const dx = end.x - pos.x, dy = end.y - pos.y, len = Math.hypot(dx, dy) || 1;
    const bow = Math.sin(Math.PI * p) * m.arc;
    return { x: mix(pos.x, end.x, p) + (-dy / len) * bow, y: mix(pos.y, end.y, p) + (dx / len) * bow };
  }
  return pos;
}

const CLICK_AT = 5.6; // clic sur « À régler »

/* Zones cliquables (coordonnées .app) : le pointeur y devient une main, comme sur un vrai site. */
const SIDE_LINK_TOPS = [104, 143, 182, 220, 259, 337, 376, 414, 492]; // liens du menu latéral (37 px de haut)
const FACTURE_ROW = { x0: 251, x1: 1113, top: 656.8, h: 39 }; // ligne « Facture grossiste » (descend d'une ligne à l'insertion)

function overClickable(f: number, { x, y }: Pt): boolean {
  if (x >= 12 && x <= 200 && SIDE_LINK_TOPS.some((t) => y >= t && y <= t + 37)) return true;
  const top = FACTURE_ROW.top + ROW_H * liveState(f).insert;
  return x >= FACTURE_ROW.x0 && x <= FACTURE_ROW.x1 && y >= top && y <= top + FACTURE_ROW.h;
}

function Cursor({ f }: { f: number }) {
  const pt = cursorAt(f);
  const hand = overClickable(f, pt);
  const press = pulse(f, CLICK_AT - 0.08, CLICK_AT, CLICK_AT + 0.12);
  const ripple = prog(f, CLICK_AT, CLICK_AT + 0.6, Easing.out(Easing.cubic));
  const showRipple = f >= s2f(CLICK_AT) && f <= s2f(CLICK_AT + 0.6);
  const opacity = Math.min(prog(f, 0.4, 0.8), 1 - prog(f, 9.5, 9.9));
  // Point actif : pointe de la flèche (5,3) ou bout de l'index (10.5,2.5) dans le viewBox 24×24.
  const [hx, hy] = hand ? [10.5, 2.5] : [5, 3];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {showRipple && (
        <div style={{
          position: 'absolute', left: FACTURE_TAG.x, top: FACTURE_TAG.y, width: 44, height: 44, marginLeft: -22, marginTop: -22,
          borderRadius: '50%', border: '2px solid rgba(47,122,69,.6)', background: 'rgba(62,164,67,.15)',
          transform: `scale(${0.3 + ripple})`, opacity: 1 - ripple,
        }} />
      )}
      <svg width="24" height="24" viewBox="0 0 24 24" style={{
        position: 'absolute', left: pt.x - hx, top: pt.y - hy, opacity, overflow: 'visible',
        transform: `scale(${1 - 0.15 * press})`, transformOrigin: `${hx}px ${hy}px`,
        filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.3))',
      }}>
        {hand ? (
          // Main (curseur « pointer ») : index tendu, blanche à contour sombre.
          <g fill="#fff" stroke="#0f1a13" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
            <path d="M10.5 2.5c-1 0-1.8.8-1.8 1.8v9.1l-1.4-1.5c-.8-.8-2-.8-2.7-.1-.7.7-.7 1.8-.1 2.6l4.3 5.4c1.1 1.4 2.6 2.1 4.3 2.1h2.6c2.8 0 5-2.2 5-5v-5c0-1-.8-1.8-1.8-1.8-.5 0-.9.2-1.2.5-.2-.8-.9-1.4-1.8-1.4-.5 0-.9.2-1.2.5-.3-.7-.9-1.2-1.7-1.2-.4 0-.8.1-1.1.4V4.3c0-1-.8-1.8-1.8-1.8z" />
            <path d="M12.3 10.6v4.2M15.3 11.2v3.6M18.2 12.1v2.7" fill="none" />
          </g>
        ) : (
          <path d="M5 3 L5 19.5 L9.3 15.4 L12.2 21.6 L15 20.3 L12.1 14.2 L18 14.2 Z" fill="#0f1a13" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        )}
      </svg>
    </div>
  );
}

/* ── Scénario ────────────────────────────────────────────────────────────────────────────────── */

const NEW_OP = { label: 'Vente comptoir', account: 'Caisse 1', date: '17/11 · 10:15', status: 'Validé', tag: 'ok', amount: '+ 185 500', positive: true };

/** Valeurs des cadres KPI avant / après la mise à jour (facture payée + nouvelle vente). */
const KPI_FROM = { solde: 48_650_000, ventes: 2_318_500, factures: 6_920_000, marge: 27.8 };
const KPI_TO = { solde: 48_650_000 - 1_245_000 + 185_500, ventes: 2_318_500 + 185_500, factures: 6_920_000 - 1_245_000, marge: 28.1 };

interface SceneState {
  tip: { x: number; opacity: number } | null; // bulle sur la courbe
  rowHover: number; // survol de la ligne facture
  paid: number; // 0 → 1 : la facture passe « Payée »
  insert: number; // 0 → 1 : arrivée de la nouvelle vente
  newGlow: number;
  kpi: number; // 0 → 1 : mise à jour simultanée des 4 cadres
  flash: number;
  caisse1: number;
  badge: number; badgePulse: number;
  sideHover: number; // survol de « Trésorerie »
}

const BASE: SceneState = {
  tip: null, rowHover: 0, paid: 0, insert: 0, newGlow: 0, kpi: 0, flash: 0, caisse1: 86, badge: 4, badgePulse: 0, sideHover: 0,
};

function liveState(f: number): SceneState {
  const paid = prog(f, CLICK_AT + 0.05, CLICK_AT + 0.3);
  const tipOpacity = Math.min(prog(f, 1.5, 1.8), 1 - prog(f, 4.2, 4.5));
  return {
    tip: tipOpacity > 0 ? { x: hoverX(f), opacity: tipOpacity } : null,
    rowHover: Math.min(prog(f, 5.0, 5.3), 1 - prog(f, 6.0, 6.6)),
    paid,
    insert: prog(f, 5.9, 6.6),
    newGlow: pulse(f, 6.0, 6.5, 8.5),
    kpi: prog(f, 5.9, 7.4),
    flash: pulse(f, 5.9, 6.2, 7.9),
    caisse1: mix(86, 91, prog(f, 5.9, 7.4)),
    badge: paid > 0.5 ? 3 : 4,
    badgePulse: pulse(f, CLICK_AT + 0.1, CLICK_AT + 0.35, CLICK_AT + 0.8),
    sideHover: Math.min(prog(f, 7.1, 7.4), 1 - prog(f, 8.9, 9.2)),
  };
}

/* ── Rendu ───────────────────────────────────────────────────────────────────────────────────── */

const donut = MOCK_SPLIT.map((d, i, all) => ({ ...d, offset: all.slice(0, i).reduce((sum, x) => sum + x.pct, 0) }));
const flashRing = (v: number, rgb: string): CSSProperties =>
  v > 0 ? { boxShadow: `0 0 0 ${2 * v}px rgba(${rgb},${0.35 * v})`, borderColor: `rgba(${rgb},${0.5 * v})` } : {};

function Dashboard({ s }: { s: SceneState }) {
  const k = s.kpi;
  const kpiValues = [
    fcfa(mix(KPI_FROM.solde, KPI_TO.solde, k)),
    fcfa(mix(KPI_FROM.ventes, KPI_TO.ventes, k)),
    fcfa(mix(KPI_FROM.factures, KPI_TO.factures, k)),
    mix(KPI_FROM.marge, KPI_TO.marge, k).toFixed(1).replace('.', ',') + ' %',
  ];
  const ops = [NEW_OP, ...MOCK_OPERATIONS];
  // Pendant l'insertion, les lignes glissent d'une hauteur de ligne et la dernière s'efface.
  const shift = (1 - s.insert) * -ROW_H;

  return (
    <div className="app in" style={{ transform: 'none', borderRadius: 0, boxShadow: 'none', height: '100%' }}>
      <div className="app-bar"><i></i><i></i><i></i>
        <div className="app-url"><Icon name="lock" />app.tresopharm.ci/tableau-de-bord</div>
      </div>
      <div className="app-body">
        <aside className="side">
          <div className="logo"><Img className="logo-img" src={staticFile('logo-mark.png')} alt="" /><span className="logo-name">Treso<span>Pharm</span></span></div>
          {MOCK_SIDEBAR.map((group, gi) => (
            <Frag key={gi}>
              {group.label && <div className="side-label">{group.label}</div>}
              {group.links.map((link) => {
                const hover = link.label === 'Trésorerie' ? s.sideHover : 0;
                return (
                  <a key={link.label} className={link.active ? 'on' : undefined}
                    style={hover > 0 ? { background: `rgba(255,255,255,${0.06 * hover})`, color: `rgba(255,255,255,${0.65 + 0.35 * hover})` } : undefined}>
                    <Icon name={link.icon} /><span>{link.label}</span>
                    {link.count && (
                      <em className="cnt" style={{ transform: `scale(${1 + 0.35 * s.badgePulse})`, boxShadow: s.badgePulse ? `0 0 0 ${5 * s.badgePulse}px rgba(244,183,62,${0.35 * s.badgePulse})` : undefined }}>
                        {s.badge}
                      </em>
                    )}
                  </a>
                );
              })}
            </Frag>
          ))}
        </aside>

        <div className="main">
          <div className="main-top">
            <div><h4>Bonjour, Dr Koné</h4><small>Pharmacie du Plateau · Mardi 17 novembre</small></div>
            <div className="chips">
              <span className="chip"><Icon name="calendar" />30 derniers jours</span>
              <span className="chip dark">Exporter</span>
              <span className="avatar">DK</span>
            </div>
          </div>

          <div className="kpis">
            {MOCK_KPIS.map((kp, i) => (
              <div key={kp.label} className="kpi" style={flashRing(s.flash, kp.amber ? '244,183,62' : '47,122,69')}>
                <div className="kpi-top">{kp.label}<span className={'kpi-ic' + (kp.amber ? ' am' : '')}><Icon name={kp.icon} /></span></div>
                <div className="kpi-val">{kpiValues[i]}{kp.unit && <small>{kp.unit}</small>}</div>
                <div className={'delta ' + kp.trend}>
                  <Icon name={kp.trend === 'up' ? 'arrow-up-right' : 'arrow-down-right'} size={12} strokeWidth={2.4} />
                  {i === 2 ? `${k > 0.5 ? 3 : 4} échéances` : kp.delta} <span>{kp.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid2">
            <div className="panel">
              <div className="panel-h"><b>Flux de trésorerie</b>
                <div className="legend"><span><i style={{ background: '#2f7a45' }}></i>Encaissements</span><span><i style={{ background: '#f4b73e' }}></i>Décaissements</span></div>
              </div>
              <div style={{ position: 'relative' }}>
                <svg className="chart" viewBox="0 0 520 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gEnc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f7a45" stopOpacity=".22" /><stop offset="1" stopColor="#2f7a45" stopOpacity="0" /></linearGradient>
                  </defs>
                  <g stroke="#eef2ef" strokeWidth="1"><line x1="0" y1="37.5" x2="520" y2="37.5" /><line x1="0" y1="75" x2="520" y2="75" /><line x1="0" y1="112.5" x2="520" y2="112.5" /></g>
                  <path d={CHART_IN + ' L520 150 L0 150 Z'} fill="url(#gEnc)" />
                  <path className="ln" d={CHART_IN} fill="none" stroke="#2f7a45" strokeWidth="2.5" strokeLinecap="round" />
                  <path className="ln" d={CHART_OUT} fill="none" stroke="#f4b73e" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1400" />
                </svg>
                {s.tip && <ChartTip x={s.tip.x} opacity={s.tip.opacity} />}
              </div>
              <div className="chart-x">{CHART_X.map((x) => <span key={x}>{x}</span>)}</div>
            </div>

            <div className="panel">
              <div className="panel-h"><b>Répartition des encaissements</b></div>
              <div className="donut-wrap">
                <div className="donut-c">
                  <svg viewBox="0 0 42 42" width="118" height="118" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="21" cy="21" r="15.9" fill="none" stroke="#eef2ef" strokeWidth="5" />
                    {donut.map((d) => (
                      <circle key={d.label} cx="21" cy="21" r="15.9" fill="none" strokeWidth="5" stroke={d.color}
                        strokeDasharray={`${d.pct} ${100 - d.pct}`} strokeDashoffset={-d.offset} />
                    ))}
                  </svg>
                  <div><span><b>64,2 M</b><br /><small>FCFA ce mois</small></span></div>
                </div>
                <ul className="dl">
                  {donut.map((d) => <li key={d.label}><i style={{ background: d.color }}></i>{d.label}<b>{d.pct} %</b></li>)}
                </ul>
              </div>
              <div className="bars">
                {MOCK_REGISTERS.map((r, i) => {
                  const pct = i === 0 ? s.caisse1 : r.pct;
                  return (
                    <div key={r.label} className="bar-row"><span>{r.label}</span>
                      <div className="bar"><span style={{ width: `${pct}%`, transition: 'none' }}></span></div><b>{Math.round(pct)} %</b>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="panel tbl-wrap">
            <div className="panel-h"><b>Dernières opérations</b><span className="chip">Tout voir</span></div>
            <div style={{ overflow: 'hidden', height: TABLE_H }}>
              <table className="tbl">
                <thead><tr><th style={TH}>Opération</th><th style={TH}>Compte</th><th style={TH}>Date</th><th style={TH}>Statut</th><th style={TH} className="r">Montant</th></tr></thead>
                <tbody>
                  {ops.map((op, i) => {
                    // Ligne 0 = nouvelle vente (cachée au départ), ligne 3 = sortante.
                    const opacity = i === 0 ? s.insert : i === 3 ? 1 - s.insert : 1;
                    const isFacture = op.tag === 'wt';
                    const tag = isFacture && s.paid > 0.5 ? 'ok' : op.tag;
                    const status = isFacture && s.paid > 0.5 ? 'Payée' : op.status;
                    const bg = i === 0 && s.newGlow > 0 ? `rgba(62,164,67,${0.1 * s.newGlow})`
                      : isFacture && s.rowHover > 0 ? `rgba(15,26,19,${0.035 * s.rowHover})` : undefined;
                    return (
                      <tr key={op.label} style={{ transform: `translateY(${shift}px)`, opacity, background: bg }}>
                        <td>{op.label}</td>
                        <td>{op.account}</td>
                        <td>{op.date}</td>
                        <td><span className={'tag ' + tag}>{status}</span></td>
                        <td className={'r ' + (op.positive ? 'pos' : 'neg')}>{op.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Frag = ({ children }: { children: ReactNode }) => <>{children}</>;

/** Repère vertical + point + bulle qui suivent la courbe des encaissements. */
function ChartTip({ x, opacity }: { x: number; opacity: number }) {
  const y = chartY(x);
  const day = DAYS[Math.round((x / 520) * (DAYS.length - 1))];
  const amount = (1.1 + ((150 - y) / 150) * 2.9).toFixed(1).replace('.', ',');
  const left = `${(x / 520) * 100}%`;
  const top = `${(y / 150) * 100}%`;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, aspectRatio: '520 / 150', opacity, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left, top: 0, bottom: 0, width: 1, background: 'rgba(15,26,19,.18)' }} />
      <div style={{ position: 'absolute', left, top, width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: '50%', background: '#fff', boxShadow: '0 0 0 2.5px #2f7a45, 0 0 0 7px rgba(47,122,69,.15)' }} />
      <div style={{
        position: 'absolute', left, top, transform: 'translate(-100%, -50%)', marginLeft: -16, whiteSpace: 'nowrap',
        background: '#0f1a13', color: '#fff', borderRadius: 8, padding: '6px 10px', fontSize: 11.5, lineHeight: 1.35,
        boxShadow: '0 8px 20px -8px rgba(5,20,10,.5)',
      }}>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 10.5 }}>{day}</div>
        <b style={{ fontWeight: 600 }}>+ {amount} M FCFA</b>
      </div>
    </div>
  );
}

export const DashboardLoop = () => {
  const f = useCurrentFrame();
  // Dernière seconde : fondu de l'état « vivant » vers l'état initial → boucle sans couture.
  const liveOpacity = 1 - prog(f, 11, 12, Easing.inOut(Easing.quad));
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <AbsoluteFill><Dashboard s={BASE} /></AbsoluteFill>
      <AbsoluteFill style={{ opacity: liveOpacity }}><Dashboard s={liveState(f)} /></AbsoluteFill>
      <Cursor f={f} />
    </AbsoluteFill>
  );
};
