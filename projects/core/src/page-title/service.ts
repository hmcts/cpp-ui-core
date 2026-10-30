import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CPP_PAGE_TITLE_OPTIONS, CppPageTitleOptions } from './options';
import { CPP_APPLICATION_PAGE_TITLES } from './cpp-application-titles';
import {
  buildPageTitle,
  formatDefendantNamesForTitle,
  getRouteTitles,
  PageTitleFormat,
  PageTitleName
} from './utils';

/**
 * Owns the browser tab title. The page title comes from the router (PageTitleStrategy) and the
 * defendant names and reference come from the app's page header, so the tab always matches what
 * the header shows.
 */
@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private readonly title = inject(Title);
  private readonly format = toPageTitleFormat(
    inject(CPP_PAGE_TITLE_OPTIONS, { optional: true }) ?? {}
  );

  private pageTitle = '';
  private defendantNames: PageTitleName[] = [];
  private reference = '';

  setPageTitle(pageTitle: string): void {
    this.pageTitle = pageTitle || '';
    this.render();
  }

  setDefendantNames(names: PageTitleName[] | null | undefined): void {
    this.defendantNames = names || [];
    this.render();
  }

  clearDefendantNames(): void {
    this.setDefendantNames([]);
  }

  /** The reference shown in the page header, e.g. the case URN or application reference. */
  setReference(reference: string | null | undefined): void {
    this.reference = reference || '';
    this.render();
  }

  clearReference(): void {
    this.setReference('');
  }

  /** Clears everything that came from the page header, for when the header goes away. */
  clearHeaderDetails(): void {
    this.defendantNames = [];
    this.reference = '';
    this.render();
  }

  private render(): void {
    this.title.setTitle(
      buildPageTitle(
        {
          pageTitle: this.pageTitle,
          defendantName: formatDefendantNamesForTitle(this.defendantNames),
          reference: this.reference
        },
        this.format
      )
    );
  }
}

const toPageTitleFormat = ({
  separator,
  suffix,
  completeTitleRoutes
}: CppPageTitleOptions): PageTitleFormat => ({
  separator,
  suffix,
  completeTitles: [
    ...new Set([...CPP_APPLICATION_PAGE_TITLES, ...getRouteTitles(completeTitleRoutes)])
  ]
});
