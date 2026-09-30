import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  ErrorMessageConfig,
  PdkHintComponent,
  PdkInsetTextComponent,
  PdkButton,
  PdkCore,
  PdkDateInput,
  PdkForm,
  PdkGrid,
  PdkRadio,
  PdkTextInput,
  PdkSelectComponent,
  SelectOption,
  ValidationError
} from '@cpp/pdk';
import { SchedulingFilters } from '../../types/filters';
import {
  CppReferenceDataComponents,
  OrganisationUnit,
  RotaBusinessType
} from '@cpp/reference-data';
import * as utils from '../../utils';
import { DatePipe } from '@angular/common';
import { EstimateInput } from '../estimate-input/estimate-input';
import { FormsModule } from '@angular/forms';

const courtSessionOptions: SelectOption<SchedulingFilters['courtSession'] | undefined>[] = [
  { value: undefined, label: 'Any' },
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
  { value: 'AD', label: 'All day' }
];

const panelOptions: SelectOption<SchedulingFilters['panel']>[] = [
  { value: 'ADULT', label: 'Adult' },
  { value: 'YOUTH', label: 'Youth' }
];

@Component({
  selector: 'scheduling-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./scheduling-filters.component.html`,
  styleUrls: ['./scheduling-filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    PdkSelectComponent,
    PdkInsetTextComponent,
    PdkGrid,
    PdkRadio,
    PdkButton,
    PdkCore,
    CppReferenceDataComponents,
    DatePipe,
    EstimateInput,
    PdkForm,
    PdkHintComponent,
    PdkTextInput,
    PdkDateInput
  ]
})
export class SchedulingFiltersComponent implements OnChanges {
  @Input() set defaultValues(defaultValues: SchedulingFilters) {
    this.formModel = { ...defaultValues, isSlotBased: defaultValues?.isSlotBased ?? true };
    if (!this.initialValues) {
      this.initialValues = {
        sessionStartDate: defaultValues?.sessionStartDate,
        sessionEndDate: defaultValues?.sessionEndDate,
        organisationUnit: defaultValues?.organisationUnit,
        oucodeL2Code: defaultValues?.oucodeL2Code,
        isSlotBased: true
      };
    }
  }
  @Input() set organisationUnits(organisationUnits: OrganisationUnit[]) {
    this.operationalUnitOptions = utils.getOperationalUnitOptions(organisationUnits);
  }
  @Input() rotaBusinessTypes?: RotaBusinessType[];
  @Input() minimumDate?: string;
  /**
   * Validation messages for Start date. Consumers own this copy because minimumDate is generic,
   * so a rule such as minDate means something different to each of them. Overriding replaces the
   * whole list, so include the required message alongside any rule you add.
   */
  @Input() startDateErrorMessages: ErrorMessageConfig[] = [
    {
      rule: 'required',
      message: 'Enter a start date'
    }
  ];
  @Input() enableMultiDay = true;
  @Output() errors = new EventEmitter<ValidationError[] | null>();
  @Output() filtersSubmit = new EventEmitter<SchedulingFilters>();

  formModel!: SchedulingFilters;
  initialValues!: SchedulingFilters;
  operationalUnitOptions: SelectOption<string>[] = [];
  organisationUnitPlaceholder?: OrganisationUnit;
  courtSessionOptions: SelectOption<SchedulingFilters['courtSession'] | undefined>[] =
    courtSessionOptions;
  panelOptions: SelectOption<SchedulingFilters['panel']>[] = panelOptions;
  slotFilterFn = (rotaBusinessType: RotaBusinessType) => !rotaBusinessType.duration;
  durationFilterFn = (rotaBusinessType: RotaBusinessType) => rotaBusinessType.duration;
  protected readonly utils = utils;
  constructor() {}

  ngOnChanges(): void {
    if (this.formModel?.oucodeL2Code) {
      this.handleOperationalUnitChanged(this.formModel.oucodeL2Code!);
    }
  }

  handleFiltersSubmit() {
    const filteredFormModel = this.filterFormModel(this.formModel);
    this.filtersSubmit.emit(filteredFormModel);
  }

  filterFormModel(formModel: SchedulingFilters): SchedulingFilters {
    return (Object.keys(formModel) as (keyof SchedulingFilters)[]).reduce((reducedParams, key) => {
      if (key === 'isMultiday' || key === 'isSlotBased') {
        return { ...reducedParams, [key]: formModel[key] };
      }
      if (
        !formModel[key] ||
        (key === 'organisationUnit' && formModel[key] === this.organisationUnitPlaceholder) ||
        key === 'hearingType' || // Exclude hearingType as it's not part of the scheduling filters form
        (key === 'availableDurationMins' && formModel.isSlotBased) // SJP will populate duration on a previous step instead of using duration input, as this will be disabled by enableMultiDay = false, so multi day is not allowed.
      ) {
        return reducedParams;
      }
      return {
        ...reducedParams,
        [key]: formModel[key]
      };
    }, {}) as SchedulingFilters;
  }

  filterByOperationalUnit = (organisationUnit: OrganisationUnit): boolean =>
    utils.isMagistratesCourt(organisationUnit) &&
    (!this.formModel?.oucodeL2Code ||
      this.formModel.oucodeL2Code === organisationUnit.oucodeL2Code);

  handleOperationalUnitChanged(oucodeL2Code?: string): void {
    const orgUnitplaceholder = {
      id: '',
      oucodeL1Code: 'B',
      oucodeL2Code,
      oucodeL3Name: 'All courts',
      oucodeL3Code: 'All courts'
    } as OrganisationUnit;

    this.organisationUnitPlaceholder = orgUnitplaceholder;

    if (
      !this.formModel.organisationUnit ||
      this.formModel.organisationUnit.oucodeL2Code !== oucodeL2Code
    ) {
      this.formModel.organisationUnit = orgUnitplaceholder;
    }

    if (!oucodeL2Code) {
      if (this.formModel.organisationUnit === this.organisationUnitPlaceholder) {
        this.formModel.organisationUnit = undefined;
      }
      this.organisationUnitPlaceholder = undefined;
    }
  }

  handleCourtChanged(): void {
    this.formModel.courtRoomId = undefined;
  }

  bookingTypeChange(isSlotBased: boolean): void {
    if (isSlotBased) {
      if (this.enableMultiDay) {
        this.formModel.availableDurationMins = undefined;
      }
      this.formModel.isMultiday = undefined;
      this.formModel.courtSession = undefined;
    } else {
      this.formModel.isMultiday = false;

      if (this.enableMultiDay) {
        this.updateCourtSession(false);
      }
    }
    this.formModel.businessType = undefined;
  }

  updateCourtSession(isMultiday: boolean): void {
    if (isMultiday) {
      this.formModel.availableDurationMins = 360;
      this.formModel.courtSession = 'AD';
    } else {
      this.formModel.availableDurationMins = undefined;
      this.formModel.courtSession = undefined;
    }
  }

  handleResetForm() {
    this.formModel = {
      ...this.initialValues
    };
    this.handleOperationalUnitChanged(this.initialValues.organisationUnit?.oucodeL2Code);
  }
}
