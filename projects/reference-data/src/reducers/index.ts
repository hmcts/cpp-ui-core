import { Action, createSelector, defaultMemoize, MemoizedSelector } from '@ngrx/store';
import {
  referenceData,
  ReferenceDataState as ReferenceDataFeatureState
} from './reference-data.reducer';
import { RotaBusinessTypeJurisdiction, RotaBusinessType } from '../reference-data.interfaces';

export interface ReferenceDataState {
  referenceData: ReferenceDataFeatureState;
}

export function referenceDataReducer(state: ReferenceDataFeatureState | undefined, action: Action) {
  return referenceData(state, action);
}

export const getAssignPriorities = (state: ReferenceDataState) =>
  state.referenceData.assignPriorities;

export const getApplicationTypes = (state: ReferenceDataState) =>
  state.referenceData.applicationTypes;

export const getApplicationTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.applicationTypes === null;

export const getBookingTypes = (state: ReferenceDataState) => state.referenceData.bookingTypes;

export const getClusters = (state: ReferenceDataState) => state.referenceData.clusters;

export const getClustersFetching = (state: ReferenceDataState) =>
  state.referenceData.clusters === null;

export const getCPSAreas = (state: ReferenceDataState) => state.referenceData.cpsAreas;

export const getCPSBusinessUnits = (state: ReferenceDataState) =>
  state.referenceData.cpsBusinessUnits;

export const getCPSCaseStatuses = (state: ReferenceDataState) =>
  state.referenceData.cpsCaseStatuses;

export const getFixedLists = (state: ReferenceDataState) => state.referenceData.fixedLists || [];

export const getFixedListsFetching = (state: ReferenceDataState) =>
  state.referenceData.fixedLists === null;

export const getHearingTypes = (state: ReferenceDataState) => state.referenceData.hearingTypes;

export const getHearingTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.hearingTypes === null;

export const getLocalJusticeAreas = (state: ReferenceDataState) =>
  state.referenceData.localJusticeAreas;

export const getOrganisationUnits = (state: ReferenceDataState) =>
  state.referenceData.organisationUnits;

export const getOrganisationUnitsFetching = (state: ReferenceDataState) =>
  state.referenceData.organisationUnits === null;

export const getPoliceForceList = (state: ReferenceDataState) =>
  state.referenceData.policeForceList;

export const getPoliceForceFetching = (state: ReferenceDataState) =>
  state.referenceData.policeForceList === null;

export const getProsecutors = (state: ReferenceDataState) => state.referenceData.prosecutors;

export const getProsecutorsFetching = (state: ReferenceDataState) =>
  state.referenceData.prosecutors === null;

export const getResultDefinitions = (state: ReferenceDataState) =>
  state.referenceData.resultDefinitions || [];

export const getResultDefinitionsFetching = (state: ReferenceDataState) =>
  state.referenceData.resultDefinitions === null;

export const getRotaBusinesTypesState = (state: ReferenceDataState) =>
  state.referenceData.rotaBusinessTypes;

export const getRotaBusinessTypes = createSelector(getRotaBusinesTypesState, (rotaBusinessTypes) =>
  (rotaBusinessTypes || []).filter(
    (rotaBusinessType) => rotaBusinessType.jurisdiction === 'MAGISTRATES'
  )
);

export const getRotaBusinessTypesByJurisdiction = (
  jurisdiction: RotaBusinessTypeJurisdiction | 'ALL'
): MemoizedSelector<ReferenceDataState, RotaBusinessType[]> =>
  defaultMemoize((jurisdiction: RotaBusinessTypeJurisdiction | 'ALL') =>
    createSelector(
      getRotaBusinesTypesState,
      (rotaBusinessTypes: RotaBusinessType[] | null | undefined) => {
        if (jurisdiction === 'ALL') {
          return rotaBusinessTypes || [];
        }
        return (rotaBusinessTypes || []).filter(
          (rotaBusinessType) => rotaBusinessType.jurisdiction === jurisdiction
        );
      }
    )
  ).memoized(jurisdiction);

export const getRotaBusinessTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.rotaBusinessTypes === null ||
  state.referenceData.rotaBusinessTypes === undefined;

export const getPleaStatusTypes = (state: ReferenceDataState) =>
  state.referenceData.pleaStatusTypes || [];

export const getPleaStatusTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.pleaStatusTypes === null;

export const getSpecialRequirements = (state: ReferenceDataState) =>
  state.referenceData.specialRequirements;

export const getWitnessCareUnits = (state: ReferenceDataState) =>
  state.referenceData.witnessCareUnits;

export const getWitnessCareUnitsFetching = (state: ReferenceDataState) =>
  state.referenceData.witnessCareUnits === null;

export const getJudiciaryGroupTypes = (state: ReferenceDataState) =>
  state.referenceData.judiciaryGroupTypes;

export const getJudiciaryGroupTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.judiciaryGroupTypes === null;

export const getTrialTypes = (state: ReferenceDataState) => state.referenceData.trialTypes || [];

export const getTrialTypesFetching = (state: ReferenceDataState) =>
  state.referenceData.trialTypes === null;

export const getPoliceRanks = (state: ReferenceDataState) => state.referenceData.policeRanks || [];

export const getPoliceRanksFetching = (state: ReferenceDataState) =>
  state.referenceData.policeRanks === null;
export const getPublicHolidays = (state: ReferenceDataState) => state.referenceData.publicHolidays;
export const getPublicHolidaysFetching = (state: ReferenceDataState) =>
  state.referenceData.publicHolidays === null;

export const getOrganisationsWithType = (state: ReferenceDataState) =>
  state.referenceData.organisationsWithType;
export const getOrganisationsWithTypeNeedsFetching = (state: ReferenceDataState) =>
  state.referenceData.organisationsWithType === null ||
  state.referenceData.organisationsWithType === undefined;
