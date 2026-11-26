import { HearingSlot, SearchHearingSlotsParams } from '../types';
import { loadHearingSlotsSuccess, resetHearingSlots } from './scheduling.actions';

describe('Scheduling slots actions', () => {
  it('Should create a loadHearingSlotsSuccess action', () => {
    const params = {
      sessionStartDate: '2025-04-10'
    } as SearchHearingSlotsParams;

    const hearingSlots: HearingSlot[] = [
      {
        courtScheduleId: '1',
        panel: 'ADULT',
        sessionDate: '2025-04-10',
        courtSession: 'AM',
        slotBased: true
      } as HearingSlot
    ];

    const totalResults = 1;

    const action = loadHearingSlotsSuccess({ params, hearingSlots, totalResults });

    expect(action).toEqual({
      type: 'LOAD_SCHEDULING_SLOTS_SUCCESS',
      params,
      hearingSlots,
      totalResults
    });
  });

  it('Should create a resetHearingSlots action', () => {
    const action = resetHearingSlots();

    expect(action).toEqual({
      type: 'RESET_SCHEDULING_SLOTS'
    });
  });
});
