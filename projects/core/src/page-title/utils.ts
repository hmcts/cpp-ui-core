import { Routes } from '@angular/router';
import { CPP_APPLICATION_PAGE_TITLES } from './cpp-application-titles';

export interface PageTitleName {
  firstName?: string | null;
  lastName?: string | null;
}

export interface PageTitleFormat {
  separator?: string;
  suffix?: string[];
  completeTitles?: string[];
}

/** En dash with spaces, as the GOV.UK Design System uses in page titles. */
export const DEFAULT_PAGE_TITLE_SEPARATOR = ' – ';

export const DEFAULT_PAGE_TITLE_SUFFIX = ['Common Platform', 'HMCTS'];

// People become "Surname I". Organisations only have a firstName, so they are used as-is.
export const formatNameForTitle = (name?: PageTitleName | null): string => {
  const firstName = (name?.firstName || '').trim();
  const lastName = (name?.lastName || '').trim();
  const initial = firstName.charAt(0).toUpperCase();

  if (lastName) {
    return initial ? `${lastName} ${initial}` : lastName;
  }

  return firstName;
};

// Only the lead name goes in the tab, otherwise it gets too long
export const formatDefendantNamesForTitle = (names: PageTitleName[] | null = []): string =>
  formatNameForTitle((names || [])[0]);

export interface PageTitleParts {
  /** The page's own title, from the route. */
  pageTitle?: string;
  /** The lead defendant, already formatted, e.g. "Smith J". */
  defendantName?: string;
  /** The reference shown in the page header, e.g. the case URN. */
  reference?: string;
}

// "<defendantName> – <reference> – <pageTitle> – Common Platform – HMCTS", leaving out any part
// that is empty. Route titles are used as they are, apart from complete titles, which get no suffix.
export const buildPageTitle = (
  { pageTitle = '', defendantName = '', reference = '' }: PageTitleParts,
  format: PageTitleFormat = {}
): string => {
  const {
    separator = DEFAULT_PAGE_TITLE_SEPARATOR,
    suffix = DEFAULT_PAGE_TITLE_SUFFIX,
    completeTitles = CPP_APPLICATION_PAGE_TITLES
  } = format;
  const title = (pageTitle || '').trim();
  const isComplete = completeTitles.includes(title);

  return [defendantName, (reference || '').trim(), title, ...(isComplete ? [] : suffix)]
    .filter(Boolean)
    .join(separator);
};

// The titles declared on a set of routes and their children, e.g. @cpp/application's ERROR_PAGES_ROUTES
export const getRouteTitles = (routes: Routes = []): string[] => {
  const titles: string[] = [];

  for (const route of routes) {
    if (typeof route.title === 'string') {
      titles.push(route.title);
    }
    if (typeof route.data?.['title'] === 'string') {
      titles.push(route.data['title']);
    }
    titles.push(...getRouteTitles(route.children));
  }

  return titles;
};
