import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

export interface CppPageTitleOptions {
  /** Added after the page title. Default 'Common Platform – HMCTS'. */
  suffix?: string;
  /**
   * Routes whose titles are already complete. The tab shows their title exactly as it is, with no
   * suffix added.
   *
   * This exists for the shared routes from @cpp/application (cpp-ui-pdk2), such as
   * ERROR_PAGES_ROUTES and SYSTEM_ANNOUNCEMENT_ROUTES. Their titles already end in their own
   * "| Common platform", so adding the suffix as well would read
   * "Page not found | Common platform – Common Platform – HMCTS".
   *
   * Core can't import @cpp/application to find these itself, as @cpp/application depends on core,
   * so each app passes in the routes it registers. Passing the routes, rather than a list of
   * titles, means the titles always match the installed version of @cpp/application.
   *
   * Required so that every app makes a choice here. Pass an empty array if the app has none.
   *
   * @example
   * provideCppPageTitle({
   *   completeTitleRoutes: [...ERROR_PAGES_ROUTES, ...SYSTEM_ANNOUNCEMENT_ROUTES]
   * })
   */
  completeTitleRoutes: Routes;
}

export const CPP_PAGE_TITLE_OPTIONS = new InjectionToken<CppPageTitleOptions>(
  'CPP_PAGE_TITLE_OPTIONS'
);
