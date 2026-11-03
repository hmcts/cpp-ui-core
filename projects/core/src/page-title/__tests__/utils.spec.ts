import { Routes } from '@angular/router';
import { formatNameForTitle, getRouteTitles } from '../utils';

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

    it('should include the titles from a loadChildren that gives the routes straight away', () => {
      const routes: Routes = [
        {
          path: 'system-announcements',
          loadChildren: () => [
            { path: 'notifications', data: { title: 'System Announcements | Common platform' } }
          ]
        }
      ];

      expect(getRouteTitles(routes)).toEqual(['System Announcements | Common platform']);
    });

    it('should skip a loadChildren that loads its routes later', () => {
      const routes: Routes = [
        {
          path: 'lazy',
          loadChildren: () =>
            Promise.resolve([{ path: '', data: { title: 'Lazy | Common platform' } }])
        }
      ];

      expect(getRouteTitles(routes)).toEqual([]);
    });

    it('should return no titles when there are no routes', () => {
      expect(getRouteTitles()).toEqual([]);
    });
  });
});
