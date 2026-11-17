import { CountUpDirective } from './count-up.directive';
import { RevealDirective } from './reveal.directive';
import { StaggerDirective } from './stagger.directive';

export { CountUpDirective, RevealDirective, StaggerDirective };

/** Directives d'animation à importer dans chaque section. */
export const MOTION = [RevealDirective, StaggerDirective, CountUpDirective] as const;
