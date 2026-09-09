import {
  ChangeDetectionStrategy,
  computed,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  ErrorMessageConfig,
  PdkButton,
  PdkCore,
  PdkDateInput,
  PdkForm,
  PdkGrid,
  PdkInsetTextComponent,
  PdkRadio,
  PdkTextInput,
  PdkSelectComponent,
  SelectOption,
  ValidationError
} from '@cpp/pdk';
import { MagistratesSchedulingFilters } from '../../types/filters';
import { COURT_SESSION_SELECT_OPTIONS } from '../../types/schedulingFilterOptions';
import {
  CppReferenceDataComponents,
  OrganisationUnit,
  RotaBusinessType
} from '@cpp/reference-data';
import * as utils from '../../utils';
import { operationalUnitAllCourtsPlaceholder } from '../../utils/operationalUnit';
import { DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulingFiltersCourtAndBookingComponent } from '../scheduling-filters-court-and-booking/scheduling-filters-court-and-booking.component';

const panelOptions: SelectOption<MagistratesSchedulingFilters['panel']>[] = [
  { value: 'ADULT', label: 'Adult' },
  { value: 'YOUTH', label: 'Youth' }
];

@Component({
  selector: 'magistrates-scheduling-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './magistrates-scheduling-filters.component.html',
  styleUrls: ['../scheduling-filters.layout.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    DatePipe,
    PdkSelectComponent,
    PdkGrid,
    PdkRadio,
    PdkButton,
    PdkCore,
    PdkDateInput,
    PdkInsetTextComponent,
    CppReferenceDataComponents,
    PdkForm,
    PdkTextInput,
    SchedulingFiltersCourtAndBookingComponent
  ]
})
export class MagistratesSchedulingFiltersComponent {
  @Input() set defaultValues(defaultValues: MagistratesSchedulingFilters) {
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
    this.applyOperationalUnitByDefault();
  }
  @Input() set organisationUnits(organisationUnits: OrganisationUnit[]) {
    this.operationalUnitOptions = utils.getOperationalUnitOptions(organisationUnits);
  }
  @Input() rotaBusinessTypes?: RotaBusinessType[];
  /**
   * Validation messages for Start date. Consumers own this copy because minDate is generic,
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
  @Output() filtersSubmit = new EventEmitter<MagistratesSchedulingFilters>();

  formModel!: MagistratesSchedulingFilters;
  initialValues!: MagistratesSchedulingFilters;
  operationalUnitOptions: SelectOption<string>[] = [];
  organisationUnitPlaceholder?: OrganisationUnit;
  courtSessionOptions = COURT_SESSION_SELECT_OPTIONS;
  panelOptions: SelectOption<MagistratesSchedulingFilters['panel']>[] = panelOptions;
  slotFilterFn = (rotaBusinessType: RotaBusinessType) => !rotaBusinessType.duration;
  durationFilterFn = (rotaBusinessType: RotaBusinessType) => rotaBusinessType.duration;
  protected readonly utils = utils;
  readonly minDate = input<string | undefined>(undefined);
  readonly allowPastDates = input(false);
  readonly effectiveMinDate = computed(
    () =>
      this.minDate() ??
      (this.allowPastDates() ? undefined : formatDate(new Date(), 'yyyy-MM-dd', 'en-GB'))
  );

  private applyOperationalUnitByDefault(): void {
    const ouCode = this.formModel?.oucodeL2Code;
    if (!ouCode) return;
    this.handleOperationalUnitChanged(ouCode);
  }

  handleFiltersSubmit() {
    const filteredFormModel = this.filterFormModel(this.formModel);
    this.filtersSubmit.emit(filteredFormModel);
  }

  filterFormModel(formModel: MagistratesSchedulingFilters): MagistratesSchedulingFilters {
    return (Object.keys(formModel) as (keyof MagistratesSchedulingFilters)[]).reduce(
      (reducedParams, key) => {
        if (key === 'isMultiday' || key === 'isSlotBased') {
          return { ...reducedParams, [key]: formModel[key] };
        }
        if (
          !formModel[key] ||
          (key === 'organisationUnit' && formModel[key] === this.organisationUnitPlaceholder) ||
          key === 'hearingType' ||
          (key === 'availableDurationMins' && formModel.isSlotBased)
        ) {
          return reducedParams;
        }
        return {
          ...reducedParams,
          [key]: formModel[key]
        };
      },
      {}
    ) as MagistratesSchedulingFilters;
  }

  filterByOperationalUnit = (organisationUnit: OrganisationUnit): boolean =>
    utils.isMagistratesCourt(organisationUnit) &&
    (!this.formModel?.oucodeL2Code ||
      this.formModel.oucodeL2Code === organisationUnit.oucodeL2Code);

  handleOperationalUnitChanged(oucodeL2Code?: string): void {
    const orgUnitPlaceholder = operationalUnitAllCourtsPlaceholder('B', oucodeL2Code);

    this.organisationUnitPlaceholder = orgUnitPlaceholder;

    if (
      !this.formModel.organisationUnit ||
      this.formModel.organisationUnit.oucodeL2Code !== oucodeL2Code
    ) {
      this.formModel.organisationUnit = orgUnitPlaceholder;
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
      ...this.initialValues,
      organisationUnit: undefined
    };
    this.organisationUnitPlaceholder = undefined;
  }
}
