import { SelectOption } from '@cpp/pdk';
import { OrganisationUnit } from '@cpp/reference-data';
import { CrownSessionStatusFilter, CrownSessionStatusFilterOption } from '../types/filters';
import { CrownSessionStatus } from '../types/hearingSlot';

const NONE_OPTION: SelectOption<CrownSessionStatusFilter> = {
  value: CrownSessionStatusFilterOption.NONE,
  label: 'No courtroom selected'
};

export const getCrownCourtroomOptions = (
  organisationUnit?: OrganisationUnit,
  defaultSessionStatus: CrownSessionStatus = CrownSessionStatus.DRAFT
): SelectOption<CrownSessionStatusFilter>[] => {
  const includeDraftSessionsOption =
    defaultSessionStatus === CrownSessionStatus.DRAFT ||
    defaultSessionStatus === CrownSessionStatus.ALL;

  const options: SelectOption<CrownSessionStatusFilter>[] = [];
  options.push({ value: CrownSessionStatusFilterOption.ALL, label: 'All' });
  if (includeDraftSessionsOption) {
    options.push(NONE_OPTION);
  }
  if (organisationUnit?.courtrooms) {
    for (const courtroom of organisationUnit.courtrooms) {
      options.push({ value: courtroom.id, label: courtroom.courtroomName });
    }
  }
  return options;
};
