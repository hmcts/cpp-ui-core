export type UserGroupType =
  | 'IDAM'
  | 'CMS'
  | 'Court Clerks'
  | 'Prison Admin'
  | 'Judge'
  | 'Judiciary'
  | 'Judicial Officer'
  | 'Listing Officers'
  | 'Crown Court Admin'
  | 'Probation Admin'
  | 'Police Admin'
  | 'Victims & Witness Care Admin'
  | 'Youth Offending Service Admin'
  | 'System Users'
  | 'Online Plea System Users'
  | 'FTPS'
  | 'Court Administrators'
  | 'Legal Advisers'
  | 'Support Users'
  | 'TFL Prosecutors'
  | 'SJP Prosecutors'
  | 'TVL Prosecutors'
  | 'HMCTS Analytics and Performance'
  | 'Defence Users'
  | 'Legal Aid Agency Admin'
  | 'CPPI Consumers'
  | 'Performance Users'
  | 'CPS'
  | 'Defence Lawyers'
  | 'Auditors';

interface Permission {
  description: string;
  object: string;
  action: string;
  source?: string;
  activeDate?: string;
  startTime?: string;
  endTime?: string;
}

export type AddPermissionPayload = Permission & { target?: string; active?: boolean; id: string };
export interface RolePermission extends Permission {
  permissionId: string;
  target?: string;
}

export interface AggregatedRolePermission extends Permission {
  targets?: string[];
}

export interface UserPersonalDetails {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserDetails extends UserPersonalDetails {
  organisationId?: string;
  userType?: UserType;
  prosecutingAuthorityAccess: string;
}

export enum UserType {
  User = 'User',
  CPPSupportAdmin = 'CPP-Support-Admin',
  OrganisationAdmin = 'Organisation-Admin'
}

export interface UserService {
  name: string;
  containsSearch: boolean;
  features: UserServiceFeature[];
}

export interface UserGroup {
  groupId: string;
  groupName: UserGroupType | string;
  description: string;
  prosecutingAuthority?: string;
}

export interface UserServiceFeature {
  key: string;
  title: string;
  type: 'LINK' | 'SEARCH' | 'COMPONENT';
}

export interface UserRole {
  roleId: string;
  label: string;
  description: string;
  active?: boolean;
  selectable?: boolean;
  startDate?: string;
  endDate?: string;
  permissionIds?: string[];
  organisationId?: string;
  groupIds?: string[];
  userPlacements?: UserPlacement[];
}
export interface UserPermissions {
  groups: UserGroup[];
  permissions: RolePermission[];
  switchableRoles: UserRole[];
}

export interface UserOrganisation {
  organisationId: string;
  organisationType: string;
  organisationName: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  addressPostcode?: string;
  phoneNumber?: string;
  email?: string;
  laaContractNumbers?: string[];
}

export interface UserGroupWithOrganisation extends UserGroup {
  category: string;
  organisationId: string;
  roleIds: string[];
  resultsReferenceDataGroup?: string;
  documentsReferenceDataGroup?: string;
}

export interface UserPlacement {
  placementId: string;
  home?: boolean;
}

export interface UserSystemDowntimeAnnouncement {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysInAdvance: number;
}

export enum AnnouncementCategory {
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED'
}

export enum AnnouncementType {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  INFORMATION = 'INFORMATION'
}

export interface SystemAnnouncement {
  id?: string;
  title: string;
  details: string;
  category: AnnouncementCategory;
  type: AnnouncementType;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  createdBy?: string;
  createdAt?: string;
}
