import { Routes } from '@angular/router';
import {
  buildPageTitle,
  DEFAULT_PAGE_TITLE_SEPARATOR,
  formatDefendantNamesForTitle,
  formatNameForTitle,
  getRouteTitles
} from '../utils';
import { CPP_APPLICATION_PAGE_TITLES } from '../cpp-application-titles';

describe('page title utils', () => {
  describe('formatNameForTitle', () => {
    it('should format a person as surname and first initial', () => {
      expect(formatNameForTitle({ firstName: 'John', lastName: 'Smith' })).toBe('Smith J');
    });

    it('should upper case the initial and trim the names', () => {
      expect(formatNameForTitle({ firstName: ' john ', lastName: ' Smith ' })).toBe('Smith J');
    });

    it('should use an organisation name as it is', () => {
      expect(formatNameForTitle({ firstName: 'Acme Ltd', lastName: '' })).toBe('Acme Ltd');
    });

    it('should use the surname alone when there is no first name', () => {
      expect(formatNameForTitle({ firstName: null, lastName: 'Smith' })).toBe('Smith');
    });

    it('should return an empty string when there is no name', () => {
      expect(formatNameForTitle(undefined)).toBe('');
      expect(formatNameForTitle({})).toBe('');
    });
  });

  describe('formatDefendantNamesForTitle', () => {
    it('should only use the lead name', () => {
      expect(
        formatDefendantNamesForTitle([
          { firstName: 'George', lastName: 'Washington' },
          { firstName: 'Harold', lastName: 'Winston' }
        ])
      ).toBe('Washington G');
    });

    it('should return an empty string when there are no names', () => {
      expect(formatDefendantNamesForTitle([])).toBe('');
      expect(formatDefendantNamesForTitle(null)).toBe('');
    });
  });

  describe('buildPageTitle', () => {
    it('should separate the parts with an en dash', () => {
      expect(DEFAULT_PAGE_TITLE_SEPARATOR).toBe(' – ');
    });

    it('should add the defendant and the Common Platform – HMCTS suffix', () => {
      expect(buildPageTitle('Case details', 'Smith J')).toBe(
        'Smith J – Case details – Common Platform – HMCTS'
      );
      expect(buildPageTitle('Manage hearing', 'Washington G')).toBe(
        'Washington G – Manage hearing – Common Platform – HMCTS'
      );
    });

    it('should leave the defendant out when there is none', () => {
      expect(buildPageTitle('My hearing list')).toBe('My hearing list – Common Platform – HMCTS');
    });

    it('should leave the page title out when the route has none', () => {
      expect(buildPageTitle('', 'Smith J')).toBe('Smith J – Common Platform – HMCTS');
      expect(buildPageTitle('')).toBe('Common Platform – HMCTS');
    });

    it('should use an organisation name as the defendant', () => {
      expect(buildPageTitle('Case details', 'Acme Ltd')).toBe(
        'Acme Ltd – Case details – Common Platform – HMCTS'
      );
    });

    it('should use the route title exactly as it is given', () => {
      expect(buildPageTitle('Case details | Common Platform')).toBe(
        'Case details | Common Platform – Common Platform – HMCTS'
      );
    });

    it('should use the suffix it is given', () => {
      const format = { suffix: ['Criminal Justice Service Online', 'HMCTS'] };

      expect(buildPageTitle('View case', 'Smith J', format)).toBe(
        'Smith J – View case – Criminal Justice Service Online – HMCTS'
      );
      expect(buildPageTitle('', 'Smith J', format)).toBe(
        'Smith J – Criminal Justice Service Online – HMCTS'
      );
    });

    it('should use the same separator between every part', () => {
      expect(buildPageTitle('Case details', 'Smith J', { separator: ' | ' })).toBe(
        'Smith J | Case details | Common Platform | HMCTS'
      );
    });

    it('should add no suffix when the suffix is empty', () => {
      expect(buildPageTitle('Case details', 'Smith J', { suffix: [] })).toBe(
        'Smith J – Case details'
      );
    });

    it('should not add a suffix to the @cpp/application titles by default', () => {
      CPP_APPLICATION_PAGE_TITLES.forEach((title) => expect(buildPageTitle(title)).toBe(title));
    });

    it('should not add a suffix to a complete title it is given', () => {
      expect(
        buildPageTitle('Renamed error | Common platform', '', {
          completeTitles: ['Renamed error | Common platform']
        })
      ).toBe('Renamed error | Common platform');
    });

    it('should only treat exact matches as complete titles', () => {
      expect(buildPageTitle('Other page | Common platform')).toBe(
        'Other page | Common platform – Common Platform – HMCTS'
      );
    });
  });

  describe('getRouteTitles', () => {
    it('should collect the string titles of the routes and their children', () => {
      const routes: Routes = [
        { path: 'technical-error', data: { title: 'Technical error | Common platform' } },
        { path: 'resolved', title: 'Resolved | Common platform' },
        { path: 'resolver', title: () => 'Not a string' },
        { path: 'untitled' },
        {
          path: 'notifications',
          children: [{ path: '', data: { title: 'System Announcements | Common platform' } }]
        }
      ];

      expect(getRouteTitles(routes)).toEqual([
        'Technical error | Common platform',
        'Resolved | Common platform',
        'System Announcements | Common platform'
      ]);
    });

    it('should return no titles when there are no routes', () => {
      expect(getRouteTitles()).toEqual([]);
    });
  });
});
