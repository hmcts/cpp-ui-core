import { PageTitleInformation, PageTitleService } from './service';
import { formatNameForTitle, PageTitleName } from './utils';

export interface TitleCaseReferenceDetails {
  names?: PageTitleName[] | null;
  caseReference?: string | null;
}

/**
 * The case details in a page title, as "<lead name> – <case reference>". Apps give it what their
 * page header shows, and how it reads in the tab is decided here.
 */
export class TitleCaseReference implements PageTitleInformation {
  readonly names: PageTitleName[];
  readonly caseReference: string;

  constructor({ names, caseReference }: TitleCaseReferenceDetails = {}) {
    this.names = names || [];
    this.caseReference = caseReference || '';
  }

  // Only the lead name goes in the tab, otherwise it gets too long
  toString(): string {
    return PageTitleService.joinParts([formatNameForTitle(this.names[0]), this.caseReference]);
  }
}
