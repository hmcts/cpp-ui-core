import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingFiltersComponent } from './scheduling-filters.component';
import { CppHttp } from '@cpp/core';
import { OrganisationUnit } from '@cpp/reference-data';
import { SchedulingFilters } from '../../types';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('SchedulingFiltersComponent', () => {
  let component: SchedulingFiltersComponent;
  let fixture: ComponentFixture<SchedulingFiltersComponent>;

  const defaultFilters: SchedulingFilters = {
    organisationUnit: {
      id: 'c133d0de-c989-48b9-bd20-0431943e347e',
      oucode: 'B01DU00',
      lja: '2570',
      oucodeL1Code: 'B',
      oucodeL1Name: "Magistrates' Courts",
      oucodeL3Name: "City of London Magistrates' Court",
      oucodeL3WelshName: 'Llys Ynadon Dinas Llundain',
      oucodeL3Code: 'DEFAULT_CODE',
      address1: '1 Queen Victoria Street',
      address2: 'London',
      postcode: 'EC4N 4XY',
      defaultStartTime: '10:00:00',
      defaultDurationHrs: '07:00:00',
      oucodeL2Code: '1',
      oucodeL2Name: 'London',
      region: 'London',
      courtrooms: []
    },
    sessionStartDate: '2025-03-21',
    sessionEndDate: '2025-05-01'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingFiltersComponent],
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

    fixture = TestBed.createComponent(SchedulingFiltersComponent);
    component = fixture.componentInstance;
    component.defaultValues = defaultFilters;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should emit filtersSubmit with filtered form model on submit', () => {
    jest.spyOn(component.filtersSubmit, 'emit');
    component.formModel = { ...defaultFilters, courtSession: 'AM' };
    component.handleFiltersSubmit();

    expect(component.filtersSubmit.emit).toHaveBeenCalledWith({
      organisationUnit: component.formModel.organisationUnit,
      sessionStartDate: component.formModel.sessionStartDate,
      sessionEndDate: component.formModel.sessionEndDate,
      courtSession: 'AM'
    });
  });

  it('should filter out undefined and placeholder values', () => {
    const placeholderUnit = {
      id: '',
      oucodeL1Code: 'B',
      oucodeL2Code: '1',
      oucodeL3Name: 'All courts',
      oucodeL3Code: 'All courts'
    } as any;

    component.organisationUnitPlaceholder = placeholderUnit;
    const rawFormModel = {
      ...component.formModel,
      organisationUnit: placeholderUnit
    };

    const filtered = component.filterFormModel(rawFormModel);
    expect(filtered.availableDurationMins).toBeUndefined();
    expect(filtered.organisationUnit).toBeUndefined();
  });

  it('should set organisation unit placeholder when operational unit changes', () => {
    component.formModel.organisationUnit = undefined;
    component.handleOperationalUnitChanged('LONDON');

    expect(component.organisationUnitPlaceholder?.oucodeL2Code).toBe('LONDON');
    expect(component.formModel.organisationUnit!.oucodeL2Code).toBe('LONDON');
  });

  it('should reset form model to initial values', () => {
    component.formModel.courtSession = 'PM';
    component.handleResetForm();
    const expected = {
      ...component.initialValues
    };
    expect(component.formModel).toEqual(expected);
  });

  it('should generate operational unit options from input', () => {
    const orgUnits = [component.initialValues.organisationUnit!];
    component.organisationUnits = orgUnits;
    expect(component.operationalUnitOptions.length).toBeGreaterThan(0);
  });

  it('should call handleOperationalUnitChanged in ngOnChanges when formModel.oucodeL2Code is set', () => {
    const spy = jest.spyOn(component, 'handleOperationalUnitChanged');

    component.formModel = { oucodeL2Code: 'ABC' } as SchedulingFilters;
    component.ngOnChanges();

    expect(spy).toHaveBeenCalledWith('ABC');
  });

  it('should return true when organisation unit is a magistrates court with matching oucodeL2Code', () => {
    component.formModel.oucodeL2Code = 'LONDON';

    const organisationUnit = {
      oucodeL2Code: 'LONDON',
      id: '123',
      oucodeL1Code: 'B',
      oucodeL3Name: 'London Court',
      oucodeL3Code: 'LC'
    } as OrganisationUnit;

    const result = component.filterByOperationalUnit(organisationUnit);
    expect(result).toBe(true);
  });

  it('should update form model correctly for duration based booking when bookingTypeChange is set to false', () => {
    component.formModel = {
      ...defaultFilters,
      isSlotBased: true,
      isMultiday: undefined,
      availableDurationMins: undefined,
      courtSession: undefined
    };
    component.bookingTypeChange(false);

    expect(component.formModel.isMultiday).toBe(false);
    expect(component.formModel.availableDurationMins).toBeUndefined();
    expect(component.formModel.courtSession).toBeUndefined();
  });

  it('should update court session for duration based booking when updateCourtSession is called with true', () => {
    component.formModel = {
      ...defaultFilters,
      isMultiday: false,
      availableDurationMins: undefined,
      courtSession: undefined
    };
    component.updateCourtSession(true);
    expect(component.formModel.availableDurationMins).toEqual(360);
    expect(component.formModel.courtSession).toEqual('AD');
  });

  it('should update court session for duration based booking when updateCourtSession is called with false', () => {
    component.formModel = {
      ...defaultFilters,
      isMultiday: true,
      availableDurationMins: 360,
      courtSession: 'AD'
    };
    component.updateCourtSession(false);
    expect(component.formModel.availableDurationMins).toBeUndefined();
    expect(component.formModel.courtSession).toBeUndefined();
  });
});
