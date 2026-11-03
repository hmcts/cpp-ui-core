import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { CPP_PAGE_TITLE_OPTIONS, CppPageTitleOptions } from '../options';
import { PageTitleService } from '../service';
import { TitleCaseReference } from '../title-case-reference';

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

    it('should use the route title exactly as it is given', () => {
      service.setPageTitle('Case details | Common Platform');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Case details | Common Platform – Common Platform – HMCTS'
      );
    });

    it('should just be the suffix when there is nothing else', () => {
      service.setPageTitle('');

      expect(title.setTitle).toHaveBeenLastCalledWith('Common Platform – HMCTS');
    });

    it('should put strings and objects before the page title, in the order given', () => {
      service.setPageTitle('Case details');
      service.setInformation('Foo', { toString: () => 'Bar' });

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Foo – Bar – Case details – Common Platform – HMCTS'
      );
    });

    it('should use a TitleCaseReference', () => {
      service.setPageTitle('Case details');
      service.setInformation(
        new TitleCaseReference({
          names: [{ firstName: 'John', lastName: 'Smith' }],
          caseReference: 'TVL12345678'
        })
      );

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Smith J – TVL12345678 – Case details – Common Platform – HMCTS'
      );
    });

    it('should keep the information when the page title changes', () => {
      service.setInformation('Foo');
      service.setPageTitle('Case materials');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Foo – Case materials – Common Platform – HMCTS'
      );
    });

    it('should replace the information it had', () => {
      service.setPageTitle('Case details');
      service.setInformation('Foo');
      service.setInformation('Bar');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Bar – Case details – Common Platform – HMCTS'
      );
    });

    it('should drop the information when it is cleared', () => {
      service.setPageTitle('Case details');
      service.setInformation('Foo');
      service.clearInformation();

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
    });

    it.each([null, undefined, '', '  ', new TitleCaseReference()])(
      'should leave out empty information: %p',
      (information) => {
        service.setPageTitle('Case details');
        service.setInformation(information);

        expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
      }
    );

    it('should add the suffix to every title when it has no options', () => {
      service.setPageTitle('Signed out | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Signed out | Common platform – Common Platform – HMCTS'
      );
    });

    it('should give the title it wrote', () => {
      service.setPageTitle('Case details');

      expect(service.getFormattedTitle()).toBe('Case details – Common Platform – HMCTS');
    });
  });

  describe('with options', () => {
    it('should use the suffix from the options', () => {
      const service = createService({ suffix: 'My Shop', completeTitleRoutes: [] });

      service.setInformation('Foo');
      service.setPageTitle('View case');

      expect(title.setTitle).toHaveBeenLastCalledWith('Foo – View case – My Shop');
    });

    it('should add no suffix when the suffix is empty', () => {
      const service = createService({ suffix: '', completeTitleRoutes: [] });

      service.setPageTitle('Case details');

      expect(title.setTitle).toHaveBeenLastCalledWith('Case details');
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

    it('should only treat exact matches as complete titles', () => {
      const service = createService({
        completeTitleRoutes: [
          { path: 'signed-out', data: { title: 'Signed out | Common platform' } }
        ]
      });

      service.setPageTitle('Other page | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Other page | Common platform – Common Platform – HMCTS'
      );
    });

    it('should add the suffix to every title when the complete title routes are empty', () => {
      const service = createService({ completeTitleRoutes: [] });

      service.setPageTitle('Signed out | Common platform');

      expect(title.setTitle).toHaveBeenLastCalledWith(
        'Signed out | Common platform – Common Platform – HMCTS'
      );
    });
  });

  describe('joinParts', () => {
    it('should separate the parts with an en dash', () => {
      expect(PageTitleService.DELIMITER).toBe(' – ');
      expect(PageTitleService.joinParts(['Smith J', 'Case details'])).toBe(
        'Smith J – Case details'
      );
    });

    it('should use the toString of an object', () => {
      expect(
        PageTitleService.joinParts([{ toString: () => 'From an object' }, 'Case details'])
      ).toBe('From an object – Case details');
    });

    it('should leave out empty parts and trim the rest', () => {
      expect(PageTitleService.joinParts([null, '', '  ', undefined, ' Case details '])).toBe(
        'Case details'
      );
      expect(PageTitleService.joinParts([])).toBe('');
    });
  });

  it('should have Common Platform – HMCTS as the default suffix', () => {
    expect(PageTitleService.DEFAULT_SUFFIX).toBe('Common Platform – HMCTS');
  });
});
