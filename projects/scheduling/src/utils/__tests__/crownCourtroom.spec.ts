import { organisationUnitMockTwo, CourtRoom, OrganisationUnit } from '@cpp/reference-data';
import { getCrownCourtroomOptions } from '../crownCourtroom';
import { CrownSessionStatusFilterOption } from '../../types/filters';
import { CrownSessionStatus } from '../../types/hearingSlot';

describe('getCrownCourtroomOptions', () => {
  const organisationUnit: OrganisationUnit = {
    ...organisationUnitMockTwo,
    courtrooms: [
      { id: '1', courtroomId: 1, courtroomName: 'Court 1' },
      { id: '2', courtroomId: 2, courtroomName: 'Court 2' }
    ] as CourtRoom[]
  };

  const allNoneAndCourtrooms = [
    { value: CrownSessionStatusFilterOption.ALL, label: 'All' },
    { value: CrownSessionStatusFilterOption.NONE, label: 'No courtroom selected' },
    { value: '1', label: 'Court 1' },
    { value: '2', label: 'Court 2' }
  ];

  it.each([CrownSessionStatus.DRAFT, CrownSessionStatus.ALL] as const)(
    'should include All, No courtroom selected then courtrooms for %s',
    (sessionStatus) => {
      expect(getCrownCourtroomOptions(organisationUnit, sessionStatus)).toEqual(
        allNoneAndCourtrooms
      );
    }
  );

  it('should exclude NONE and use courtroomName for courtrooms for FINAL', () => {
    expect(getCrownCourtroomOptions(organisationUnit, CrownSessionStatus.FINAL)).toEqual([
      { value: CrownSessionStatusFilterOption.ALL, label: 'All' },
      { value: '1', label: 'Court 1' },
      { value: '2', label: 'Court 2' }
    ]);
  });

  it('should behave like DRAFT when defaultSessionStatus is omitted', () => {
    expect(getCrownCourtroomOptions(undefined)).toEqual([
      { value: CrownSessionStatusFilterOption.ALL, label: 'All' },
      { value: CrownSessionStatusFilterOption.NONE, label: 'No courtroom selected' }
    ]);
  });
});
