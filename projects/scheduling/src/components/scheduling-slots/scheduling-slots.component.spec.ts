import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingSlotsComponent } from './scheduling-slots.component';
import { DatePipe } from '@angular/common';
import { ValidationError } from '@cpp/pdk';
import { HearingType, RotaBusinessType } from '@cpp/reference-data';
import { HearingSlot, HearingSlotAllocation } from '../../types';

describe('SchedulingSlotsComponent', () => {
  let component: SchedulingSlotsComponent;
  let fixture: ComponentFixture<SchedulingSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingSlotsComponent, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should set rotaBusinessTypes correctly and generate a mapping', () => {
    const businessTypes: RotaBusinessType[] = [
      { typeCode: 'TRL', typeDescription: 'Trial' },
      { typeCode: 'TFL', typeDescription: 'Tfl' }
    ] as unknown as RotaBusinessType[];

    component.rotaBusinessTypes = businessTypes;
    expect(component.rotaBusinessTypesByCode).toEqual({
      TRL: businessTypes[0],
      TFL: businessTypes[1]
    });
  });

  it('should set hearingTypes correctly and generate hearingTypesOptions', () => {
    component.hearingTypes = [{ id: '1', hearingDescription: 'Trial' }] as unknown as HearingType[];
    expect(component.hearingTypesOptions).toEqual([
      {
        value: '1',
        label: 'Trial'
      }
    ]);
  });

  it('should emit pageChange event when triggered', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.pageChange.emit(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit errors event when triggered', () => {
    jest.spyOn(component.errors, 'emit');
    const errors: ValidationError[] = [{ message: 'Error message', id: 'id' }];
    component.errors.emit(errors);
    expect(component.errors.emit).toHaveBeenCalledWith(errors);
  });

  describe('handleSubmitAllocations', () => {
    const hearingType = { id: '1', hearingDescription: 'Trial' } as HearingType;

    beforeEach(() => {
      jest.spyOn(component.hearingSlotAllocations, 'emit');
      component.allocations = [
        {
          hearingSlot: { courtScheduleId: '1', slotBased: true } as HearingSlot,
          hearingSlotTime: '2025-04-09T09:00:00.000Z',
          duration: 99
        }
      ];
      component.selectedSlotsModel = ['1'];
    });

    it('should reset allocation and selectedSlotsModel', () => {
      component.reset();

      expect(component.selectedSlotsModel).toEqual([]);
      expect(component.allocations).toEqual([]);
    });

    describe('slot based ', () => {
      it('should emit allocation when sendNotificationToParties is defined', () => {
        component.sendNotificationToParties = true;
        component.formConfig = {
          formFields: ['sendNotificationToParties']
        };

        component.handleSubmitAllocations();

        expect(component.hearingSlotAllocations.emit).toHaveBeenCalledWith({
          hearingSlotAllocations: component.allocations,
          sendNotificationToParties: true
        });
      });
    });

    it('should emit allocation and sendNotificationToParties when defined but hearingType is undefined', () => {
      component.sendNotificationToParties = true;
      component.hearingType = undefined;
      component.formConfig = {
        formFields: ['sendNotificationToParties']
      };

      jest.spyOn(component.hearingSlotAllocations, 'emit');

      component.handleSubmitAllocations();

      expect(component.hearingSlotAllocations.emit).toHaveBeenCalledWith({
        hearingSlotAllocations: component.allocations,
        sendNotificationToParties: true
      });
    });
    it('should emit allocation and hearingType when sendNotificationToParties is undefined', () => {
      component.sendNotificationToParties = undefined;
      component.hearingType = hearingType;

      component.handleSubmitAllocations();

      expect(component.hearingSlotAllocations.emit).toHaveBeenCalledWith({
        hearingSlotAllocations: component.allocations,
        hearingType: component.hearingType
      });
    });

    it('should emit allocation, sendNotificationToParties, and hearingType when both are defined', () => {
      component.sendNotificationToParties = true;
      component.hearingType = hearingType;
      component.formConfig = {
        formFields: ['sendNotificationToParties']
      };

      component.handleSubmitAllocations();

      expect(component.hearingSlotAllocations.emit).toHaveBeenCalledWith({
        hearingSlotAllocations: component.allocations,
        sendNotificationToParties: true,
        hearingType: component.hearingType
      });
    });
  });

  describe('duration based', () => {
    it('should handle hearing slot time changes and update allocation', () => {
      const courtScheduleId = '1';
      const defaultHearingSlotTime = '2025-04-09T09:00:00.000Z';
      const updatedHearingSlotTime = '2025-04-09T10:00:00.000Z';

      const hearingSlot = {
        courtScheduleId,
        slotBased: false
      } as HearingSlot;

      component.hearingSlots = [hearingSlot];
      component.allocations = [
        {
          hearingSlot,
          hearingSlotTime: defaultHearingSlotTime
        } as HearingSlotAllocation
      ];

      component.handleHearingSlotTimeChanged({ [courtScheduleId]: updatedHearingSlotTime });

      expect(component.selectedHearingSlotTimestamps[courtScheduleId]).toEqual(
        updatedHearingSlotTime
      );
      expect(component.allocations[0].hearingSlotTime).toEqual(updatedHearingSlotTime);
    });

    it('should update allocation with selected hearingStartTime', () => {
      const courtScheduleId = '1';
      const hearingSlotTime = '2025-04-09T09:00:00.000Z';

      const hearingSlot = {
        courtScheduleId,
        slotBased: false
      } as HearingSlot;

      component.hearingSlots = [hearingSlot];
      component.selectedHearingSlotTimestamps = {
        [courtScheduleId]: hearingSlotTime
      };

      component.handleAllocationChanged([courtScheduleId]);

      expect(component.allocations.length).toBe(1);
      expect(component.allocations[0].hearingSlot.courtScheduleId).toBe(courtScheduleId);
      expect(component.allocations[0].hearingSlotTime).toBe(hearingSlotTime);
    });

    it('should handle submitting duration-based all day split slots', () => {
      const courtScheduleId = '1';
      const hearingSlotTime = '2025-04-09T09:00:00.000Z';

      const hearingSlot = {
        courtScheduleId,
        slotBased: false,
        sessionDate: '2025-01-24',
        courtHouseName: `Lavender Hill Magistrates' Court`,
        courtRoomName: 'Courtroom 1',
        courtSession: 'AD',
        businessType: 'TRL',
        panel: 'ADULT',
        allDaySplit: true,
        availableDuration: 0,
        availableDurationForMorning: 90,
        availableDurationForAfternoon: 120,
        availableSlots: 0,
        maxDuration: 0,
        maxDurationForMorning: 90,
        maxDurationForAfternoon: 120,
        maxSlots: 0,
        slotStartTimes: [
          {
            sessionStartTime: '2025-01-24T10:00:00.000Z',
            sessionEndTime: '2025-01-24T14:00:00.000Z',
            count: 1
          }
        ]
      } as HearingSlot;

      component.hearingSlots = [hearingSlot];
      component.selectedHearingSlotTimestamps = {
        [courtScheduleId]: hearingSlotTime
      };

      component.handleAllocationChanged([courtScheduleId]);

      expect(component.allocations.length).toBe(1);
      expect(component.allocations[0].hearingSlot.courtScheduleId).toBe(courtScheduleId);
      expect(component.allocations[0].hearingSlotTime).toBe(hearingSlotTime);
    });

    it('should update allocation with default hearingStartTime if none selected', () => {
      const courtScheduleId = '1';
      const hearingSlotTime = '2025-04-09T10:00:00.000Z';

      const hearingSlot = {
        courtScheduleId,
        sessionDate: '2025-04-09',
        courtSession: 'AM',
        slotBased: false,
        slotStartTimes: [
          {
            sessionStartTime: '2025-04-09T10:00:00.000Z',
            sessionEndTime: '2025-04-09T11:00:00.000Z',
            count: 1
          }
        ]
      } as HearingSlot;

      component.hearingSlots = [hearingSlot];
      component.handleAllocationChanged([courtScheduleId]);

      expect(component.allocations.length).toBe(1);
      expect(component.allocations[0].hearingSlotTime).toBe(hearingSlotTime);
    });
  });

  it('should prevent submission of slots that share the same date', () => {
    jest.spyOn(component.errors, 'emit');

    const courtScheduleId = '1';

    const hearingSlot = {
      courtScheduleId,
      sessionDate: '2025-04-09',
      courtSession: 'AM',
      slotBased: true
    } as HearingSlot;

    component.hearingSlots = [
      hearingSlot,
      {
        ...hearingSlot,
        courtScheduleId: '2'
      }
    ];

    const selectedSlots = [courtScheduleId, '2'];
    component.handleAllocationChanged(selectedSlots);
    component.handleSubmitAllocations();

    expect(component.errors.emit).toHaveBeenCalled();
  });
});
