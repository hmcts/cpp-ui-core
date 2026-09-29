import { HearingSlotsTableComponent } from './hearing-slots-table.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessTypeDescriptionPipe } from '../../pipes/businessTypeDescription.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';
import {
  mockHearingSlotAmSession,
  mockHearingSlotDraftSession
} from '../../mocks/hearing-slot.mocks';

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
    component.hearingSlots = [mockHearingSlotAmSession];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display draft hearing slots correctly', () => {
    component.hearingSlots = [mockHearingSlotDraftSession];
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
