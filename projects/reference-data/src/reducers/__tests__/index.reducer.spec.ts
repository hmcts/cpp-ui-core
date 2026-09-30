import { ReferenceDataActions } from '../../actions';
import {
  Cluster,
  CourtApplicationType,
  CPSArea,
  CPSBusinessUnit,
  CPSCaseStatus,
  FixedList,
  HearingType,
  JudiciaryGroupType,
  LocalJusticeArea,
  OrganisationUnit,
  PleaType,
  PoliceForce,
  Prosecutor,
  RotaBusinessType,
  RotaBusinessTypeCode,
  TrialType,
  WitnessCareUnit
} from '../../reference-data.interfaces';
import * as fromReferenceData from '../index';

describe('referenceDataReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = fromReferenceData.referenceDataReducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('application types', () => {
    describe('ReferenceDataActions.loadApplicationTypes', () => {
      it('should install the application types key', () => {
        const action = ReferenceDataActions.loadApplicationTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing application types', () => {
        const action = ReferenceDataActions.loadApplicationTypes();
        const result = fromReferenceData.referenceDataReducer(
          { applicationTypes: [{ id: '*' }] as CourtApplicationType[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadApplicationTypesSuccess', () => {
      it('should add the application types to the state', () => {
        const action = ReferenceDataActions.loadApplicationTypesSuccess({
          applicationTypes: [{ id: '*' }] as CourtApplicationType[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadApplicationTypesError', () => {
      it('should remove the application types key', () => {
        const action = ReferenceDataActions.loadApplicationTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ applicationTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('assign priorities', () => {
    describe('ReferenceDataActions.loadAssignPriorities', () => {
      it('should install the assign priorities key', () => {
        const action = ReferenceDataActions.loadAssignPriorities();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing assign priorities', () => {
        const action = ReferenceDataActions.loadAssignPriorities();
        const result = fromReferenceData.referenceDataReducer(
          {
            assignPriorities: [
              { id: 'someid', priorityCode: 'H', priorityValue: 'High', seqNum: 1 }
            ]
          },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadAssignPrioritiesSuccess', () => {
      it('should add the assign priorities to the state', () => {
        const action = ReferenceDataActions.loadAssignPrioritiesSuccess({
          assignPriorities: [{ id: 'someid', priorityCode: 'H', priorityValue: 'High', seqNum: 1 }]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadAssignPrioritiesError', () => {
      it('should remove the assign priorities key', () => {
        const action = ReferenceDataActions.loadAssignPrioritiesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ applicationTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('booking types', () => {
    describe('ReferenceDataActions.loadBookingTypes', () => {
      it('should install the booking types key', () => {
        const action = ReferenceDataActions.loadBookingTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing booking types', () => {
        const action = ReferenceDataActions.loadBookingTypes();
        const result = fromReferenceData.referenceDataReducer(
          { bookingTypes: [{ id: 'someId', typeCode: 'VL', typeValue: 'Video Link' }] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadBookingTypesSuccess', () => {
      it('should add the booking types to the state', () => {
        const action = ReferenceDataActions.loadBookingTypesSuccess({
          bookingTypes: [{ id: 'someId', typeCode: 'VL', typeValue: 'Video Link' }]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadBookingTypesError', () => {
      it('should remove the booking types key', () => {
        const action = ReferenceDataActions.loadBookingTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ applicationTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('Clusters', () => {
    describe('ReferenceDataActions.loadClusters', () => {
      it('should install the clusters key', () => {
        const action = ReferenceDataActions.loadClusters();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing clusters', () => {
        const action = ReferenceDataActions.loadClusters();
        const result = fromReferenceData.referenceDataReducer(
          { clusters: [{ id: '*', clusterCode: 'code' }] as Cluster[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadClustersSuccess', () => {
      it('should add the clusters to the state', () => {
        const action = ReferenceDataActions.loadClustersSuccess({
          clusters: [{ id: '*', clusterCode: 'code' }] as Cluster[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadClustersError', () => {
      it('should remove the clusters key', () => {
        const action = ReferenceDataActions.loadClustersError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ clusters: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('CPS Areas', () => {
    describe('ReferenceDataActions.loadCPSAreas', () => {
      it('should install the cps areas key', () => {
        const action = ReferenceDataActions.loadCPSAreas();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing cpsAreas', () => {
        const action = ReferenceDataActions.loadCPSAreas();
        const result = fromReferenceData.referenceDataReducer(
          { cpsAreas: [{ id: '*' }] as CPSArea[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSAreasSuccess', () => {
      it('should add the cps areas to the state', () => {
        const action = ReferenceDataActions.loadCPSAreasSuccess({
          cpsAreas: [{ id: '*' }] as CPSArea[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSAreasError', () => {
      it('should remove the cps areas key', () => {
        const action = ReferenceDataActions.loadCPSAreasError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ cpsAreas: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('CPS Business Units', () => {
    describe('ReferenceDataActions.loadCPSBusinessUnits', () => {
      it('should install the cps business units key', () => {
        const action = ReferenceDataActions.loadCPSBusinessUnits();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing cpsBusinessUnits', () => {
        const action = ReferenceDataActions.loadCPSBusinessUnits();
        const result = fromReferenceData.referenceDataReducer(
          { cpsBusinessUnits: [{ id: '*' }] as CPSBusinessUnit[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSBusinessUnitsSuccess', () => {
      it('should add the cps business units to the state', () => {
        const action = ReferenceDataActions.loadCPSBusinessUnitsSuccess({
          cpsBusinessUnits: [{ id: '*' }] as CPSBusinessUnit[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSBusinessUnitsError', () => {
      it('should remove the cps business units key', () => {
        const action = ReferenceDataActions.loadCPSBusinessUnitsError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ cpsBusinessUnits: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('fixed lists', () => {
    describe('ReferenceDataActions.loadFixedLists', () => {
      it('should install the fixed lists key', () => {
        const action = ReferenceDataActions.loadFixedLists();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing fixed lists', () => {
        const action = ReferenceDataActions.loadFixedLists();
        const result = fromReferenceData.referenceDataReducer(
          { applicationTypes: [{ id: '*' }] as CourtApplicationType[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadFixedListsSuccess', () => {
      it('should add the fixed lists to the state', () => {
        const action = ReferenceDataActions.loadFixedListsSuccess({
          fixedLists: [{ id: '*' }] as FixedList[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadFixedListsError', () => {
      it('should remove the fixed lists key', () => {
        const action = ReferenceDataActions.loadFixedListsError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ applicationTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('CPSCase Statuses', () => {
    describe('ReferenceDataActions.loadCPSCaseStatuses', () => {
      it('should install the case statuses key', () => {
        const action = ReferenceDataActions.loadCPSCaseStatuses();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing cpsCaseStatuses', () => {
        const action = ReferenceDataActions.loadCPSCaseStatuses();
        const result = fromReferenceData.referenceDataReducer(
          { cpsCaseStatuses: [{ id: '*' }] as CPSCaseStatus[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSCaseStatusesSuccess', () => {
      it('should add the cps case statuses to the state', () => {
        const action = ReferenceDataActions.loadCPSCaseStatusesSuccess({
          cpsCaseStatuses: [{ id: '*' }] as CPSCaseStatus[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadCPSCaseStatusesError', () => {
      it('should remove the cps case statuses key', () => {
        const action = ReferenceDataActions.loadCPSCaseStatusesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ cpsCaseStatuses: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('hearing types', () => {
    describe('ReferenceDataActions.loadHearingTypes', () => {
      it('should install the hearing types key', () => {
        const action = ReferenceDataActions.loadHearingTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing hearing types', () => {
        const action = ReferenceDataActions.loadHearingTypes();
        const result = fromReferenceData.referenceDataReducer(
          { hearingTypes: [{ id: '*' }] as HearingType[] },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadHearingTypesSuccess', () => {
      it('should add the hearing types to the state', () => {
        const action = ReferenceDataActions.loadHearingTypesSuccess({
          hearingTypes: [{ id: '*' }] as HearingType[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadHearingTypesError', () => {
      it('should remove the hearing types key', () => {
        const action = ReferenceDataActions.loadHearingTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ hearingTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('court centres', () => {
    describe('ReferenceDataActions.loadOrganisationUnits', () => {
      it('should install the court centres key', () => {
        const action = ReferenceDataActions.loadOrganisationUnits();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing court centres', () => {
        const action = ReferenceDataActions.loadOrganisationUnits();
        const result = fromReferenceData.referenceDataReducer(
          { organisationUnits: [{ id: '*' }] as OrganisationUnit[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadOrganisationUnitsSuccess', () => {
      it('should add the court centres to the state', () => {
        const action = ReferenceDataActions.loadOrganisationUnitsSuccess({
          organisationUnits: [{ id: '*' }] as OrganisationUnit[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadOrganisationUnitsError', () => {
      it('should remove the court centres key', () => {
        const action = ReferenceDataActions.loadOrganisationUnitsError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ organisationUnits: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('all court centres', () => {
    describe('ReferenceDataActions.loadAllOrganisationUnits', () => {
      it('should install the all court centres key', () => {
        const action = ReferenceDataActions.loadAllOrganisationUnits();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing all court centres', () => {
        const action = ReferenceDataActions.loadAllOrganisationUnits();
        const result = fromReferenceData.referenceDataReducer(
          { allOrganisationUnits: [{ id: '*' }] as OrganisationUnit[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadAllOrganisationUnitsSuccess', () => {
      it('should add the all court centres to the state', () => {
        const action = ReferenceDataActions.loadAllOrganisationUnitsSuccess({
          allOrganisationUnits: [{ id: '*' }] as OrganisationUnit[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadAllOrganisationUnitsError', () => {
      it('should remove the all court centres key', () => {
        const action = ReferenceDataActions.loadAllOrganisationUnitsError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer(
          { allOrganisationUnits: null },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('Local Justice Areas', () => {
    describe('ReferenceDataActions.loadLocalJusticeAreas', () => {
      it('should install the localJusticeAreas', () => {
        const action = ReferenceDataActions.loadLocalJusticeAreas();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing localJusticeAreas', () => {
        const action = ReferenceDataActions.loadLocalJusticeAreas();
        const result = fromReferenceData.referenceDataReducer(
          { localJusticeAreas: [{ clusterCode: '*' }] as LocalJusticeArea[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadLocalJusticeAreasSuccess', () => {
      it('should add the localJusticeAreas to the state', () => {
        const action = ReferenceDataActions.loadLocalJusticeAreasSuccess({
          localJusticeAreas: [{ clusterCode: '*' }] as LocalJusticeArea[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadLocalJusticeAreasError', () => {
      it('should remove the localJusticeAreas key', () => {
        const action = ReferenceDataActions.loadLocalJusticeAreasError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ localJusticeAreas: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('policeForceList', () => {
    describe('ReferenceDataActions.loadPoliceForceList', () => {
      it('should install the police force list', () => {
        const action = ReferenceDataActions.loadPoliceForceList();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing police force list', () => {
        const action = ReferenceDataActions.loadPoliceForceList();
        const result = fromReferenceData.referenceDataReducer(
          { policeForceList: [{ id: '*' }] as PoliceForce[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadPoliceForceListSuccess', () => {
      it('should add the policeForceList to the state', () => {
        const action = ReferenceDataActions.loadPoliceForceListSuccess({
          policeForceList: [{ id: '*' }] as PoliceForce[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadPoliceForceListError', () => {
      it('should remove the policeForceList key', () => {
        const action = ReferenceDataActions.loadPoliceForceListError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ policeForceList: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('prosecutors', () => {
    describe('ReferenceDataActions.loadProsecutors', () => {
      it('should install the prosecutors', () => {
        const action = ReferenceDataActions.loadProsecutors();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing prosecutors', () => {
        const action = ReferenceDataActions.loadProsecutors();
        const result = fromReferenceData.referenceDataReducer(
          { prosecutors: [{ id: '*' }] as Prosecutor[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadProsecutorsSuccess', () => {
      it('should add the prosecutors to the state', () => {
        const action = ReferenceDataActions.loadProsecutorsSuccess({
          prosecutors: [{ id: '*' }] as Prosecutor[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadProsecutorsError', () => {
      it('should remove the prosecutors key', () => {
        const action = ReferenceDataActions.loadProsecutorsError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ prosecutors: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('rota business types', () => {
    describe('ReferenceDataActions.loadRotaBusinessTypes', () => {
      it('should install the prosecutors', () => {
        const action = ReferenceDataActions.loadRotaBusinessTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing rota business types', () => {
        const action = ReferenceDataActions.loadRotaBusinessTypes();
        const result = fromReferenceData.referenceDataReducer(
          { rotaBusinessTypes: [{ id: '*' }] as RotaBusinessType[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadRotaBusinessTypesSuccess', () => {
      it('should add the rota business types to the state', () => {
        const action = ReferenceDataActions.loadRotaBusinessTypesSuccess({
          rotaBusinessTypes: [{ id: '*' }] as RotaBusinessType[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadRotaBusinessTypesError', () => {
      it('should remove a pending rota business types key', () => {
        const action = ReferenceDataActions.loadRotaBusinessTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ rotaBusinessTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('plea types', () => {
    describe('ReferenceDataActions.loadPleaTypes', () => {
      it('should install the plea types key', () => {
        const action = ReferenceDataActions.loadPleaTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing plea types', () => {
        const action = ReferenceDataActions.loadPleaTypes();
        const result = fromReferenceData.referenceDataReducer(
          { pleaStatusTypes: [{ id: '*' }] as PleaType[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadPleaTypesSuccess', () => {
      it('should add the plea types to the state', () => {
        const action = ReferenceDataActions.loadPleaTypesSuccess({
          pleaStatusTypes: [{ id: '*' }] as PleaType[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('HearingResultsActions.loadPleaTypesError', () => {
      it('should remove a pending plea types key', () => {
        const action = ReferenceDataActions.loadPleaTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer({ pleaStatusTypes: null }, action);

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('judiciary group types', () => {
    describe('ReferenceDataActions.loadJudiciaryGroupTypes', () => {
      it('should install the judiciary group types key', () => {
        const action = ReferenceDataActions.loadJudiciaryGroupTypes();
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });

      it('should not overwrite any existing judiciary group types types', () => {
        const action = ReferenceDataActions.loadJudiciaryGroupTypes();
        const result = fromReferenceData.referenceDataReducer(
          { judiciaryGroupTypes: [{ id: '*' }] as JudiciaryGroupType[] },
          action
        );
        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadJudiciaryGroupTypesSuccess', () => {
      it('should add the judiciary group types types to the state', () => {
        const action = ReferenceDataActions.loadJudiciaryGroupTypesSuccess({
          judiciaryGroupTypes: [{ id: '*' }] as JudiciaryGroupType[]
        });
        const result = fromReferenceData.referenceDataReducer(undefined, action);

        expect(result).toMatchSnapshot();
      });
    });

    describe('ReferenceDataActions.loadJudiciaryGroupTypesError', () => {
      it('should remove a pending judiciary group types types key', () => {
        const action = ReferenceDataActions.loadJudiciaryGroupTypesError({ error: {} as any });
        const result = fromReferenceData.referenceDataReducer(
          { judiciaryGroupTypes: null },
          action
        );

        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('selectors', () => {
    describe('application types', () => {
      describe('getApplicationTypes', () => {
        it('should select the application types', () => {
          expect(
            fromReferenceData.getApplicationTypes({
              referenceData: {
                applicationTypes: [{ id: '*' }] as CourtApplicationType[]
              }
            })
          ).toMatchSnapshot();
        });
      });

      describe('getApplicationTypesFetching', () => {
        it('should select the fetching state of the application types', () => {
          expect(
            fromReferenceData.getApplicationTypesFetching({
              referenceData: { applicationTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getApplicationTypesFetching({
              referenceData: { applicationTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getApplicationTypesFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('hearing types', () => {
      describe('getHearingTypes', () => {
        it('should select the hearing types', () => {
          expect(
            fromReferenceData.getHearingTypes({
              referenceData: {
                hearingTypes: [{ id: '*' }] as HearingType[]
              }
            })
          ).toMatchSnapshot();
        });
      });

      describe('getHearingTypesFetching', () => {
        it('should select the fetching state of the hearing types', () => {
          expect(
            fromReferenceData.getHearingTypesFetching({
              referenceData: { hearingTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getHearingTypesFetching({
              referenceData: { hearingTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getHearingTypesFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('court centres', () => {
      describe('getOrganisationUnits', () => {
        it('should select the court centres', () => {
          expect(
            fromReferenceData.getOrganisationUnits({
              referenceData: {
                organisationUnits: [{ id: '*' }] as OrganisationUnit[]
              }
            })
          ).toMatchSnapshot();
        });
      });

      describe('getOrganisationUnitsFetching', () => {
        it('should select the fetching state of the court centres', () => {
          expect(
            fromReferenceData.getOrganisationUnitsFetching({
              referenceData: { organisationUnits: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getOrganisationUnitsFetching({
              referenceData: { organisationUnits: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getOrganisationUnitsFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('prosecutors', () => {
      describe('getProsecutors', () => {
        it('should select the prosecutors', () => {
          expect(
            fromReferenceData.getProsecutors({
              referenceData: {
                prosecutors: [{ id: '*' }] as Prosecutor[]
              }
            })
          ).toMatchSnapshot();
        });
      });

      describe('getProsecutorsFetching', () => {
        it('should select the fetching state of the prosecutors', () => {
          expect(
            fromReferenceData.getProsecutorsFetching({
              referenceData: { prosecutors: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getProsecutorsFetching({
              referenceData: { prosecutors: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getProsecutorsFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('rota business Types', () => {
      const magistratesType: RotaBusinessType = {
        id: '1',
        seqNum: 1,
        typeCode: 'GEN' as RotaBusinessTypeCode,
        typeDescription: 'General',
        slot: true,
        duration: false,
        jurisdiction: 'MAGISTRATES'
      };

      const crownType: RotaBusinessType = {
        id: '2',
        seqNum: 2,
        typeCode: 'LGT' as RotaBusinessTypeCode,
        typeDescription: 'Long Trial (5 days plus)',
        slot: false,
        duration: true,
        jurisdiction: 'CROWN'
      };

      describe('getRotaBusinessTypes', () => {
        it('should select only rota business types with MAGISTRATES jurisdiction', () => {
          const result = fromReferenceData.getRotaBusinessTypes({
            referenceData: {
              rotaBusinessTypes: [magistratesType]
            }
          });

          expect(result).toEqual([magistratesType]);
        });

        it('should select an empty array when no rota business types exist', () => {
          expect(
            fromReferenceData.getRotaBusinessTypes({
              referenceData: {}
            })
          ).toEqual([]);
        });

        it('should select an empty array when no crown rota business types exist', () => {
          expect(
            fromReferenceData.getRotaBusinessTypesByJurisdiction('CROWN')({
              referenceData: {}
            })
          ).toEqual([]);
        });
      });

      describe('getRotaBusinessTypesByJurisdiction', () => {
        it('should return all rota business types when jurisdiction is ALL', () => {
          const result = fromReferenceData.getRotaBusinessTypesByJurisdiction('ALL')({
            referenceData: {
              rotaBusinessTypes: [magistratesType, crownType]
            }
          });

          expect(result).toEqual([magistratesType, crownType]);
        });

        it('should filter by MAGISTRATES jurisdiction', () => {
          const result = fromReferenceData.getRotaBusinessTypesByJurisdiction('MAGISTRATES')({
            referenceData: {
              rotaBusinessTypes: [magistratesType, crownType]
            }
          });

          expect(result).toEqual([magistratesType]);
        });

        it('should filter by CROWN jurisdiction', () => {
          const result = fromReferenceData.getRotaBusinessTypesByJurisdiction('CROWN')({
            referenceData: {
              rotaBusinessTypes: [magistratesType, crownType]
            }
          });

          expect(result).toEqual([crownType]);
        });

        it('should select only rota business types with CROWN jurisdiction', () => {
          const result = fromReferenceData.getRotaBusinessTypesByJurisdiction('CROWN')({
            referenceData: {
              rotaBusinessTypes: [crownType]
            }
          });

          expect(result).toEqual([crownType]);
        });

        it('should select an empty array when no rota business types exist', () => {
          expect(
            fromReferenceData.getRotaBusinessTypesByJurisdiction('ALL')({
              referenceData: {}
            })
          ).toEqual([]);
        });
      });

      describe('getRotaBusinessTypesFetching', () => {
        it('should select the fetching state of the rota business types', () => {
          expect(
            fromReferenceData.getRotaBusinessTypesFetching({
              referenceData: { rotaBusinessTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getRotaBusinessTypesFetching({
              referenceData: { rotaBusinessTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getRotaBusinessTypesFetching({
              referenceData: {}
            })
          ).toEqual(true);
        });
      });
    });

    describe('Plea Types', () => {
      describe('getPleaTypes', () => {
        it('should select the plea types', () => {
          expect(
            fromReferenceData.getPleaStatusTypes({
              referenceData: {
                pleaStatusTypes: [{ id: '*' }] as PleaType[]
              }
            })
          ).toMatchSnapshot();
        });

        it('should select an empty array when no plea types exist', () => {
          expect(
            fromReferenceData.getPleaStatusTypes({
              referenceData: {}
            })
          ).toMatchSnapshot();
        });
      });

      describe('getPleaTypesFetching', () => {
        it('should select the fetching state of the plea types', () => {
          expect(
            fromReferenceData.getPleaStatusTypesFetching({
              referenceData: { pleaStatusTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getPleaStatusTypesFetching({
              referenceData: { pleaStatusTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getPleaStatusTypesFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('special requirements', () => {
      describe('ReferenceDataActions.loadSpecialRequirements', () => {
        it('should install the special requirements key', () => {
          const action = ReferenceDataActions.loadSpecialRequirements();
          const result = fromReferenceData.referenceDataReducer(undefined, action);

          expect(result).toMatchSnapshot();
        });

        it('should not overwrite any special requirements types', () => {
          const action = ReferenceDataActions.loadSpecialRequirements();
          const result = fromReferenceData.referenceDataReducer(
            { bookingTypes: [{ id: 'someId', typeCode: 'VL', typeValue: 'Video Link' }] },
            action
          );

          expect(result).toMatchSnapshot();
        });
      });

      describe('ReferenceDataActions.loadBookingTypesSuccess', () => {
        it('should add the special requirements to the state', () => {
          const action = ReferenceDataActions.loadSpecialRequirementsSuccess({
            specialRequirements: [
              { id: 'someId', requirementCode: 'AOC', requirementValue: 'Availability of a Cell' }
            ]
          });
          const result = fromReferenceData.referenceDataReducer(undefined, action);

          expect(result).toMatchSnapshot();
        });
      });

      describe('HearingResultsActions.loadSpecialRequirementsError', () => {
        it('should remove the special requirements key', () => {
          const action = ReferenceDataActions.loadSpecialRequirementsError({ error: {} as any });
          const result = fromReferenceData.referenceDataReducer({ applicationTypes: null }, action);

          expect(result).toMatchSnapshot();
        });
      });
    });

    describe('Witness care units', () => {
      describe('getWitnessCareUnits', () => {
        it('should select witness care units', () => {
          expect(
            fromReferenceData.getWitnessCareUnits({
              referenceData: {
                witnessCareUnits: [{ id: '*' }] as WitnessCareUnit[]
              }
            })
          ).toMatchSnapshot();
        });

        it('should select an empty array when no witness care units', () => {
          expect(
            fromReferenceData.getWitnessCareUnits({
              referenceData: {}
            })
          ).toMatchSnapshot();
        });
      });

      describe('getWitnessCareUnitsFetching', () => {
        it('should select the fetching state of the plea types', () => {
          expect(
            fromReferenceData.getWitnessCareUnitsFetching({
              referenceData: { witnessCareUnits: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getWitnessCareUnitsFetching({
              referenceData: { witnessCareUnits: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getWitnessCareUnitsFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('Judiciary Group Types', () => {
      describe('getJudiciaryGroupTypes', () => {
        it('should select judiciary group types', () => {
          expect(
            fromReferenceData.getJudiciaryGroupTypes({
              referenceData: {
                judiciaryGroupTypes: [{ id: '*' }] as JudiciaryGroupType[]
              }
            })
          ).toMatchSnapshot();
        });

        it('should select an empty array when no judiciary group types', () => {
          expect(
            fromReferenceData.getJudiciaryGroupTypes({
              referenceData: {}
            })
          ).toMatchSnapshot();
        });
      });

      describe('getJudiciaryGroupTypesFetching', () => {
        it('should select the fetching state of the judiciary group types', () => {
          expect(
            fromReferenceData.getJudiciaryGroupTypesFetching({
              referenceData: { judiciaryGroupTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getJudiciaryGroupTypesFetching({
              referenceData: { judiciaryGroupTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getJudiciaryGroupTypesFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });

    describe('Trial Types', () => {
      describe('getTrialTypes', () => {
        it('should select the trial types', () => {
          expect(
            fromReferenceData.getTrialTypes({
              referenceData: {
                trialTypes: [{ id: '*' }] as TrialType[]
              }
            })
          ).toMatchSnapshot();
        });

        it('should select an empty array when no trial types exist', () => {
          expect(
            fromReferenceData.getTrialTypes({
              referenceData: {}
            })
          ).toMatchSnapshot();
        });
      });

      describe('getTrialTypesFetching', () => {
        it('should select the fetching state of the trial types', () => {
          expect(
            fromReferenceData.getTrialTypesFetching({
              referenceData: { trialTypes: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getTrialTypesFetching({
              referenceData: { trialTypes: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getTrialTypesFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });

      describe('getPoliceRanksFetching', () => {
        it('should select the fetching state of the trial types', () => {
          expect(
            fromReferenceData.getPoliceRanksFetching({
              referenceData: { policeRanks: null }
            })
          ).toEqual(true);
          expect(
            fromReferenceData.getPoliceRanksFetching({
              referenceData: { policeRanks: [] }
            })
          ).toEqual(false);
          expect(
            fromReferenceData.getPoliceRanksFetching({
              referenceData: {}
            })
          ).toEqual(false);
        });
      });
    });
  });
});
