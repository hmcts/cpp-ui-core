import { createReducer, on } from '@ngrx/store';
import { ReferenceDataActions } from '../actions/index';
import {
  Cluster,
  CPSArea,
  CPSBusinessUnit,
  CPSCaseStatus,
  CourtApplicationType,
  FixedList,
  HearingType,
  JudiciaryGroupType,
  LocalJusticeArea,
  OrganisationUnit,
  PleaType,
  PoliceForce,
  Prosecutor,
  ResultDefinition,
  RotaBusinessType,
  WitnessCareUnit,
  TrialType,
  HearingPriority,
  SpecialRequirement,
  BookingType,
  PoliceRank,
  PublicHoliday,
  OrganisationWithType
} from '../reference-data.interfaces';

export interface ReferenceDataState {
  assignPriorities?: HearingPriority[] | null;
  applicationTypes?: CourtApplicationType[] | null;
  bookingTypes?: BookingType[] | null;
  clusters?: Cluster[] | null;
  cpsAreas?: CPSArea[] | null;
  cpsBusinessUnits?: CPSBusinessUnit[] | null;
  cpsCaseStatuses?: CPSCaseStatus[] | null;
  fixedLists?: FixedList[] | null;
  hearingTypes?: HearingType[] | null;
  judiciaryGroupTypes?: JudiciaryGroupType[] | null;
  localJusticeAreas?: LocalJusticeArea[] | null;
  organisationUnits?: OrganisationUnit[] | null;
  allOrganisationUnits?: OrganisationUnit[] | null;
  policeForceList?: PoliceForce[] | null;
  prosecutors?: Prosecutor[] | null;
  resultDefinitions?: ResultDefinition[] | null;
  rotaBusinessTypes?: RotaBusinessType[] | null;
  pleaStatusTypes?: PleaType[] | null;
  specialRequirements?: SpecialRequirement[] | null;
  witnessCareUnits?: WitnessCareUnit[] | null;
  trialTypes?: TrialType[] | null;
  policeRanks?: PoliceRank[] | null;
  publicHolidays?: PublicHoliday[] | null;
  organisationsWithType?: OrganisationWithType[] | null;
}

const initialState: ReferenceDataState = {};

