import { HearingSlot } from '../types';

const mockHearingSlotAmSessionFields = {
  courtSession: 'AM',
  sessionDate: '2025-03-25',
  slotStartTimes: [
    {
      sessionStartTime: '2025-03-25T10:00:00.000Z',
      sessionEndTime: '2025-03-25T11:00:00.000Z',
      count: 1
    }
  ],
  allDaySplit: false
};

export const mockHearingSlotAmSession = {
  courtScheduleId: 'slot-1',
  ...mockHearingSlotAmSessionFields
} as HearingSlot;

export const mockHearingSlotDraftSession = {
  ...mockHearingSlotAmSession,
  draft: true,
  courtHouseName: 'Luton Crown Court'
} as HearingSlot;
