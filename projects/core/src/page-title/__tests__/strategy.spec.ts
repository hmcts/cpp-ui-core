import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Routes, TitleStrategy, withRouterConfig } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PageTitleService } from '../service';
import { PageTitleStrategy } from '../strategy';

@Component({ template: '' })
class DummyComponent {}

const ERROR_ROUTES: Routes = [
  {
    path: 'technical-error',
    component: DummyComponent,
    data: { title: 'Technical error | Common platform' }
  }
];

describe('PageTitleStrategy', () => {
  let title: jest.Mocked<Title>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    title = { setTitle: jest.fn(), getTitle: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: title },
        { provide: TitleStrategy, useClass: PageTitleStrategy },
        provideRouter(
          [
            { path: 'static', component: DummyComponent, data: { title: 'My hearing list' } },
            { path: 'resolved', component: DummyComponent, title: () => 'Resolved page' },
            {
              path: 'case/:caseId',
              component: DummyComponent,
              data: { title: 'Case details' },
              children: [
                { path: '', component: DummyComponent },
                {
                  path: 'materials',
                  component: DummyComponent,
                  data: { title: 'Case materials' }
                },
                { path: 'notes', component: DummyComponent }
              ]
            },
            { path: 'untitled', component: DummyComponent },
            ...ERROR_ROUTES
          ],
          withRouterConfig({ paramsInheritanceStrategy: 'always' })
        )
      ]
    });

    harness = await RouterTestingHarness.create();
  });

  it('should use data.title of the deepest activated route', async () => {
    await harness.navigateByUrl('/case/123/materials');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case materials – Common Platform – HMCTS');
  });

  it('should inherit data.title through an empty path child', async () => {
    await harness.navigateByUrl('/case/123');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
  });

  it('should inherit data.title from the parent route', async () => {
    await harness.navigateByUrl('/case/123/notes');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
  });

  it('should prefer a resolved route title', async () => {
    await harness.navigateByUrl('/resolved');

    expect(title.setTitle).toHaveBeenLastCalledWith('Resolved page – Common Platform – HMCTS');
  });

  it('should fall back to the suffix when no route declares a title', async () => {
    await harness.navigateByUrl('/untitled');

    expect(title.setTitle).toHaveBeenLastCalledWith('Common Platform – HMCTS');
  });

  it('should leave an @cpp/application title as it is', async () => {
    await harness.navigateByUrl('/technical-error');

    expect(title.setTitle).toHaveBeenLastCalledWith('Technical error | Common platform');
  });

  it('should combine with the header names on later navigations', async () => {
    TestBed.inject(PageTitleService).setDefendantNames([{ firstName: 'John', lastName: 'Smith' }]);

    await harness.navigateByUrl('/static');

    expect(title.setTitle).toHaveBeenLastCalledWith(
      'Smith J – My hearing list – Common Platform – HMCTS'
    );
  });
});
