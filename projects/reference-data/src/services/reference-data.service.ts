import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CppHttp, mapObjectToHttpParams } from '@cpp/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import {
  Cluster,
  CourtApplicationType,
  CPSArea,
  CPSBusinessUnit,
  CPSCaseStatus,
  FixedList,
  HearingType,
  JudicialMember,
  JudiciaryGroupType,
  LocalJusticeArea,
  OrganisationUnit,
  PleaType,
  PoliceForce,
  Prosecutor,
  ResultDefinition,
  ReusableInfoDefinitions,
  RotaBusinessType,
  Jurisdiction,
  TrialType,
  SelectedJudiciaryOptions,
  WitnessCareUnit,
  SpecialRequirement,
  HearingPriority,
  BookingType,
  PoliceRank,
  PublicHoliday,
  OrganisationType,
  OrganisationWithType,
  Offence
} from '../reference-data.interfaces';
import { mapApplicationType } from '../utils/mapper';

@Injectable()
export class ReferenceDataService {
  private resuableInfoDefinitionsCache: Record<string, Observable<ReusableInfoDefinitions>> = {};

  constructor(private cppHttp: CppHttp) {}

  fetchApplicationTypes(): Observable<CourtApplicationType[]> {
    return this.cppHttp
      .query<{ courtApplicationTypes: CourtApplicationType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/application-types',
        requestType: 'application/vnd.referencedata.application-types+json'
      })
      .pipe(map((data) => data.courtApplicationTypes));
  }

  fetchAssignPriorities(): Observable<HearingPriority[]> {
    return this.cppHttp
      .query<{ hearingPriorities: HearingPriority[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/hearing-priorities',
        requestType: 'application/vnd.referencedata.query.hearing-priorities+json'
      })
      .pipe(map((data) => (data.hearingPriorities || []).sort((a, b) => a.seqNum - b.seqNum)));
  }

  fetchBookingTypes(): Observable<BookingType[]> {
    return this.cppHttp
      .query<{ bookingTypes: BookingType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/booking-types',
        requestType: 'application/vnd.referencedata.query.booking-types+json'
      })
      .pipe(map((data) => data.bookingTypes));
  }

  fetchClusters(): Observable<Cluster[]> {
    return this.cppHttp
      .query<{ clusterInformation: Cluster[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/cluster-information',
        requestType: 'application/vnd.referencedata.query.cluster-information+json'
      })
      .pipe(map((data) => data.clusterInformation));
  }

  fetchCPSAreas(): Observable<CPSArea[]> {
    return this.cppHttp
      .query<{ cpsAreas: CPSArea[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/cps-areas',
        requestType: 'application/vnd.referencedata.query.cps-area+json'
      })
      .pipe(map((data) => data.cpsAreas));
  }

  fetchCPSBusinessUnits(): Observable<CPSBusinessUnit[]> {
    return this.cppHttp
      .query<{ cpsBusinessUnits: CPSBusinessUnit[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/cps-business-units',
        requestType: 'application/vnd.referencedata.query.cps-business-unit+json'
      })
      .pipe(map((data) => data.cpsBusinessUnits));
  }

  fetchCPSCaseStatuses(): Observable<CPSCaseStatus[]> {
    return this.cppHttp
      .query<{ cpsCaseStatuses: CPSCaseStatus[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/cps-case-statuses',
        requestType: 'application/vnd.referencedata.query.cps-case-statuses+json'
      })
      .pipe(map((data) => data.cpsCaseStatuses));
  }

  fetchFixedLists(): Observable<FixedList[]> {
    return this.cppHttp
      .query<{ fixedListCollection: FixedList[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/fixed-list',
        requestType: 'application/vnd.referencedata.get-all-fixed-list+json'
      })
      .pipe(map((data) => data.fixedListCollection));
  }

  fetchHearingTypes(): Observable<HearingType[]> {
    return this.cppHttp
      .query<{ hearingTypes: HearingType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/hearing-types',
        requestType: 'application/vnd.referencedata.query.hearing-types+json'
      })
      .pipe(map((data) => data.hearingTypes));
  }

  fetchJudiciaryGroupTypes(): Observable<JudiciaryGroupType[]> {
    return this.cppHttp
      .query<{ judiciaryTypes: JudiciaryGroupType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/judiciary-types',
        requestType: 'application/vnd.referencedata.query.judiciary-types+json'
      })
      .pipe(map((data) => data.judiciaryTypes));
  }

  fetchLocalJusticAreas(): Observable<LocalJusticeArea[]> {
    return this.cppHttp
      .query<{ localJusticeAreas: LocalJusticeArea[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/local-justice-areas',
        requestType: 'application/vnd.referencedata.query.local-justice-areas+json'
      })
      .pipe(map((data) => data.localJusticeAreas));
  }

  /**
   * Fetches the organisation units and related courtrooms.
   */
  fetchOrganisationUnits(includeExpired = false): Observable<OrganisationUnit[]> {
    return this.cppHttp
      .query<{ organisationunits: OrganisationUnit[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/courtrooms', // The api call end point courtrooms fetches the organisation unit and courtrooms
        requestType: includeExpired
          ? 'application/vnd.referencedata.ou-courtrooms-all+json'
          : 'application/vnd.referencedata.ou-courtrooms+json'
      })
      .pipe(map((data) => data.organisationunits));
  }

  fetchPleaTypes(): Observable<PleaType[]> {
    return this.cppHttp
      .query<{ pleaStatusTypes: PleaType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/plea-types',
        requestType: 'application/vnd.referencedata.plea-types+json'
      })
      .pipe(map((data) => data.pleaStatusTypes));
  }

  fetchPoliceForceList(): Observable<PoliceForce[]> {
    return this.cppHttp
      .query<{ policeForces: PoliceForce[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/police-forces',
        requestType: 'application/vnd.referencedata.police-forces+json'
      })
      .pipe(map((data) => data.policeForces));
  }

  fetchProsecutors(): Observable<Prosecutor[]> {
    return this.cppHttp
      .query<{ prosecutors: Prosecutor[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/prosecutors',
        requestType: 'application/vnd.referencedata.query.prosecutors-with-nsp+json'
      })
      .pipe(map((data) => data.prosecutors));
  }

  fetchResultDefinition(resultDefinitionId: string): Observable<ResultDefinition> {
    return this.cppHttp.query<ResultDefinition>({
      url: `/referencedata-query-api/query/api/rest/referencedata/result-definitions/${resultDefinitionId}`,
      requestType: 'application/vnd.referencedata.get-result-definition+json'
    });
  }

  fetchResultDefinitions(): Observable<ResultDefinition[]> {
    return this.cppHttp
      .query<{ resultDefinitions: ResultDefinition[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/result-definitions',
        requestType: 'application/vnd.referencedata.get-all-result-definitions+json'
      })
      .pipe(map((data) => data.resultDefinitions));
  }

  fetchResuableInfoDefinitions(
    orderedDate: string,
    options: Record<string, unknown> = {}
  ): Observable<ReusableInfoDefinitions> {
    if (!this.resuableInfoDefinitionsCache[orderedDate]) {
      this.resuableInfoDefinitionsCache[orderedDate] = this.cppHttp
        .query<{ reusableInfoDefinitions: ReusableInfoDefinitions }>({
          url: '/referencedata-query-api/query/api/rest/referencedata/reusable-info-definitions',
          requestType: 'application/vnd.referencedata.query.get-reusable-info-definitions+json',
          params: new HttpParams({ fromObject: { orderedDate } }),
          ...options
        })
        .pipe(
          map((result) => result.reusableInfoDefinitions),
          shareReplay(1),
          tap({
            error: () => {
              delete this.resuableInfoDefinitionsCache[orderedDate];
            }
          })
        );
    }
    return this.resuableInfoDefinitionsCache[orderedDate];
  }

  fetchRotaBusinessTypes(
    params: { jurisdiction: Jurisdiction | 'ALL' } = { jurisdiction: 'ALL' }
  ): Observable<RotaBusinessType[]> {
    return this.cppHttp
      .query<{ rotaBusinessTypes: RotaBusinessType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/rota-business-types',
        requestType: 'application/vnd.referencedata.query.rota-business-types+json',
        params: mapObjectToHttpParams(params)
      })
      .pipe(map((data) => data.rotaBusinessTypes));
  }

  fetchSpecialRequirements(): Observable<SpecialRequirement[]> {
    return this.cppHttp
      .query<{ specialRequirements: SpecialRequirement[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/special-requirements',
        requestType: 'application/vnd.referencedata.query.special-requirements+json'
      })
      .pipe(map((data) => data.specialRequirements));
  }

  fetchWitnessCareUnits(): Observable<WitnessCareUnit[]> {
    return this.cppHttp
      .query<{ witnessCareUnits: WitnessCareUnit[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/witness-care-units',
        requestType:
          'application/vnd.referencedata.query.witness-care-unit-with-police-force-code+json'
      })
      .pipe(map((data) => data.witnessCareUnits));
  }

  fetchJudicialMembers(options: SelectedJudiciaryOptions): Observable<JudicialMember[]> {
    let params = new HttpParams();

    Object.entries(options).forEach((option) => {
      if (option[1]) {
        params = params.set(option[0], String(option[1]));
      }
    });

    return this.cppHttp
      .query<{ judiciaries: JudicialMember[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/judiciaries`,
        requestType: 'application/vnd.reference-data.judiciaries+json',
        params
      })
      .pipe(map((res) => res.judiciaries));
  }

  fetchResultPromptWordSynonyms() {}

  fetchResultWordSynonyms() {}

  searchApplicationTypes(params: { q: string; limit: number }): Observable<CourtApplicationType[]> {
    return this.cppHttp
      .query<{ courtApplicationTypes: CourtApplicationType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/application-types-search',
        requestType: 'application/vnd.referencedata.application-types-search+json',
        params: mapObjectToHttpParams(params)
      })
      .pipe(map((data) => data.courtApplicationTypes));
  }

  searchApplicationStandAloneTypes(params: {
    search: string;
    limit: number;
  }): Observable<CourtApplicationType[]> {
    return this.cppHttp
      .query<{ offences: Offence[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/referencedata-moj-offences',
        requestType: 'application/vnd.referencedata.query.moj-offences+json',
        params: mapObjectToHttpParams(params)
      })
      .pipe(map((data) => mapApplicationType(data.offences)));
  }

  fetchTrialTypes(): Observable<TrialType[]> {
    return this.cppHttp
      .query<{ crackedIneffectiveVacatedTrialTypes: TrialType[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/cracked-ineffective-vacated-trial-types',
        requestType: 'application/vnd.referencedata.cracked-ineffective-vacated-trial-types+json'
      })
      .pipe(map((data) => data.crackedIneffectiveVacatedTrialTypes));
  }

  fetchPoliceRanks(): Observable<PoliceRank[]> {
    return this.cppHttp
      .query<{ policeRanks: PoliceRank[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/police-ranks',
        requestType: 'application/vnd.referencedata.police-ranks+json'
      })
      .pipe(map((data) => data.policeRanks));
  }
  fetchPublicHolidays(): Observable<PublicHoliday[]> {
    return this.cppHttp
      .query<{ publicHolidays: PublicHoliday[] }>({
        url: '/referencedata-query-api/query/api/rest/referencedata/public-holidays',
        requestType: 'application/vnd.referencedata.query.public-holidays+json'
      })
      .pipe(map((data) => data.publicHolidays));
  }

  fetchOrganisationsWithType(orgType: OrganisationType): Observable<OrganisationWithType[]> {
    return this.cppHttp
      .query<{ organisationTypes: OrganisationWithType[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/organisation?orgType=${orgType}`,
        requestType: 'application/vnd.referencedata.query.organisation.byOrgType+json'
      })
      .pipe(map((data) => data.organisationTypes));
  }
}
