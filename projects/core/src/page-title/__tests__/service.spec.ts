import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { CPP_PAGE_TITLE_OPTIONS, CppPageTitleOptions } from '../options';
import { PageTitleService } from '../service';

describe('PageTitleService', () => {
  let title: jest.Mocked<Title>;

  const createService = (options?: CppPageTitleOptions) => {
    title = { setTitle: jest.fn(), getTitle: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: title },
        ...(options ? [{ provide: CPP_PAGE_TITLE_OPTIONS, useValue: options }] : [])
      ]
    });

    return TestBed.inject(PageTitleService);
  };

  describe('with the default format', () => {
    let service: PageTitleService;

    beforeEach(() => {
      service = createService();
    });

    it('should write the page title with the Common Platform – HMCTS suffix', () => {
      service.setPageTitle('Case details');

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
    });

    it('should prefix the page title with the lead defendant once names are set', () => {
      service.setPageTitle('Case details');
      service.setDefendantNames([
        { firstName: 'John', lastName: 'Smith' },
        { firstName: 'Jane', lastName: 'Doe' }
      ]);

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Smith J – Case details – Common Platform – HMCTS'
      );
    });

    it('should keep the defendant prefix when the page title changes', () => {
      service.setDefendantNames([{ firstName: 'John', lastName: 'Smith' }]);
      service.setPageTitle('Case materials');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Smith J – Case materials – Common Platform – HMCTS'
      );
    });

    it('should drop the prefix when the defendant names are cleared', () => {
      service.setPageTitle('Case details');
      service.setDefendantNames([{ firstName: 'John', lastName: 'Smith' }]);
      service.clearDefendantNames();

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
    });

    it('should treat null names as no names', () => {
      service.setPageTitle('Case details');
      service.setDefendantNames(null);

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
    });

    it('should not add a suffix to the @cpp/application titles', () => {
      service.setPageTitle('Technical error | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith('Technical error | Common platform');
    });
  });

  describe('with options', () => {
    it('should use the suffix from the options', () => {
      const service = createService({ suffix: ['Criminal Justice Service Online', 'HMCTS'] });

      service.setDefendantNames([{ firstName: 'John', lastName: 'Smith' }]);
      service.setPageTitle('View case');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Smith J – View case – Criminal Justice Service Online – HMCTS'
      );
    });

    it('should use the separator from the options', () => {
      const service = createService({ separator: ' | ' });

      service.setPageTitle('Case details');

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details | Common Platform | HMCTS');
    });

    it('should not add a suffix to the titles of the complete title routes', () => {
      const service = createService({
        completeTitleRoutes: [
          { path: 'renamed-error', data: { title: 'Renamed error | Common platform' } }
        ]
      });

      service.setPageTitle('Renamed error | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith('Renamed error | Common platform');
    });

    it('should still recognise the @cpp/application titles alongside the routes', () => {
      const service = createService({
        completeTitleRoutes: [{ path: 'other', data: { title: 'Other | Common platform' } }]
      });

      service.setPageTitle('Signed out | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith('Signed out | Common platform');
    });
  });
});
