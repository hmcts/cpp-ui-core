import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CPP_PAGE_TITLE_OPTIONS, CppPageTitleOptions } from './options';
import { PageTitleStrategy } from './strategy';

/**
 * Sets the browser tab title on every navigation, as
 * "<information> – <page title> – Common Platform – HMCTS" by default.
 * This should only be provided once, when the app is bootstrapped.
 * See CppPageTitleOptions for what completeTitleRoutes is for.
 */
export const provideCppPageTitle = (options: CppPageTitleOptions): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: CPP_PAGE_TITLE_OPTIONS,
      useValue: options
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy
    }
  ]);
};
