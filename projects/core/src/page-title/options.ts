import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

export interface CppPageTitleOptions {
  /** Joins every part of the title. Default ' – '. */
  separator?: string;
  /** Parts added after the page title. Default ['Common Platform', 'HMCTS']. */
  suffix?: string[];
  /**
   * Routes whose titles are already complete, e.g. @cpp/application's ERROR_PAGES_ROUTES.
   * No suffix is added to their titles. Always combined with CPP_APPLICATION_PAGE_TITLES.
   */
  completeTitleRoutes?: Routes;
}

export const CPP_PAGE_TITLE_OPTIONS = new InjectionToken<CppPageTitleOptions>(
  'CPP_PAGE_TITLE_OPTIONS'
);
