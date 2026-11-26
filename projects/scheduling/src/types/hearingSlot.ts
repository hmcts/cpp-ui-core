import { Jurisdiction } from '@cpp/reference-data';

enum PanelType {
  ADULT = 'ADULT',
  YOUTH = 'YOUTH'
}

export type CourtSession = 'AM' | 'PM' | 'AD';
export type Panel = 'ADULT' | 'YOUTH' | 'ADULT,YOUTH';

export interface HearingSlot {
  courtScheduleId: string;
  panel: PanelType;
  sessionDate: string;
  courtHouseName: string;
  courtRoomName?: string;
  courtSession: CourtSession;
  maxSlots?: number;
  maxDuration?: number;
  availableSlots?: number;
  availableDuration?: number;
  availableDurationForMorning?: number;
  availableDurationForAfternoon?: number;
  businessType?: string;
  hearingType?: string;
  ouCode?: string;
  courtRoomId?: string;
  courtHouseId?: string;
  courtRoomNumber?: number;
  judiciaries?: HearingSlotJudiciary[];
  slotStartTimes: {
    sessionStartTime: string;
    sessionEndTime: string;
    count: number;
  }[];
  allDaySplit?: boolean;
  totalBooked?: number;
  totalBookedForMorning?: number;
  totalBookedForAfternoon?: number;
  slotBased: boolean;
  sessionStartTime: string;
  sessionEndTime: string;
  minHearingTime: string;
  maxHearingTime: string;
  overbookingAllowed: boolean;
  maxDurationForMorning?: number;
  maxDurationForAfternoon?: number;
  createdOn: string;
  updatedOn: string;
  draft?: boolean;
}

export interface HearingSlotJudiciary {
  judiciaryId: string;
  courtScheduleId: string;
  courtListingProfileId: string;
  judiciaryType: string;
  deputy: boolean;
  benchChairman: boolean;
}

export interface HearingSlotAllocation {
  hearingSlot: HearingSlot;
  hearingSlotTime: string;
  duration?: number;
}

export enum CrownSessionStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
  ALL = 'ALL'
}

export interface SearchHearingSlotsParams {
  oucodeL2Code?: string;
  oucodeL3Code?: string;
  courtRoomId?: string;
  sessionStartDate: string;
  sessionEndDate?: string;
  courtSession?: CourtSession;
  panel?: Panel;
  businessType?: string;
  availableDurationMins?: number;
  pageSize?: number;
  pageNumber?: number;
  ouCode?: string;
  duration?: number;
  slots?: number;
  isUnscheduled?: boolean;
  hearingTypeId?: string;
  showOverbookedSlots?: boolean;
  hearingStartTime?: string;
  status?: CrownSessionStatus;
  jurisdiction: Jurisdiction;
}
