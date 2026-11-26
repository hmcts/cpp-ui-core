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

  /**
   * The radio group wraps the table from the parent, while `pdk-radio-button` instances live in
   * nested row templates. Selecting a radio still updates the group value, but if the parent sets the
   * group value from outside, the nested radios are not being updated because the
   * group’s `ContentChildren` lookup cannot see into another component’s template.
   *  As a workaround, this track returns a new unique key each
   * time so `@for` remounts rows and the visible selection can match the model.
   */
  trackByCourtScheduleId(hearingSlot: HearingSlot): string {
    return `${hearingSlot.courtScheduleId}-${(Date.now() * Math.random()).toString()}`;
  }
}
