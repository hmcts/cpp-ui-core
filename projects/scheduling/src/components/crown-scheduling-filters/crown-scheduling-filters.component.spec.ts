import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrownSchedulingFiltersComponent } from './crown-scheduling-filters.component';
import { CppHttp } from '@cpp/core';
import { organisationUnitMockOne } from '@cpp/reference-data';
import { CrownSessionStatusFilterOption, CrownSchedulingFilters } from '../../types/filters';
import { CrownSessionStatus } from '../../types/hearingSlot';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('CrownSchedulingFiltersComponent', () => {
  let component: CrownSchedulingFiltersComponent;
  let fixture: ComponentFixture<CrownSchedulingFiltersComponent>;

  const defaultFilters: CrownSchedulingFilters = {
    organisationUnit: undefined,
    sessionStartDate: '2025-03-21',
    sessionEndDate: '2025-05-01'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrownSchedulingFiltersComponent],
      providers: [
        provideMockStore({ initialState: {} }),
        {
          provide: CppHttp,
          useValue: {
            query: jest.fn(() => of([]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrownSchedulingFiltersComponent);
    component = fixture.componentInstance;
    component.defaultValues = defaultFilters;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync operational unit when defaultValues include oucodeL2Code', () => {
    const spy = jest.spyOn(component, 'handleOperationalUnitChanged');
    component.defaultValues = { ...defaultFilters, oucodeL2Code: 'XYZ' };
    expect(spy).toHaveBeenCalledWith('XYZ');
  });

  it('should default sessionStatusFilter to NONE when defaultSessionStatus is omitted or DRAFT', () => {
    component.defaultValues = defaultFilters;
    expect(component.formModel.sessionStatusFilter).toBe(CrownSessionStatusFilterOption.NONE);

    component.defaultSessionStatus = CrownSessionStatus.DRAFT;
    component.defaultValues = defaultFilters;
    expect(component.formModel.sessionStatusFilter).toBe(CrownSessionStatusFilterOption.NONE);
  });

  it('should default sessionStatusFilter to ALL when defaultSessionStatus is ALL', () => {
    component.defaultSessionStatus = CrownSessionStatus.ALL;
    component.defaultValues = defaultFilters;
    expect(component.formModel.sessionStatusFilter).toBe(CrownSessionStatusFilterOption.ALL);
  });

  it('should default sessionStatusFilter to ALL when defaultSessionStatus is FINAL', () => {
    component.defaultSessionStatus = CrownSessionStatus.FINAL;
    component.defaultValues = defaultFilters;
    expect(component.formModel.sessionStatusFilter).toBe(CrownSessionStatusFilterOption.ALL);
  });

  it('should default isSlotBased to false', () => {
    component.defaultValues = defaultFilters;
    expect(component.formModel.isSlotBased).toBe(false);
  });

  describe('effectiveMinDate', () => {
    const today = '2026-04-10';
    const tomorrow = '2026-04-11';
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date(today));
    });

    it('should resolve minDate to today by default', () => {
      expect(component.effectiveMinDate()).toBe(today);
    });

    it('should resolve minDate to custom value when provided', () => {
      fixture.componentRef.setInput('minDate', tomorrow);
      fixture.detectChanges();
      expect(component.effectiveMinDate()).toBe(tomorrow);
    });

    it('should not restrict minDate when allowPastDates is true and no minDate provided', () => {
      fixture.componentRef.setInput('allowPastDates', true);
      fixture.componentRef.setInput('minDate', undefined);
      fixture.detectChanges();
      expect(component.effectiveMinDate()).toBeUndefined();
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  });

  it('should omit courtRoomId and set status FINAL in filterFormModel when All is selected', () => {
    component.defaultSessionStatus = CrownSessionStatus.FINAL;
    component.defaultValues = defaultFilters;
    component.formModel.sessionStatusFilter = CrownSessionStatusFilterOption.ALL;
    const result = component.filterFormModel(component.formModel);
    expect(result.sessionStatusFilter).toBe(CrownSessionStatusFilterOption.ALL);
    expect(result.courtRoomId).toBeUndefined();
    expect(result.status).toBe(CrownSessionStatus.FINAL);
  });

  it('should clear formModel.courtRoomId when session status filter is ALL or NONE', () => {
    component.formModel.courtRoomId = organisationUnitMockOne.id;
    component.handleSessionStatusFilterChange(CrownSessionStatusFilterOption.ALL);
    expect(component.formModel.courtRoomId).toBeUndefined();
    component.formModel.courtRoomId = organisationUnitMockOne.id;
    component.handleSessionStatusFilterChange(CrownSessionStatusFilterOption.NONE);
    expect(component.formModel.courtRoomId).toBeUndefined();
  });

  it('should set formModel.courtRoomId when a specific courtroom is selected', () => {
    component.handleSessionStatusFilterChange(organisationUnitMockOne.id);
    expect(component.formModel.courtRoomId).toBe(organisationUnitMockOne.id);
  });

  it('should include availableDurationMins in filterFormModel for duration-based multi-day search', () => {
    component.defaultSessionStatus = CrownSessionStatus.FINAL;
    component.defaultValues = defaultFilters;
    component.formModel.isSlotBased = false;
    component.formModel.isMultiday = true;
    component.updateCourtSession(true);
    component.formModel.availableDurationMins = 2880;
    component.formModel.sessionStatusFilter = CrownSessionStatusFilterOption.ALL;
    const result = component.filterFormModel(component.formModel);
    expect(result.availableDurationMins).toBe(2880);
  });

  it('should clear availableDurationMins when toggling multi-day so duration matches the active journey', () => {
    component.defaultValues = defaultFilters;
    component.formModel.isSlotBased = false;
    component.formModel.availableDurationMins = 180;
    component.updateCourtSession(true);
    expect(component.formModel.availableDurationMins).toBeUndefined();
    expect(component.formModel.courtSession).toBe('AD');

    component.formModel.availableDurationMins = 2880;
    component.updateCourtSession(false);
    expect(component.formModel.availableDurationMins).toBeUndefined();
    expect(component.formModel.courtSession).toBeUndefined();
  });

  it('should include availableDurationMins in filterFormModel for duration-based non-multi-day search', () => {
    component.defaultSessionStatus = CrownSessionStatus.FINAL;
    component.defaultValues = defaultFilters;
    component.formModel.isSlotBased = false;
    component.formModel.isMultiday = false;
    component.formModel.availableDurationMins = 180;
    component.formModel.sessionStatusFilter = CrownSessionStatusFilterOption.ALL;
    const result = component.filterFormModel(component.formModel);
    expect(result.availableDurationMins).toBe(180);
  });
});
