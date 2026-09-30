import { HearingSlot, SearchHearingSlotsParams } from './hearingSlot';

export type AllocationsFormConfigField = 'hearingType' | 'sendNotificationToParties';

export interface AllocationsFormConfig {
  formFields: AllocationsFormConfigField[];
}

export interface Allocation {
  params: SearchHearingSlotsParams | null;
  totalResults: number;
  hearingSlots: HearingSlot[];
}
