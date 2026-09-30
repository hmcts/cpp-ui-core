import { Component, computed, EventEmitter, input, Input, Output } from '@angular/core';
import {
  PdkCheckboxComponent,
  PdkCore,
  PdkForm,
  PdkTable,
  PdkRadioButtonComponent,
  PdkSelectComponent,
  ValidationError
} from '@cpp/pdk';
import { HearingSlot } from '../../types';
import * as utils from '../../utils';
import { RotaBusinessType } from '@cpp/reference-data';
import { BusinessTypeDescriptionPipe } from '../../pipes/businessTypeDescription.pipe';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';
import { ListingNoteContainerComponent } from '../listing-notes/listing-note.container';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[hearing-slots-row]',
  templateUrl: './hearing-slots-row.component.html',
  styleUrls: ['./hearing-slots-row.component.scss'],
  imports: [
    BusinessTypeDescriptionPipe,
    DatePipe,
    DurationPipe,
    PdkSelectComponent,
    PdkRadioButtonComponent,
    PdkCheckboxComponent,
    PdkTable,
    PdkForm,
    PdkCore,
    NgTemplateOutlet,
    ListingNoteContainerComponent,
    FormsModule
  ]
})
export class HearingSlotsRowComponent {
  hearingSlot = input.required<HearingSlot>();
  selectedHearingSlotTimestamps = input.required<{ [courtScheduleId: string]: string }>();
  @Input() selectionMode: 'readonly' | 'single' | 'multi' = 'readonly';
  @Input() rotaBusinessTypesByCode: Record<string, RotaBusinessType> = {};
  @Output() selectedHearingSlotTimestamp = new EventEmitter<Record<string, string>>();
  @Output() errors = new EventEmitter<ValidationError[] | null>();

  readonly selectedTimestampModel = computed(() => {
    const hearingSlot = this.hearingSlot();
    const selectedHearingSlotTimestamps = this.selectedHearingSlotTimestamps();
    return (
      selectedHearingSlotTimestamps[hearingSlot.courtScheduleId] ??
      utils.getHearingSlotTimestamp(hearingSlot)
    );
  });

  getHearingSlotTimeOptions(hearingSlot: HearingSlot) {
    return utils.getHearingSlotTimeOptions(hearingSlot);
  }

  handleHearingSlotTimeChanged({ courtScheduleId }: HearingSlot, hearingSlotTime: string) {
    this.selectedHearingSlotTimestamp.emit({
      [courtScheduleId]: hearingSlotTime
    });
  }
}
