import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from './shared/icons';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), importProvidersFrom(LucideAngularModule.pick(ICONS))],
};
