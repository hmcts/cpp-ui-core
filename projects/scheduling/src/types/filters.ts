import { HearingType, OrganisationUnit } from '@cpp/reference-data';
import { CourtSession, CrownSessionStatus, Panel } from './hearingSlot';

export interface SchedulingFilters {
  oucodeL2Code?: string;
  organisationUnit?: OrganisationUnit;
  courtRoomId?: string;
  sessionStartDate: string;
  sessionEndDate?: string;
  courtSession?: CourtSession;
  businessType?: string;
  availableDurationMins?: number;
  hearingType?: HearingType;
  isMultiday?: boolean;
  isSlotBased?: boolean;
  panel?: Panel;
}

export type MagistratesSchedulingFilters = SchedulingFilters;

export enum CrownSessionStatusFilterOption {
  NONE = 'NONE',
  ALL = 'ALL'
}

export type CrownSessionStatusFilter = CrownSessionStatusFilterOption | string;

export interface CrownSchedulingFilters extends SchedulingFilters {
  sessionStatusFilter?: CrownSessionStatusFilter;
  status?: CrownSessionStatus;
}
