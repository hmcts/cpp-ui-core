import { HearingType, OrganisationUnit } from '@cpp/reference-data';
import { CourtSession, Panel } from './hearingSlot';

export interface SchedulingFilters {
  oucodeL2Code?: string;
  organisationUnit?: OrganisationUnit;
  courtRoomId?: string;
  sessionStartDate: string;
  sessionEndDate?: string;
  courtSession?: CourtSession;
  panel?: Panel;
  businessType?: string;
  availableDurationMins?: number;
  hearingType?: HearingType;
  isMultiday?: boolean;
  isSlotBased?: boolean;
}
