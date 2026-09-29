import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  PdkPaginationComponent,
  PdkButton,
  PdkCore,
  PdkForm,
  PdkGrid,
  PdkRadio,
  PdkSelectComponent,
  SelectOption,
  ValidationError
} from '@cpp/pdk';
import {
  AllocationsFormConfig,
  AllocationsFormConfigField,
  HearingSlot,
  HearingSlotAllocation,
  SchedulingSlotAllocationSubmit
} from '../../types';
import * as utils from '../../utils';
import { HearingType, RotaBusinessType } from '@cpp/reference-data';
import { HearingSlotsTableComponent } from '../hearing-slots-table/hearing-slots-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'crown-scheduling-slots',
  templateUrl: './crown-scheduling-slots.component.html',
  styles: [''],
  imports: [
    HearingSlotsTableComponent,
    PdkPaginationComponent,
    PdkSelectComponent,
    PdkGrid,
    PdkButton,
    PdkRadio,
    PdkCore,
    PdkForm,
    FormsModule
  ]
})
export class CrownSchedulingSlotsComponent {
  @Input() selectionMode: 'readonly' | 'single' = 'single';
  @Input() currentPage = 1;
  @Input() hearingSlots: HearingSlot[] = [];
  @Input() hearingSlotMinutes?: number = 0;
  @Input() pageSize = 10;
  @Input() totalResults = 0;
  @Input() formConfig: AllocationsFormConfig | undefined;

  @Input()
  set rotaBusinessTypes(rotaBusinessTypes: RotaBusinessType[]) {
    this.rotaBusinessTypesByCode = rotaBusinessTypes.reduce((map, rotaBusinessType) => {
      map[rotaBusinessType.typeCode] = rotaBusinessType;
      return map;
    }, {} as Record<string, RotaBusinessType>);
  }

  private _hearingTypes: HearingType[] = [];

  @Input()
  set hearingTypes(hearingTypes: HearingType[]) {
    this._hearingTypes = hearingTypes;
    this.hearingTypesOptions = hearingTypes.map((hearingType) => ({
      value: hearingType.id,
      label: hearingType.hearingDescription
    }));
  }

  get hearingTypes(): HearingType[] {
    return this._hearingTypes;
  }

  @Input()
  set hearingType(hearingType: HearingType | undefined) {
    this.selectedHearingTypeId = hearingType?.id ?? null;
  }

  @Output() errors = new EventEmitter<ValidationError[] | null>();
  @Output() hearingSlotAllocations = new EventEmitter<SchedulingSlotAllocationSubmit>();
  @Output() pageChange = new EventEmitter<number>();

  selectedHearingTypeId: string | null = null;
  selectedHearingSlotTimestamps: { [courtScheduleId: string]: string } = {};
  allocations: HearingSlotAllocation[] = [];
  selectedSlotsModel: string[] = [];
  rotaBusinessTypesByCode: Record<string, RotaBusinessType> = {};
  hearingTypesOptions: SelectOption<string>[] = [];

  private _sendNotificationToParties = false;

  get sendNotificationToParties(): boolean | undefined {
    return this.isFieldEnabled('sendNotificationToParties')
      ? this._sendNotificationToParties
      : undefined;
  }

  set sendNotificationToParties(value: boolean | undefined) {
    this._sendNotificationToParties = value ?? false;
  }

  handleSubmitAllocations() {
    this.errors.emit(null);
    this.allocations.sort((a, b) => +new Date(a.hearingSlotTime) - +new Date(b.hearingSlotTime));

    this.hearingSlotAllocations.emit({
      hearingSlotAllocations: this.allocations,
      sendNotificationToParties: this.sendNotificationToParties,
      hearingType: this._hearingTypes.find(
        (hearingType) => hearingType.id === this.selectedHearingTypeId
      )
    });
  }

  reset() {
    this.selectedSlotsModel = [];
    this.allocations = [];
  }

  handleAllocationChanged(newSelectedSlotsModel: string[]) {
    const existingAllocations = this.allocations.filter(({ hearingSlot }) =>
      newSelectedSlotsModel.includes(hearingSlot.courtScheduleId)
    );

    const existingIds = existingAllocations.map(({ hearingSlot }) => hearingSlot.courtScheduleId);

    const newAllocations = newSelectedSlotsModel
      .filter((id) => !existingIds.includes(id))
      .map((id) => {
        const hearingSlot = this.getHearingSlot(id);
        if (!hearingSlot) return null;

        const startTime = this.selectedHearingSlotTimestamps[id];
        const hearingSlotTime = startTime || utils.getHearingSlotTimestamp(hearingSlot);

        return {
          hearingSlot,
          hearingSlotTime,
          ...(!hearingSlot.slotBased ? { duration: this.hearingSlotMinutes } : {})
        } as HearingSlotAllocation;
      })
      .filter((allocation): allocation is HearingSlotAllocation => allocation !== null);

    this.allocations = [...existingAllocations, ...newAllocations];
  }

  handleHearingSlotTimeChanged(selectedHearingSlotTimestamp: Record<string, string>) {
    const courtScheduleId = Object.keys(selectedHearingSlotTimestamp)[0];

    this.selectedHearingSlotTimestamps = {
      ...this.selectedHearingSlotTimestamps,
      ...selectedHearingSlotTimestamp
    };

    const allocation = this.getAllocation(courtScheduleId);

    if (allocation) {
      allocation.hearingSlotTime = this.selectedHearingSlotTimestamps[courtScheduleId];
    }
  }

  isFieldEnabled(field: AllocationsFormConfigField): boolean {
    return this.formConfig?.formFields?.includes(field) ?? false;
  }

  handleDisabled(): boolean {
    const hasAllocations = this.allocations.length > 0;
    const hearingTypeValid = !this.isFieldEnabled('hearingType') || !!this.selectedHearingTypeId;

    return !(hasAllocations && hearingTypeValid);
  }

  private getAllocation(courtScheduleId: string): HearingSlotAllocation | undefined {
    return this.allocations.find(
      (allocation) => allocation.hearingSlot.courtScheduleId === courtScheduleId
    );
  }

  private getHearingSlot(courtScheduleId: string): HearingSlot | undefined {
    return this.hearingSlots.find((hearingSlot) => hearingSlot.courtScheduleId === courtScheduleId);
  }
}
