import { Route, Routes } from '@angular/router';

export interface PageTitleName {
  firstName?: string | null;
  lastName?: string | null;
}

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

/**
 * The titles declared on a set of routes and their children, e.g. @cpp/application's
 * ERROR_PAGES_ROUTES.
 *
 * Children from loadChildren are included when it gives the routes back straight away, as
 * @cpp/application's SYSTEM_ANNOUNCEMENT_ROUTES does. A loadChildren that imports a module or
 * returns a promise is skipped, as its routes aren't known until the router loads them.
 */
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
    titles.push(...getRouteTitles(getLoadedChildren(route)));
  }

  return titles;
};

const getLoadedChildren = (route: Route): Routes => {
  const loaded = route.loadChildren?.();
  return Array.isArray(loaded) ? loaded : [];
};
