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
