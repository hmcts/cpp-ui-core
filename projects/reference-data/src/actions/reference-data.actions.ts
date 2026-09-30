import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  PublicHoliday,
  BookingType,
  Cluster,
  CourtApplicationType,
  CPSArea,
  CPSBusinessUnit,
  CPSCaseStatus,
  FixedList,
  HearingPriority,
  HearingType,
  JudiciaryGroupType,
  LocalJusticeArea,
  OrganisationUnit,
  PleaType,
  PoliceForce,
  PoliceRank,
  Prosecutor,
  ResultDefinition,
  RotaBusinessType,
  SpecialRequirement,
  TrialType,
  WitnessCareUnit,
  OrganisationWithType,
  OrganisationType
} from '../reference-data.interfaces';

export const loadApplicationTypes = createAction('LOAD_APPLICATION_TYPES');

export const loadApplicationTypesSuccess = createAction(
  'LOAD_APPLICATION_TYPES_SUCCESS',
  props<{ applicationTypes: CourtApplicationType[] }>()
);

export const loadApplicationTypesError = createAction(
  'LOAD_APPLICATION_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadAssignPriorities = createAction('LOAD_ASSIGN_PRIORITIES');

export const loadAssignPrioritiesSuccess = createAction(
  'LOAD_ASSIGN_PRIORITIES_SUCCESS',
  props<{ assignPriorities: HearingPriority[] }>()
);

export const loadAssignPrioritiesError = createAction(
  'LOAD_ASSIGN_PRIORITIES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadBookingTypes = createAction('LOAD_BOOKING_TYPES');

export const loadBookingTypesSuccess = createAction(
  'LOAD_BOOKING_TYPES_SUCCESS',
  props<{ bookingTypes: BookingType[] }>()
);

export const loadBookingTypesError = createAction(
  'LOAD_BOOKING_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadClusters = createAction('LOAD_CLUSTERS');

export const loadClustersSuccess = createAction(
  'LOAD_CLUSTERS_SUCCESS',
  props<{ clusters: Cluster[] }>()
);

export const loadClustersError = createAction(
  'LOAD_CLUSTERS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadCPSAreas = createAction('LOAD_CPS_AREAS');

export const loadCPSAreasSuccess = createAction(
  'LOAD_CPS_AREAS_SUCCESS',
  props<{ cpsAreas: CPSArea[] }>()
);

export const loadCPSAreasError = createAction(
  'LOAD_CPS_AREAS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadCPSBusinessUnits = createAction('LOAD_CPS_BUSINESS_UNITS');

export const loadCPSBusinessUnitsSuccess = createAction(
  'LOAD_CPS_BUSINESS_UNITS_SUCCESS',
  props<{ cpsBusinessUnits: CPSBusinessUnit[] }>()
);

export const loadCPSBusinessUnitsError = createAction(
  'LOAD_CPS_BUSINESS_UNITS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadCPSCaseStatuses = createAction('LOAD_CPS_CASE_STATUSES');

export const loadCPSCaseStatusesSuccess = createAction(
  'LOAD_CPS_CASE_STATUSES_SUCCESS',
  props<{ cpsCaseStatuses: CPSCaseStatus[] }>()
);

export const loadCPSCaseStatusesError = createAction(
  'LOAD_CPS_CASE_STATUSES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadOrganisationUnits = createAction('LOAD_COURT_CENTRES');

export const loadOrganisationUnitsSuccess = createAction(
  'LOAD_COURT_CENTRES_SUCCESS',
  props<{ organisationUnits: OrganisationUnit[] }>()
);

export const loadOrganisationUnitsError = createAction(
  'LOAD_COURT_CENTRES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadFixedLists = createAction('LOAD_FIXED_LISTS');

export const loadFixedListsSuccess = createAction(
  'LOAD_FIXED_LISTS_SUCCESS',
  props<{ fixedLists: FixedList[] }>()
);

export const loadFixedListsError = createAction(
  'LOAD_FIXED_LISTS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadHearingTypes = createAction('LOAD_HEARING_TYPES');

export const loadHearingTypesSuccess = createAction(
  'LOAD_HEARING_TYPES_SUCCESS',
  props<{ hearingTypes: HearingType[] }>()
);

export const loadHearingTypesError = createAction(
  'LOAD_HEARING_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadJudiciaryGroupTypes = createAction('LOAD_JUDICIARY_GROUP_TYPES');

export const loadJudiciaryGroupTypesSuccess = createAction(
  'LOAD_JUDICIARY_GROUP_TYPES_SUCCESS',
  props<{ judiciaryGroupTypes: JudiciaryGroupType[] }>()
);

export const loadJudiciaryGroupTypesError = createAction(
  'LOAD_JUDICIARY_GROUP_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadLocalJusticeAreas = createAction('LOAD_LOCAL_JUSTICE_AREAS');

export const loadLocalJusticeAreasSuccess = createAction(
  'LOAD_LOCAL_JUSTICE_AREAS_SUCCESS',
  props<{ localJusticeAreas: LocalJusticeArea[] }>()
);

export const loadLocalJusticeAreasError = createAction(
  'LOAD_LOCAL_JUSTICE_AREAS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadPleaTypes = createAction('LOAD_PLEA_TYPES');

export const loadPleaTypesSuccess = createAction(
  'LOAD_PLEA_TYPES_SUCCESS',
  props<{ pleaStatusTypes: PleaType[] }>()
);

export const loadPleaTypesError = createAction(
  'LOAD_PLEA_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadPoliceForceList = createAction('LOAD_POLICE_FORCE_LIST');

export const loadPoliceForceListSuccess = createAction(
  'LOAD_POLICE_FORCE_LIST_SUCCESS',
  props<{ policeForceList: PoliceForce[] }>()
);

export const loadPoliceForceListError = createAction(
  'LOAD_POLICE_FORCE_LIST_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadProsecutors = createAction('LOAD_PROSECUTORS');

export const loadProsecutorsSuccess = createAction(
  'LOAD_PROSECUTORS_SUCCESS',
  props<{ prosecutors: Prosecutor[] }>()
);

export const loadProsecutorsError = createAction(
  'LOAD_PROSECUTORS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadResultDefinitions = createAction('LOAD_RESULT_DEFINITIONS');

export const loadResultDefinitionsSuccess = createAction(
  'LOAD_RESULT_DEFINITIONS_SUCCESS',
  props<{ resultDefinitions: ResultDefinition[] }>()
);

export const loadResultDefinitionsError = createAction(
  'LOAD_RESULT_DEFINITIONS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadRotaBusinessTypes = createAction('LOAD_ROTA_BUSINESS_TYPES');

export const loadRotaBusinessTypesSuccess = createAction(
  'LOAD_ROTA_BUSINESS_TYPES_SUCCESS',
  props<{ rotaBusinessTypes: RotaBusinessType[] }>()
);

export const loadRotaBusinessTypesError = createAction(
  'LOAD_ROTA_BUSINESS_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadSpecialRequirements = createAction('LOAD_SPECIAL_REQUIREMENTS');

export const loadSpecialRequirementsSuccess = createAction(
  'LOAD_SPECIAL_REQUIREMENTS_SUCCESS',
  props<{ specialRequirements: SpecialRequirement[] }>()
);

export const loadSpecialRequirementsError = createAction(
  'LOAD_SPECIAL_REQUIREMENTS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadWitnessCareUnits = createAction('LOAD_WITNESS_CARE_UNITS');

export const loadWitnessCareUnitsSuccess = createAction(
  'LOAD_WITNESS_CARE_UNITS_SUCCESS',
  props<{ witnessCareUnits: WitnessCareUnit[] }>()
);

export const loadWitnessCareUnitsError = createAction(
  'LOAD_WITNESS_CARE_UNITS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadTrialTypes = createAction('LOAD_TRIAL_TYPES');

export const loadTrialTypesSuccess = createAction(
  'LOAD_TRIAL_TYPES_SUCCESS',
  props<{ trialTypes: TrialType[] }>()
);

export const loadTrialTypesError = createAction(
  'LOAD_TRIAL_TYPES_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadPoliceRanks = createAction('LOAD_POLICE_RANKS');

export const loadPoliceRanksSuccess = createAction(
  'LOAD_POLICE_RANKS_SUCCESS',
  props<{ policeRanks: PoliceRank[] }>()
);

export const loadPoliceRanksError = createAction(
  'LOAD_POLICE_RANKS_ERROR',
  props<{ error: HttpErrorResponse }>()
);
export const loadPublicHolidays = createAction('LOAD_PUBLIC_HOLIDAYS');

export const loadPublicHolidaysSuccess = createAction(
  'LOAD_PUBLIC_HOLIDAYS_SUCCESS',
  props<{ publicHolidays: PublicHoliday[] }>()
);

export const loadPublicHolidaysError = createAction(
  'LOAD_PUBLIC_HOLIDAYS_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const loadOrganisationsWithType = createAction(
  'LOAD_ORGANISATIONS_WITH_TYPE',
  props<{ organisationType: OrganisationType }>()
);
export const loadOrganisationsWithTypeSuccess = createAction(
  'LOAD_ORGANISATIONS_WITH_TYPE_SUCCESS',
  props<{ organisationsWithType: OrganisationWithType[] }>()
);
export const loadOrganisationsWithTypeError = createAction(
  'LOAD_ORGANISATIONS_WITH_TYPE_ERROR',
  props<{ error: HttpErrorResponse }>()
);