export const referenceData = createReducer(
  initialState,

  // Application types

  on(ReferenceDataActions.loadApplicationTypes, (state) => ({
    ...state,
    applicationTypes: state.applicationTypes || null
  })),
  on(ReferenceDataActions.loadApplicationTypesSuccess, (state, { applicationTypes }) => ({
    ...state,
    applicationTypes
  })),
  on(ReferenceDataActions.loadApplicationTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'applicationTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Assign Priorities

  on(ReferenceDataActions.loadAssignPriorities, (state) => ({
    ...state,
    assignPriorities: state.assignPriorities || null
  })),
  on(ReferenceDataActions.loadAssignPrioritiesSuccess, (state, { assignPriorities }) => ({
    ...state,
    assignPriorities
  })),
  on(ReferenceDataActions.loadAssignPrioritiesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'assignPriorities' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Booking Types

  on(ReferenceDataActions.loadBookingTypes, (state) => ({
    ...state,
    bookingTypes: state.bookingTypes || null
  })),
  on(ReferenceDataActions.loadBookingTypesSuccess, (state, { bookingTypes }) => ({
    ...state,
    bookingTypes
  })),
  on(ReferenceDataActions.loadBookingTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'bookingTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Clusters

  on(ReferenceDataActions.loadClusters, (state) => ({
    ...state,
    clusters: state.clusters || null
  })),
  on(ReferenceDataActions.loadClustersSuccess, (state, { clusters }) => ({
    ...state,
    clusters
  })),
  on(ReferenceDataActions.loadClustersError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'clusters' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // CPS Areas

  on(ReferenceDataActions.loadCPSAreas, (state) => ({
    ...state,
    cpsAreas: state.cpsAreas || null
  })),
  on(ReferenceDataActions.loadCPSAreasSuccess, (state, { cpsAreas }) => ({
    ...state,
    cpsAreas
  })),
  on(ReferenceDataActions.loadCPSAreasError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'cpsAreas' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),
  // CPS Business Units

  on(ReferenceDataActions.loadCPSBusinessUnits, (state) => ({
    ...state,
    cPSBusinessUnits: state.cpsBusinessUnits || null
  })),
  on(ReferenceDataActions.loadCPSBusinessUnitsSuccess, (state, { cpsBusinessUnits }) => ({
    ...state,
    cpsBusinessUnits
  })),
  on(ReferenceDataActions.loadCPSBusinessUnitsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'cpsBusinessUnits' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // CPS Case Statuses

  on(ReferenceDataActions.loadCPSCaseStatuses, (state) => ({
    ...state,
    cpsCaseStatuses: state.cpsCaseStatuses || null
  })),
  on(ReferenceDataActions.loadCPSCaseStatusesSuccess, (state, { cpsCaseStatuses }) => ({
    ...state,
    cpsCaseStatuses
  })),
  on(ReferenceDataActions.loadCPSCaseStatusesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'cpsCaseStatuses' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Fixed lists

  on(ReferenceDataActions.loadFixedLists, (state) => ({
    ...state,
    fixedLists: state.fixedLists || null
  })),
  on(ReferenceDataActions.loadFixedListsSuccess, (state, { fixedLists }) => ({
    ...state,
    fixedLists
  })),
  on(ReferenceDataActions.loadFixedListsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'fixedLists' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Hearing types

  on(ReferenceDataActions.loadHearingTypes, (state) => ({
    ...state,
    hearingTypes: state.hearingTypes || null
  })),
  on(ReferenceDataActions.loadHearingTypesSuccess, (state, { hearingTypes }) => ({
    ...state,
    hearingTypes
  })),
  on(ReferenceDataActions.loadHearingTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'hearingTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Local Justice Areas

  on(ReferenceDataActions.loadLocalJusticeAreas, (state) => ({
    ...state,
    localJusticeAreas: state.localJusticeAreas || null
  })),
  on(ReferenceDataActions.loadLocalJusticeAreasSuccess, (state, { localJusticeAreas }) => ({
    ...state,
    localJusticeAreas
  })),
  on(ReferenceDataActions.loadLocalJusticeAreasError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'localJusticeAreas' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Organisation units

  on(ReferenceDataActions.loadOrganisationUnits, (state) => ({
    ...state,
    organisationUnits: state.organisationUnits || null
  })),
  on(ReferenceDataActions.loadOrganisationUnitsSuccess, (state, { organisationUnits }) => ({
    ...state,
    organisationUnits
  })),
  on(ReferenceDataActions.loadOrganisationUnitsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'organisationUnits' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // All organisation units (including expired)

  on(ReferenceDataActions.loadAllOrganisationUnits, (state) => ({
    ...state,
    allOrganisationUnits: state.allOrganisationUnits || null
  })),
  on(ReferenceDataActions.loadAllOrganisationUnitsSuccess, (state, { allOrganisationUnits }) => ({
    ...state,
    allOrganisationUnits
  })),
  on(ReferenceDataActions.loadAllOrganisationUnitsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'allOrganisationUnits' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Plea types

  on(ReferenceDataActions.loadPleaTypes, (state) => ({
    ...state,
    pleaStatusTypes: state.pleaStatusTypes || null
  })),
  on(ReferenceDataActions.loadPleaTypesSuccess, (state, { pleaStatusTypes }) => ({
    ...state,
    pleaStatusTypes
  })),
  on(ReferenceDataActions.loadPleaTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'pleaStatusTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Police Force List

  on(ReferenceDataActions.loadPoliceForceList, (state) => ({
    ...state,
    policeForceList: state.policeForceList || null
  })),
  on(ReferenceDataActions.loadPoliceForceListSuccess, (state, { policeForceList }) => ({
    ...state,
    policeForceList
  })),
  on(ReferenceDataActions.loadPoliceForceListError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'policeForceList' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Prosecutors

  on(ReferenceDataActions.loadProsecutors, (state) => ({
    ...state,
    prosecutors: state.prosecutors || null
  })),
  on(ReferenceDataActions.loadProsecutorsSuccess, (state, { prosecutors }) => ({
    ...state,
    prosecutors
  })),
  on(ReferenceDataActions.loadProsecutorsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'prosecutors' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Result definitions

  on(ReferenceDataActions.loadResultDefinitions, (state) => ({
    ...state,
    resultDefinitions: state.resultDefinitions || null
  })),
  on(ReferenceDataActions.loadResultDefinitionsSuccess, (state, { resultDefinitions }) => ({
    ...state,
    resultDefinitions
  })),
  on(ReferenceDataActions.loadResultDefinitionsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'resultDefinitions' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Rota business types

  on(ReferenceDataActions.loadRotaBusinessTypes, (state) => ({
    ...state,
    rotaBusinessTypes: state.rotaBusinessTypes || null
  })),
  on(ReferenceDataActions.loadRotaBusinessTypesSuccess, (state, { rotaBusinessTypes }) => ({
    ...state,
    rotaBusinessTypes
  })),
  on(ReferenceDataActions.loadRotaBusinessTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'rotaBusinessTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Special requirements

  on(ReferenceDataActions.loadSpecialRequirements, (state) => ({
    ...state,
    specialRequirements: state.specialRequirements || null
  })),
  on(ReferenceDataActions.loadSpecialRequirementsSuccess, (state, { specialRequirements }) => ({
    ...state,
    specialRequirements
  })),
  on(ReferenceDataActions.loadSpecialRequirementsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'specialRequirements' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Witness care units

  on(ReferenceDataActions.loadWitnessCareUnits, (state) => ({
    ...state,
    witnessCareUnits: state.witnessCareUnits || null
  })),
  on(ReferenceDataActions.loadWitnessCareUnitsSuccess, (state, { witnessCareUnits }) => ({
    ...state,
    witnessCareUnits
  })),
  on(ReferenceDataActions.loadWitnessCareUnitsError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'witnessCareUnits' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Judiciary Group Types

  on(ReferenceDataActions.loadJudiciaryGroupTypes, (state) => ({
    ...state,
    judiciaryGroupTypes: state.judiciaryGroupTypes || null
  })),
  on(ReferenceDataActions.loadJudiciaryGroupTypesSuccess, (state, { judiciaryGroupTypes }) => ({
    ...state,
    judiciaryGroupTypes
  })),
  on(ReferenceDataActions.loadJudiciaryGroupTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'judiciaryGroupTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Trial types

  on(ReferenceDataActions.loadTrialTypes, (state) => ({
    ...state,
    trialTypes: state.trialTypes || null
  })),
  on(ReferenceDataActions.loadTrialTypesSuccess, (state, { trialTypes }) => ({
    ...state,
    trialTypes
  })),
  on(ReferenceDataActions.loadTrialTypesError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'trialTypes' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Police ranks
  on(ReferenceDataActions.loadPoliceRanks, (state) => ({
    ...state,
    policeRanks: state.policeRanks || null
  })),
  on(ReferenceDataActions.loadPoliceRanksSuccess, (state, { policeRanks }) => ({
    ...state,
    policeRanks
  })),
  on(ReferenceDataActions.loadPoliceRanksError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'policeRanks' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),
  // Public holidays
  on(ReferenceDataActions.loadPublicHolidays, (state) => ({
    ...state,
    publicHolidays: state.publicHolidays || null
  })),
  on(ReferenceDataActions.loadPublicHolidaysSuccess, (state, { publicHolidays }) => ({
    ...state,
    publicHolidays
  })),
  on(ReferenceDataActions.loadPublicHolidaysError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'publicHolidays' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  ),

  // Organisation withg types
  on(ReferenceDataActions.loadOrganisationsWithType, (state) => ({
    ...state,
    organisationsWithType: state.organisationsWithType ?? null
  })),
  on(ReferenceDataActions.loadOrganisationsWithTypeSuccess, (state, { organisationsWithType }) => ({
    ...state,
    organisationsWithType
  })),
  on(ReferenceDataActions.loadOrganisationsWithTypeError, (state) =>
    Object.keys(state).reduce(
      (nextState, key) =>
        key !== 'organisationsWithType' || state[key as keyof ReferenceDataState] !== null
          ? { ...nextState, [key]: state[key as keyof ReferenceDataState] }
          : nextState,
      {}
    )
  )
);
