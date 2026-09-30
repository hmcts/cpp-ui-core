import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  PdkMarginDirective,
  PdkTable,
  ValidationError,
  PdkVisuallyHiddenDirective
} from '@cpp/pdk';
import { HearingSlot } from '../../types';
import { RotaBusinessType } from '@cpp/reference-data';

import { HearingSlotsRowComponent } from '../hearing-slots-row/hearing-slots-row.component';

@Component({
  selector: 'hearing-slots-table',
  templateUrl: './hearing-slots-table.component.html',
  imports: [PdkMarginDirective, PdkVisuallyHiddenDirective, PdkTable, HearingSlotsRowComponent]
})
export class HearingSlotsTableComponent {
  @Input() selectionMode: 'readonly' | 'single' | 'multi' = 'readonly';
  @Input() hearingSlots: HearingSlot[] = [];
  @Input() rotaBusinessTypesByCode: Record<string, RotaBusinessType> = {};
  @Input() selectedHearingSlotTimestamps: { [courtScheduleId: string]: string } = {};
  @Output() selectedHearingSlotTimestamp = new EventEmitter<Record<string, string>>();
  @Output() errors = new EventEmitter<ValidationError[] | null>();

  handleHearingSlotTimeChanged(selectedHearingSlotTimestamp: Record<string, string>) {
    this.selectedHearingSlotTimestamp.emit(selectedHearingSlotTimestamp);
  }
}
