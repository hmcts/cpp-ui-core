import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingSlotsRowComponent } from './hearing-slots-row.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HearingSlot } from '../../types';
import * as utils from '../../utils';
import { BusinessTypeDescriptionPipe } from '../../pipes/businessTypeDescription.pipe';
import {
  PdkSelectComponent,
  PdkRadioButtonComponent,
  PdkCheckboxComponent,
  PdkTable,
  PdkForm,
  PdkCore
} from '@cpp/pdk';

jest.mock('../../utils', () => ({
  getHearingSlotTimeOptions: jest
    .fn()
    .mockReturnValue([{ value: '10:00', label: '10:00am to 11:00am', count: 1 }])
}));

describe('HearingSlotsRowComponent', () => {
  let component: HearingSlotsRowComponent;
  let fixture: ComponentFixture<HearingSlotsRowComponent>;

  const hearingSlot = {
    courtSession: 'AM',
    sessionDate: '2025-03-25',
    slotStartTimes: [
      {
        sessionStartTime: '2025-03-25T10:00:00.000Z',
        sessionEndTime: '2025-03-25T11:00:00.000Z',
        count: 1
      }
    ],
    allDaySplit: false
  } as HearingSlot;

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
        PdkCore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingSlotsRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hearingSlot', hearingSlot);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should call getHearingSlotTimeOptions from utils', () => {
    const result = component.getHearingSlotTimeOptions(hearingSlot);
    expect(utils.getHearingSlotTimeOptions).toHaveBeenCalledWith(hearingSlot);
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
