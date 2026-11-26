import { HearingType } from '@cpp/reference-data';
import { HearingSlot, HearingSlotAllocation, SearchHearingSlotsParams } from './hearingSlot';

export type AllocationsFormConfigField = 'hearingType' | 'sendNotificationToParties';

export interface SchedulingSlotAllocationSubmit {
  hearingSlotAllocations: HearingSlotAllocation[];
  sendNotificationToParties?: boolean;
  hearingType?: HearingType;
}

export interface AllocationsFormConfig {
  formFields: AllocationsFormConfigField[];
}

export interface Allocation {
  params: SearchHearingSlotsParams | null;
  totalResults: number;
  hearingSlots: HearingSlot[];
}
