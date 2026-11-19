import {
  Activity, Banknote, ChartNoAxesColumn, Check,
  CircleCheck, CircleX, ClipboardList, FileText, LayoutDashboard, Menu, PanelsTopLeft,
  Users, X,
} from 'lucide-angular';

/**
 * Icônes Lucide utilisées sur le site (https://lucide.dev/icons).
 * Seules celles-ci sont embarquées dans le bundle ; s'utilisent par nom : `<lucide-icon name="check" />`.
 */
export const ICONS = {
  Activity, Banknote, ChartNoAxesColumn, Check,
  CircleCheck, CircleX, ClipboardList, FileText, LayoutDashboard, Menu, PanelsTopLeft,
  Users, X,
};

/** Noms (kebab-case) des icônes référencées depuis les données. */
export type IconName =
  | 'activity' | 'banknote' | 'chart-no-axes-column' | 'clipboard-list' | 'file-text'
  | 'layout-dashboard' | 'panels-top-left' | 'users';
