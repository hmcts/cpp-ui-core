import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CPP_PAGE_TITLE_OPTIONS } from './options';
import { getRouteTitles } from './utils';

/** Anything that can go in a page title: a string, or an object with its own toString. */
export interface PageTitleInformation {
  toString(): string;
}

/**
 * Owns the browser tab title, as "<information> – <page title> – <suffix>". The page title comes
 * from the router (PageTitleStrategy) and the information comes from whatever the app wants to show
 * in the tab. That can be plain strings or objects with their own toString, see TitleCaseReference.
 */
@Injectable({ providedIn: 'root' })
export class PageTitleService {
  /** En dash with spaces, as the GOV.UK Design System uses in page titles. */
  static readonly DELIMITER = ' – ';

  static readonly DEFAULT_SUFFIX = `Common Platform${PageTitleService.DELIMITER}HMCTS`;

  private readonly title = inject(Title);
  private readonly options = inject(CPP_PAGE_TITLE_OPTIONS, { optional: true });
  private readonly suffix = this.options?.suffix ?? PageTitleService.DEFAULT_SUFFIX;
  private readonly completeTitles = getRouteTitles(this.options?.completeTitleRoutes);

  private pageTitle = '';
  private information: (PageTitleInformation | null | undefined)[] = [];

  /** Joins the parts with the delimiter. Empty parts are left out, so there is never a stray one. */
  static joinParts(parts: (PageTitleInformation | null | undefined)[]): string {
    return parts
      .map((part) => String(part ?? '').trim())
      .filter(Boolean)
      .join(PageTitleService.DELIMITER);
  }

  setPageTitle(pageTitle: string): void {
    this.pageTitle = (pageTitle || '').trim();
    this.render();
  }

  setInformation(...information: (PageTitleInformation | null | undefined)[]): void {
    this.information = information;
    this.render();
  }

  clearInformation(): void {
    this.setInformation();
  }

  // Complete titles, like the @cpp/application error pages, get no suffix
  getFormattedTitle(): string {
    const isComplete = this.completeTitles.includes(this.pageTitle);

    return PageTitleService.joinParts([
      ...this.information,
      this.pageTitle,
      isComplete ? '' : this.suffix
    ]);
  }

  private render(): void {
    this.title.setTitle(this.getFormattedTitle());
  }
}
