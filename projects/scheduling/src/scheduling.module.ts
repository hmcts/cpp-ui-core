import { NgModule } from '@angular/core';
import { SchedulingSlotsComponent } from './components/scheduling-slots/scheduling-slots.component';
import { SchedulingFiltersComponent } from './components/scheduling-filters/scheduling-filters.component';
import { EstimateInput } from './components/estimate-input/estimate-input';
import { StoreModule } from '@ngrx/store';
import { schedulingReducer } from './reducers';
import { ALLOCATION_FORM_CONFIGS, allocationFormConfigs } from './utils';
import { ListingNoteContainerComponent } from './components/listing-notes/listing-note.container';

// Reference: https://v16.angular.io/cli/generate#library-command
// TODO: After upgrading from Angular 15, update the library to use the standalone API.

const SHARED = [
  SchedulingSlotsComponent,
  SchedulingFiltersComponent,
  EstimateInput,
  ListingNoteContainerComponent
];

/**
 * @deprecated
 * This will be removed in some release moving forward but is
 * left here for Backward compatilibity.
 *
 * To use scheduling, remove the module where used.
 * In the app module or Bootstrap function (Standalone) or Route ,
 * provide Scheduling context using the following as per preference
 *  @method provideSchedulingEnvironmentContext
 * - This will provide the configs  inclusive of the feature store.
 *  @method provideSchedulingstore
 * - You can provide just the feature store using this method  in your module or route providers and import the config you need on demand.
 *
 *
 * PLEASE ENSURE THAT YOUR BOOTSTRAP OR APPMODULE USES THE PROVIDESTORE as the root prior to using any of the methods above mentioned. You can
 * mix StoreModule.forRoot and provideStore if the application is still modular - Please refer to Ngrx docs for details
 *
 * Finally all scheduling components are standalone and can be imported on demand in the modules or standalone components
 * when needed. All exposed shared components have been exported as @constant cppSchedulingComponents
 */
@NgModule({
  declarations: [],
  imports: [...SHARED, StoreModule.forFeature('scheduling', schedulingReducer)],
  exports: SHARED,
  providers: [
    {
      provide: ALLOCATION_FORM_CONFIGS,
      useValue: allocationFormConfigs
    }
  ]
})
export class SchedulingModule {}
