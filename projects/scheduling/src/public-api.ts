/*
 * Public API Surface of scheduling
 */

import { MagistratesSchedulingFiltersComponent } from './components/magistrates-scheduling-filters/magistrates-scheduling-filters.component';
import { MagistratesSchedulingSlotsComponent } from './components/magistrates-scheduling-slots/magistrates-scheduling-slots.component';
import { CrownSchedulingFiltersComponent } from './components/crown-scheduling-filters/crown-scheduling-filters.component';
import { CrownSchedulingSlotsComponent } from './components/crown-scheduling-slots/crown-scheduling-slots.component';
import { EstimateInput } from './components/estimate-input/estimate-input';
import { ListingNoteContainerComponent } from './components/listing-notes/listing-note.container';

export const cppSchedulingComponents = [
  MagistratesSchedulingFiltersComponent,
  MagistratesSchedulingSlotsComponent,
  CrownSchedulingFiltersComponent,
  CrownSchedulingSlotsComponent,
  EstimateInput,
  ListingNoteContainerComponent
] as const;

export {
  MagistratesSchedulingFiltersComponent,
  MagistratesSchedulingSlotsComponent,
  CrownSchedulingFiltersComponent,
  CrownSchedulingSlotsComponent,
  EstimateInput,
  ListingNoteContainerComponent
};

export * from './types/';
export * from './reducers/index';
export * from './actions/scheduling.actions';
export * from './actions/listing-notes.actions';
export * from './selectors/scheduling';
export * from './selectors/listing-notes';
export * from './selectors/index';
export * from './utils/index';
export * from './services/scheduling.service';
export * from './services/listing-notes.service';
export * from './providers';
