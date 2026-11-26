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
  ValidationError,
  PdkInput
} from '@cpp/pdk';
import {
  getCrownCourtroomOptions,
  getOperationalUnitOptions,
  isCrownCourt,
  operationalUnitAllCourtsPlaceholder
} from '../../utils';
import {
  defaultSessionStatusFilterOption,
  searchFieldsForSessionFilter
} from '../../utils/sessionStatusFilter';
import {
  CrownSessionStatusFilter,
  CrownSessionStatusFilterOption,
  CrownSchedulingFilters
} from '../../types/filters';
import { COURT_SESSION_SELECT_OPTIONS } from '../../types/schedulingFilterOptions';
import { CrownSessionStatus } from '../../types/hearingSlot';
import {
  CppReferenceDataComponents,
  OrganisationUnit,
  RotaBusinessType
} from '@cpp/reference-data';
import { DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulingFiltersCourtAndBookingComponent } from '../scheduling-filters-court-and-booking/scheduling-filters-court-and-booking.component';

@Component({
  selector: 'crown-scheduling-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crown-scheduling-filters.component.html',
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
    PdkInput,
    PdkTextInput,
    SchedulingFiltersCourtAndBookingComponent
  ]
})
export class CrownSchedulingFiltersComponent {
  @Input() set defaultValues(defaultValues: CrownSchedulingFilters) {
    const defaultFilter = this.getDefaultSessionStatusFilter();
    const isSlotBased = defaultValues?.isSlotBased ?? false;
    this.formModel = {
      ...defaultValues,
      isSlotBased,
      sessionStatusFilter: defaultValues?.sessionStatusFilter ?? defaultFilter,
      ...(this.enableMultiDay &&
        !isSlotBased && {
          isMultiday: defaultValues?.isMultiday ?? false
        })
    };
    if (!this.initialValues) {
      this.initialValues = {
        sessionStartDate: defaultValues?.sessionStartDate,
        sessionEndDate: defaultValues?.sessionEndDate,
        organisationUnit: defaultValues?.organisationUnit,
        oucodeL2Code: defaultValues?.oucodeL2Code,
        isSlotBased: false,
        isMultiday: false,
        sessionStatusFilter: defaultFilter
      };
    }
    this.applyOperationalUnitByDefault();
  }
  @Input() set organisationUnits(organisationUnits: OrganisationUnit[]) {
    this.operationalUnitOptions = getOperationalUnitOptions(organisationUnits);
  }
  @Input() rotaBusinessTypes?: RotaBusinessType[];
  @Input() enableMultiDay = true;
  @Input() defaultSessionStatus?: CrownSessionStatus;
  @Output() errors = new EventEmitter<ValidationError[] | null>();
  @Output() filtersSubmit = new EventEmitter<CrownSchedulingFilters>();

  formModel!: CrownSchedulingFilters;
  initialValues!: CrownSchedulingFilters;
  operationalUnitOptions: SelectOption<string>[] = [];
  organisationUnitPlaceholder?: OrganisationUnit;
  courtSessionOptions = COURT_SESSION_SELECT_OPTIONS;
  slotFilterFn = (rotaBusinessType: RotaBusinessType) => !rotaBusinessType.duration;
  durationFilterFn = (rotaBusinessType: RotaBusinessType) => rotaBusinessType.duration;
  readonly minDate = input<string | undefined>(undefined);
  readonly allowPastDates = input(false);
  readonly effectiveMinDate = computed(
    () =>
      this.minDate() ??
      (this.allowPastDates() ? undefined : formatDate(new Date(), 'yyyy-MM-dd', 'en-GB'))
  );

  private applyOperationalUnitByDefault(): void {
    const code = this.formModel?.oucodeL2Code;
    if (!code) return;
    this.handleOperationalUnitChanged(code);
  }

  getCourtroomOptions(): SelectOption<CrownSessionStatusFilter>[] {
    return getCrownCourtroomOptions(this.formModel.organisationUnit, this.defaultSessionStatus);
  }

  getDefaultSessionStatusFilter(): CrownSessionStatusFilter {
    return defaultSessionStatusFilterOption(this.defaultSessionStatus ?? CrownSessionStatus.DRAFT);
  }

  handleFiltersSubmit() {
    const filteredFormModel = this.filterFormModel(this.formModel);
    this.filtersSubmit.emit(filteredFormModel);
  }

  filterFormModel(formModel: CrownSchedulingFilters): CrownSchedulingFilters {
    const reduced = (Object.keys(formModel) as (keyof CrownSchedulingFilters)[]).reduce(
      (reducedParams, key) => {
        if (key === 'isMultiday' || key === 'isSlotBased' || key === 'sessionStatusFilter') {
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
      {} as CrownSchedulingFilters
    );
    const searchFields = searchFieldsForSessionFilter(reduced.sessionStatusFilter);
    return { ...reduced, ...searchFields };
  }

  handleSessionStatusFilterChange(filter: CrownSessionStatusFilter | undefined): void {
    if (
      filter === CrownSessionStatusFilterOption.NONE ||
      filter === CrownSessionStatusFilterOption.ALL
    ) {
      this.formModel.courtRoomId = undefined;
    } else if (filter != null) {
      this.formModel.courtRoomId = filter;
    }
  }

  filterByOperationalUnit = (organisationUnit: OrganisationUnit): boolean =>
    isCrownCourt(organisationUnit) &&
    (!this.formModel?.oucodeL2Code ||
      this.formModel.oucodeL2Code === organisationUnit.oucodeL2Code);

  handleOperationalUnitChanged(oucodeL2Code?: string): void {
    const orgUnitPlaceholder = operationalUnitAllCourtsPlaceholder('C', oucodeL2Code);

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
    this.formModel.sessionStatusFilter = this.getDefaultSessionStatusFilter();
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
      this.formModel.availableDurationMins = undefined;
      this.formModel.courtSession = 'AD';
    } else {
      this.formModel.availableDurationMins = undefined;
      this.formModel.courtSession = undefined;
    }
  }

  handleResetForm() {
    this.formModel = {
      ...this.initialValues,
      organisationUnit: undefined,
      sessionStatusFilter: this.getDefaultSessionStatusFilter()
    };
    this.organisationUnitPlaceholder = undefined;
  }
}
