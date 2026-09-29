import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagistratesSchedulingSlotsComponent } from './magistrates-scheduling-slots.component';
import { DatePipe } from '@angular/common';
import { HearingType, RotaBusinessType } from '@cpp/reference-data';
import { HearingSlotAllocation } from '../../types';

describe('MagistratesSchedulingSlotsComponent', () => {
  let component: MagistratesSchedulingSlotsComponent;
  let fixture: ComponentFixture<MagistratesSchedulingSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagistratesSchedulingSlotsComponent, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(MagistratesSchedulingSlotsComponent);
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

  describe('hearingTypeDisabled', () => {
    beforeEach(() => {
      component.totalResults = 1;
      component.formConfig = { formFields: ['hearingType'] };
      component.hearingTypes = [
        { id: '1', hearingDescription: 'Trial' }
      ] as unknown as HearingType[];
      component.hearingType = { id: '1', hearingDescription: 'Trial' } as HearingType;
    });

    it('should default to enabled', () => {
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('pdk-select select');
      expect(component.hearingTypeDisabled).toBe(false);
      expect(select.disabled).toBe(false);
    });

    it('should disable the hearing type select when set', () => {
      component.hearingTypeDisabled = true;
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('pdk-select select');
      expect(select.disabled).toBe(true);
    });

    it('should keep the preselected hearing type in the submit payload when disabled', () => {
      component.hearingTypeDisabled = true;
      component.allocations = [
        {
          hearingSlot: { courtScheduleId: '1', slotBased: true, sessionDate: '2025-04-09' },
          hearingSlotTime: '2025-04-09T09:00:00.000Z'
        }
      ] as unknown as HearingSlotAllocation[];
      jest.spyOn(component.hearingSlotAllocations, 'emit');

      component.handleSubmitAllocations();

      expect(component.hearingSlotAllocations.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          hearingType: expect.objectContaining({ id: '1' })
        })
      );
    });
  });
});
