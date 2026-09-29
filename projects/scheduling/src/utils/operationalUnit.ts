import { SelectOption } from '@cpp/pdk';
import { OrganisationUnit, sortSelectOptionAlphabetical } from '@cpp/reference-data';

export const getOperationalUnitOptions = (
  organisationUnits: OrganisationUnit[]
): SelectOption<string>[] => {
  const operationalUnitOptions = [] as SelectOption<string>[];
  for (const organisationUnit of organisationUnits) {
    if (!operationalUnitOptions.find((option) => option.value === organisationUnit.oucodeL2Code)) {
      operationalUnitOptions.push({
        value: organisationUnit.oucodeL2Code!,
        label: organisationUnit.oucodeL2Name!
      });
    }
  }
  operationalUnitOptions.sort(sortSelectOptionAlphabetical);
  return operationalUnitOptions;
};

export const isMagistratesCourt = (organisationUnit: OrganisationUnit): boolean =>
  organisationUnit?.oucodeL1Code === 'B';

export const isCrownCourt = (organisationUnit: OrganisationUnit): boolean =>
  organisationUnit?.oucodeL1Code === 'C';

export const operationalUnitAllCourtsPlaceholder = (
  oucodeL1Code: 'B' | 'C',
  oucodeL2Code?: string
): OrganisationUnit =>
  ({
    id: '',
    oucodeL1Code,
    oucodeL2Code,
    oucodeL3Name: 'All courts',
    oucodeL3Code: 'All courts'
  } as OrganisationUnit);
