import { SelectOption } from '@cpp/pdk';
import type { CourtSession } from './hearingSlot';

export const COURT_SESSION_SELECT_OPTIONS: SelectOption<CourtSession | undefined>[] = [
  { value: undefined, label: 'Any' },
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
  { value: 'AD', label: 'All day' }
];
