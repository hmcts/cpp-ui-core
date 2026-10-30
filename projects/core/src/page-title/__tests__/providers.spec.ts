import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Routes, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CPP_PAGE_TITLE_OPTIONS } from '../options';
import { provideCppPageTitle } from '../providers';
import { PageTitleStrategy } from '../strategy';

@Component({ template: '' })
class DummyComponent {}

const ERROR_PAGES_ROUTES: Routes = [
  {
    path: 'renamed-error',
    component: DummyComponent,
    data: { title: 'Renamed error | Common platform' }
  }
];

describe('provideCppPageTitle', () => {
  let title: jest.Mocked<Title>;

  const setUp = (providers: unknown[]) => {
    title = { setTitle: jest.fn(), getTitle: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: title },
        provideRouter([
          { path: 'view-case', component: DummyComponent, data: { title: 'View case' } },
          ...ERROR_PAGES_ROUTES
        ]),
        ...(providers as any[])
      ]
    });
  };

  it('should register the page title strategy', () => {
    setUp([provideCppPageTitle()]);

    expect(TestBed.inject(TitleStrategy)).toBeInstanceOf(PageTitleStrategy);
  });

  it('should provide the options', () => {
    const options = { suffix: ['Criminal Justice Service Online', 'HMCTS'] };
    setUp([provideCppPageTitle(options)]);

    expect(TestBed.inject(CPP_PAGE_TITLE_OPTIONS)).toBe(options);
  });

  it('should set the tab title in the configured format when navigating', async () => {
    setUp([provideCppPageTitle({ suffix: ['Criminal Justice Service Online', 'HMCTS'] })]);

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/view-case');

    expect(title.setTitle).toHaveBeenLastCalledWith(
      'View case – Criminal Justice Service Online – HMCTS'
    );
  });

  it('should leave the titles of the complete title routes as they are', async () => {
    setUp([provideCppPageTitle({ completeTitleRoutes: ERROR_PAGES_ROUTES })]);

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/renamed-error');

    expect(title.setTitle).toHaveBeenLastCalledWith('Renamed error | Common platform');
  });
});
