import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PdkGrid,
  PdkRadio,
  PdkHintComponent,
  PdkForm,
  PdkCore,
  PdkTextInput,
  PdkSelectComponent,
  SelectOption
} from '@cpp/pdk';
import {
  CppReferenceDataComponents,
  Jurisdiction,
  OrganisationUnit,
  RotaBusinessType
} from '@cpp/reference-data';
import { SchedulingFilters } from '../../types/filters';
import { EstimateInput } from '../estimate-input/estimate-input';

@Component({
  selector: 'scheduling-filters-court-and-booking',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduling-filters-court-and-booking.component.html',
  styleUrls: ['./scheduling-filters-court-and-booking.component.scss'],
  imports: [
    FormsModule,
    PdkGrid,
    PdkRadio,
    PdkHintComponent,
    PdkForm,
    PdkCore,
    PdkTextInput,
    PdkSelectComponent,
    CppReferenceDataComponents,
    EstimateInput
  ]
})
export class SchedulingFiltersCourtAndBookingComponent {
  @Input({ required: true }) formModel!: SchedulingFilters;
  @Input() operationalUnitOptions: SelectOption<string>[] = [];
  @Input() organisationUnitPlaceholder?: OrganisationUnit;
  @Input({ required: true }) filterByOperationalUnit!: (unit: OrganisationUnit) => boolean;

  @Input({ required: true }) jurisdiction!: Jurisdiction;
  @Input() enableMultiDay = true;
  @Input({ required: true }) slotFilterFn!: (rotaBusinessType: RotaBusinessType) => boolean;
  @Input({ required: true }) durationFilterFn!: (rotaBusinessType: RotaBusinessType) => boolean;

  @Output() operationalUnitChanged = new EventEmitter<string | undefined>();
  @Output() courtChanged = new EventEmitter<void>();
  @Output() bookingTypeChange = new EventEmitter<boolean>();
  @Output() multidayChange = new EventEmitter<boolean>();
}
