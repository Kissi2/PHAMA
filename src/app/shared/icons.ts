import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Banknote, Calendar, ChartNoAxesColumn, Check,
  CircleCheck, CircleX, ClipboardList, FileText, Landmark, LayoutDashboard, Lock, Menu, PanelsTopLeft,
  Phone, Pill, Users, X,
} from 'lucide-angular';

/**
 * Icônes Lucide utilisées sur le site (https://lucide.dev/icons).
 * Seules celles-ci sont embarquées dans le bundle ; s'utilisent par nom : `<lucide-icon name="arrow-right" />`.
 */
export const ICONS = {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Banknote, Calendar, ChartNoAxesColumn, Check,
  CircleCheck, CircleX, ClipboardList, FileText, Landmark, LayoutDashboard, Lock, Menu, PanelsTopLeft,
  Phone, Pill, Users, X,
};

/** Noms (kebab-case) des icônes référencées depuis les données. */
export type IconName =
  | 'activity' | 'banknote' | 'chart-no-axes-column' | 'clipboard-list' | 'file-text'
  | 'landmark' | 'layout-dashboard' | 'panels-top-left' | 'users';
