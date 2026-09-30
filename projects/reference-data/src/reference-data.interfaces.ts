import { UserGroupType } from '@cpp/users-groups';
import { JudiciaryTypePayload, RefDataJudiciaryType } from './helpers/judiciary-type.helper';

export enum BreachType {
  GENERIC_BREACH = 'GENERIC_BREACH',
  COMMISSION_OF_NEW_OFFENCE_BREACH = 'COMMISSION_OF_NEW_OFFENCE_BREACH',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export enum SummonsTemplateType {
  GENERIC_APPLICATION = 'GENERIC_APPLICATION',
  BREACH = 'BREACH',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  FIRST_HEARING = 'FIRST_HEARING'
}

export enum LinkType {
  STANDALONE = 'STANDALONE',
  LINKED = 'LINKED',
  SJP = 'SJP',
  FIRST_HEARING = 'FIRST_HEARING'
}

export enum OffenceActiveOrderType {
  OFFENCE = 'OFFENCE',
  COURT_ORDER = 'COURT_ORDER',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export interface Cluster {
  id: string;
  clusterCode: string;
  clusterName: string;
}

export interface CPSCaseStatus {
  id: string;
  statusCode: string;
  statusDescription: string;
}

export interface CPSArea {
  id: string;
  areaName: string;
  areaCode: number;
}

export interface CPSBusinessUnit {
  buType: string;
  cmsAreaCode: number;
  id: string;
  oucode: string;
  sensitiveFlag: boolean;
  unitCode: number;
  unitName: string;
}
export interface CourtApplicationType {
  id: string;
  code?: string;
  type: string;
  legislation?: string;
  categoryCode: string;
  linkType: LinkType;
  jurisdiction: string;
  appealFlag: boolean;
  pssId?: string;
  applicationWording?: string;
  changeDate?: string;
  summonsTemplateType: SummonsTemplateType;
  validFrom?: string;
  hearingCode: string;
  applicantAppellantFlag: boolean;
  pleaApplicableFlag: boolean;
  offenceActiveOrder: OffenceActiveOrderType;
  commrOfOathFlag: boolean;
  breachType: BreachType;
  courtOfAppealFlag: boolean;
  courtExtractAvlFlag: boolean;
  listingNotifTemplate?: string;
  boxworkNotifTemplate?: string;
  typeWelsh?: string;
  legislationWelsh?: string;
  prosecutorThirdPartyFlag: boolean;
  spiOutApplicableFlag: boolean;
  resentencingActivationCode: string;
  prefix: string;
  exParte?: boolean;
  sowRef?: string;
  lastModified?: string;
  initialFeeApplicable?: boolean;
  contestedFeeApplicable?: boolean;
}

export interface CourtRoom {
  id: string;
  courtroomId: number;
  venueName: string;
  welshVenueName?: string;
  courtroomName: string;
  welshCourtroomName?: string;
}

export interface FixedList {
  id: string;
  startDate: string;
  endDate?: string;
  cjsQualifier?: string;
  elements: FixedListElement[];
  version: string;
}

export interface FixedListElement {
  code: string;
  value: string;
  welshValue?: string;
}

export interface HearingType {
  id: string;
  seqId: number;
  hearingCode: string;
  hearingDescription: string;
  welshHearingDescription: string;
  defaultDurationMin: number;
  validFrom?: string | null;
  validTo?: string | null;
  magistratesFlag?: boolean;
  crownFlag?: boolean;
  exhibitHearingCode?: string;
  exhibitHearingDescription?: string;
  strategicFlag?: boolean;
  tacticalFlag?: boolean;
  trialTypeFlag?: boolean;
}

export interface LocalJusticeArea {
  address?: {
    address1?: string;
    address2?: string;
    address3?: string;
    postcode?: string;
  };
  clusterCode: string;
  name?: string;
  nationalCourtCode?: string;
  region?: string;
  shortName?: string;
}

export interface OrganisationUnit {
  id: string;
  oucode?: string;
  oucodeL3Code: string;
  oucodeL3Name: string;
  oucodeL2Code?: string;
  oucodeL2Name?: string;
  oucodeL1Code?: string;
  oucodeL1Name?: string;
  region?: string;
  oucodeEffectiveFromDate?: string;
  oucodeEffectiveToDate?: string;
  lja?: string;
  phone?: string;
  fax?: string;
  email?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  postcode?: string;
  isWelsh?: string;
  oucodeL3WelshName?: string;
  welshAddress1?: string;
  welshAddress2?: string;
  welshAddress3?: string;
  welshAddress4?: string;
  welshAddress5?: string;
  defaultStartTime?: string;
  defaultDurationHrs?: string;
  courtrooms?: CourtRoom[];
}

export interface JudiciaryGroupType {
  id: string;
  judiciaryGroup: string;
  judiciaryTypeDescription: string;
}

export interface PleaType {
  id: string;
  sequence: number;
  pleaTypeCode: string;
  pleaTypeDescription: string;
  pleaTypeGuiltyFlag: 'Yes' | 'No';
  pleaTypeCivilFlag: 'Yes' | 'No';
  pleaStatusCode: string;
  pleaTypeUIFlag: boolean;
  pleaValue: string;
  jurisdiction: 'MAGISTRATES' | 'CROWN' | 'EITHER';
}

export interface PoliceForce {
  id: string;
  blockedModeFlag?: boolean;
  channel?: string;
  oucodeL2Code?: string;
  policeForceCode: string;
  policeForceName: string;
  validForSpiOut: boolean;
  validFrom: string;
  validTo: string;
}

export enum ProsecutionOrganisationType {
  LOCAL_AUTHORITIES = 'Local Authorities',
  TRAVEL_AND_TRANSPORT = 'Travel & Transport',
  GOV_BODIES = 'Government Bodies',
  NON_GOV_BODIES = 'Non-Government Bodies'
}
export interface Prosecutor {
  id: string;
  sequenceNumber: number;
  majorCreditorCode?: string;
  shortName: string;
  nameWelsh?: string;
  fullName: string;
  address?: {
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    postcode?: string;
  };
  validFrom?: string;
  validTo?: string;
  oucode?: string;
  spiInFlag?: boolean;
  spiOutFlag?: boolean;
  policeFlag?: boolean;
  contactEmailAddress?: string;
  standard?: boolean;
  prosecutorCategory?: ProsecutionOrganisationType;
  cpsFlag?: boolean;
}

export enum ResultDefinitionAdjournment {
  scheduled = 'S',
  unscheduled = 'U',
  noAdjournment = 'A'
}

export enum ResultDefinitionPostHearingCustodyStatus {
  ConditionalBail = 'B',
  UnconditionalBail = 'U',
  CustodyOrRemandedIntoCustody = 'C',
  NotApplicable = 'A',
  RemandedIntoCareOfLocalAuthority = 'L',
  ConditionalBailWithPreReleaseConditions = 'P',
  RemandedIntoSecureAccommodation = 'S',
  RearrestedAfterReleaseOnBail = 'R'
}

export enum ResultDefinitionLevel {
  case = 'C',
  defendant = 'D',
  offenceLevel = 'O'
}

export enum ResultDefinitionCategory {
  ancillary = 'A',
  final = 'F',
  interim = 'I'
}

export enum ResultDefinitionJurisdiction {
  all = 'B',
  crownCourt = 'CC',
  magistrates = 'M'
}

export interface WordGroup {
  wordGroup: string[];
}

export interface ResultDefinition {
  adjournment: 'Y' | 'N';
  category: ResultDefinitionCategory;
  cjsCode: string;
  convicted: 'Y' | 'N';
  d20: 'Y' | 'N';
  endDate?: string;
  financial: 'Y' | 'N';
  id: string;
  isAvailableForCourtExtract: boolean;
  isExcludedFromResults: boolean;
  isLifeDuration: boolean;
  isPublishedAsPrompt: boolean;
  jurisdiction: unknown;
  label: string;
  lCode: string;
  level: ResultDefinitionLevel;
  prompts: ResultPrompt[];
  rank: number;
  shortCode: string;
  startDate: string;
  terminatesOffenceProceedings: boolean;
  urgent: 'Y' | 'N';
  welshLabel?: string;
  wordGroups: WordGroup[];
  version: string;
}

export interface ResultPrompt {
  id: string;
  label: string;
  resultPromptRule: 'optional' | 'mandatory';
  type: ResultPromptType;
  sequence: number;
  userGroups: UserGroupType[];
  financial: 'Y' | 'N';
  courtExtract: 'Y' | 'N';
  jurisdiction: ResultDefinitionJurisdiction;
  min: number;
  max: number;
}

export enum ResultPromptType {
  boolean = 'BOOLEAN',
  date = 'DATE',
  fixedList = 'FIXL',
  integer = 'INT',
  text = 'TEXT',
  time = 'TIME'
}

export enum RotaBusinessTypeCode {
  applications = 'APP',
  bailCase = 'BAIL',
  breaches = 'BRE',
  communityJustice = 'COM',
  confiscation = 'CONF',
  councilTax = 'CT',
  crownCourt = 'CC',
  custodyCase = 'CUST',
  domesticViolenceBail = 'DVB',
  domesticViolencePSR = 'DVP',
  domesticViolenceTrials = 'DVT',
  drugRehabReviews = 'DRR',
  dvla = 'DVLA',
  general = 'GEN',
  guiltyAnticipatedPlea = 'GAP',
  guiltyPleaOnLine = 'GPL',
  notGuiltyAncitipatedPlea = 'NGAP',
  psr = 'PSR',
  remands = 'REM',
  televisionLicensing = 'TVL',
  terrorism = 'TER',
  tfl = 'TFL',
  traffic = 'TRF',
  trial = 'TRI'
}

export type RotaBusinessTypeJurisdiction = 'MAGISTRATES' | 'CROWN';

export interface RotaBusinessType {
  id: string;
  seqNum: number;
  typeCode: RotaBusinessTypeCode;
  typeDescription: string;
  slot: boolean;
  duration: boolean;
  jurisdiction?: RotaBusinessTypeJurisdiction;
}

export interface WitnessCareUnit {
  id: string;
  wcuName: string;
  wcuCode: string;
  policeForceCode?: string;
}

export interface WordSynonymItem {
  word: string;
  synonym: string;
}

export interface WordSynonym {
  id: string;
  version: string;
  startDate: string;
  endDate?: string;
  synonymCollection: WordSynonymItem[];
}

export interface ReusableInfoDefinitions {
  reusablePromptDefinitions: ReusablePromptDefinition[];
  reusableResultDefinitions: Array<{ shortCode: string }>;
}

export interface ReusablePromptDefinition {
  promptRef: string;
  type: string;
  cacheDataPath?: string;
  cacheable: number;
}

export interface TrialType {
  id: string;
  seqNo: number;
  reasonCode: string;
  trialType: string;
  jurisdiction: string;
  reasonShortDescription: string;
  value?: string;
  label?: string;
  vacateTrial?: boolean;
  type?: string;
}
export interface SelectedJudiciaryOptions {
  judiciaryGroup?: JudiciaryTypePayload;
  search?: string;
  ids?: string;
  limit?: number;
  withSpecialism?: boolean;
}

export enum Specialism {
  MURDER = 'MURDER',
  ATTEMPTEDMURDER = 'ATTEMPTED_MURDER',
  SEXUALOFFENCE = 'SEXUAL_OFFENCE',
  TERRORISM = 'TERRORISM'
}

export interface JudicialMember {
  id: string;
  cpUserId?: string;
  seqId: number;
  emailAddress: string;
  titlePrefix?: string;
  titleJudicialPrefix?: string;
  titleSuffix?: string;
  titlePrefixWelsh?: string;
  titleJudiciaryPrefixWelsh?: string;
  titleSuffixWelsh?: string;
  surname: string;
  forenames: string;
  judiciaryType: RefDataJudiciaryType;
  requestedName?: string;
  validFrom?: string;
  validTo?: string;
  ljaShortName?: string;
  specialisms?: Specialism[];
}

export interface SpecialRequirement {
  id: string;
  requirementCode: string;
  requirementValue: string;
  requirementValueWelsh?: string;
  validFrom?: string;
  validTo?: string;
}

export interface BookingType {
  id: string;
  typeCode: string;
  typeValue: string;
  typeValueWelsh?: string;
  validFrom?: string;
  validTo?: string;
}

export interface HearingPriority {
  id: string;
  seqNum: number;
  priorityCode: string;
  priorityValue: string;
  priorityValueWelsh?: string;
  validFrom?: string;
  validTo?: string;
}

export interface PoliceRank {
  id: string;
  sequence: number;
  rankCode: RankTypes;
  rankDescription: string;
}

export type RankTypes =
  | 'ACC'
  | 'ACOMM'
  | 'CC'
  | 'CDR'
  | 'COMM'
  | 'DAC'
  | 'DCC'
  | 'DCOMM'
  | 'C/SUPT'
  | 'D/C/SUPT'
  | 'D/SUPT'
  | 'SUPT'
  | 'CI'
  | 'DI'
  | 'INSP'
  | 'DS'
  | 'PS'
  | 'DC'
  | 'PC';
export interface PublicHoliday {
  id: string;
  division: string;
  title: string;
  date: string;
}

export enum OrganisationType {
  NPS = 'NPS',
  NPSBREACH = 'NPS_Breach',
  BULKSCAN = 'BULKSCAN'
}

export interface OrganisationWithType {
  id: string;
  seqNum: number;
  orgName: string;
  orgType: OrganisationType;
  startDate: string;
  endDate: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  postcode?: string;
  filtercode?: string;
  phoneNo?: string;
  emailAddress?: string;
}

export type OrganisationWithTypeAddress = Pick<
  OrganisationWithType,
  'address1' | 'address2' | 'address3' | 'address4' | 'address5' | 'postcode'
>;
export interface TerminalEntry {
  Max: string;
  Min: string;
  OteId: string;
  value: string;
  OteNumber: string;
  EntryFormat: string;
  EntryPrompt: string;
}

export interface Offence {
  offenceId: string;
  pssOffenceId: string;
  cjsOffenceCode: string;
  title: string;
  titleWelsh?: string;
  legislation: string;
  offenceWording: string;
  pnldOffenceWording: string;
  endorsableFlag: boolean;
  offenceType: string;
  terminalEntry: TerminalEntry[];
  canBeBulk: boolean;
  initialFeeApplicable: boolean;
  contestedFeeApplicable: boolean;
  exParte: boolean;
  sowRef: string;
  startDate: string;
  changeDate: string;
  custodialIndicator: string;
  recordable: string;
  pnldDateOfLastUpdate: string;
  search: string;
  details: Record<string, unknown>;
}
