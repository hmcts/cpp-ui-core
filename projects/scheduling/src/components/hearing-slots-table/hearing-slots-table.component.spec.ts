import { HearingSlotsTableComponent } from './hearing-slots-table.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessTypeDescriptionPipe } from '../../pipes/businessTypeDescription.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';
import { HearingSlot } from '../../types';

describe('HearingSlotsTableComponent', () => {
  let component: HearingSlotsTableComponent;
  let fixture: ComponentFixture<HearingSlotsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HearingSlotsTableComponent, DurationPipe, BusinessTypeDescriptionPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingSlotsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render action header', () => {
    component.selectionMode = 'single';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display hearing slots correctly', () => {
    component.hearingSlots = [
      {
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
      } as HearingSlot
    ];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit selected hearing slot timestamp', () => {
    const mockTimestamp: Record<string, string> = { 1: '2025-04-11T09:00:00' };
    jest.spyOn(component.selectedHearingSlotTimestamp, 'emit');

    component.handleHearingSlotTimeChanged(mockTimestamp);

    expect(component.selectedHearingSlotTimestamp.emit).toHaveBeenCalledWith(mockTimestamp);
  });
});
