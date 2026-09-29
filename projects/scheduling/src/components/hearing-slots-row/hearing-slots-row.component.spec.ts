import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingSlotsRowComponent } from './hearing-slots-row.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HearingSlot } from '../../types';
import {
  mockHearingSlotAmSession,
  mockHearingSlotDraftSession
} from '../../mocks/hearing-slot.mocks';
import * as utils from '../../utils';
import { BusinessTypeDescriptionPipe } from '../../pipes/businessTypeDescription.pipe';
import {
  PdkSelectComponent,
  PdkRadioButtonComponent,
  PdkCheckboxComponent,
  PdkTable,
  PdkForm,
  PdkCore,
  PdkTagComponent
} from '@cpp/pdk';

jest.mock('../../utils', () => ({
  getHearingSlotTimeOptions: jest
    .fn()
    .mockReturnValue([{ value: '10:00', label: '10:00am to 11:00am', count: 1 }])
}));

describe('HearingSlotsRowComponent', () => {
  let component: HearingSlotsRowComponent;
  let fixture: ComponentFixture<HearingSlotsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HearingSlotsRowComponent,
        DurationPipe,
        BusinessTypeDescriptionPipe,
        PdkSelectComponent,
        PdkRadioButtonComponent,
        PdkCheckboxComponent,
        PdkTable,
        PdkForm,
        PdkCore,
        PdkTagComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingSlotsRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hearingSlot', mockHearingSlotAmSession);
    fixture.componentRef.setInput('selectedHearingSlotTimestamps', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render when hearing slot is draft', () => {
    fixture.componentRef.setInput('hearingSlot', mockHearingSlotDraftSession);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should call getHearingSlotTimeOptions from utils', () => {
    const result = component.getHearingSlotTimeOptions(mockHearingSlotAmSession);
    expect(utils.getHearingSlotTimeOptions).toHaveBeenCalledWith(mockHearingSlotAmSession);
    expect(result).toEqual([{ value: '10:00', label: '10:00am to 11:00am', count: 1 }]);
  });

  it('should emit selectedHearingSlotTimestamp with the correct payload when handleHearingSlotTimeChanged is called', () => {
    jest.spyOn(component.selectedHearingSlotTimestamp, 'emit');

    const mockHearingSlot = { courtScheduleId: '1' } as HearingSlot;
    const mockHearingSlotTime = '2025-04-09T09:00:00.000Z';

    const expected = {
      [mockHearingSlot.courtScheduleId]: mockHearingSlotTime
    };

    component.handleHearingSlotTimeChanged(mockHearingSlot, mockHearingSlotTime);

    expect(component.selectedHearingSlotTimestamp.emit).toHaveBeenCalledWith(expected);
  });
});
