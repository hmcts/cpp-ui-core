import {
  defaultSessionStatusFilterOption,
  searchFieldsForSessionFilter,
  sessionFilterFromParams
} from '../sessionStatusFilter';
import { CrownSessionStatusFilterOption } from '../../types/filters';
import { CrownSessionStatus } from '../../types/hearingSlot';

describe('searchFieldsForSessionFilter', () => {
  it('should return DRAFT status and omit courtRoomId for NONE', () => {
    expect(searchFieldsForSessionFilter(CrownSessionStatusFilterOption.NONE)).toEqual({
      status: CrownSessionStatus.DRAFT,
      courtRoomId: undefined
    });
  });

  it('should return FINAL status and omit courtRoomId for ALL', () => {
    expect(searchFieldsForSessionFilter(CrownSessionStatusFilterOption.ALL)).toEqual({
      status: CrownSessionStatus.FINAL,
      courtRoomId: undefined
    });
  });

  it('should return FINAL status and courtRoomId for courtroom id', () => {
    expect(searchFieldsForSessionFilter('1')).toEqual({
      status: CrownSessionStatus.FINAL,
      courtRoomId: '1'
    });
  });

  it('should return empty object for undefined', () => {
    expect(searchFieldsForSessionFilter(undefined)).toEqual({});
  });
});

describe('sessionFilterFromParams', () => {
  it('should return courtroom id when courtRoomId is set', () => {
    expect(
      sessionFilterFromParams({
        courtRoomId: '1',
        status: CrownSessionStatus.FINAL
      })
    ).toBe('1');
  });

  it('should return ALL when status is FINAL and courtRoomId is absent', () => {
    expect(sessionFilterFromParams({ status: CrownSessionStatus.FINAL })).toBe(
      CrownSessionStatusFilterOption.ALL
    );
  });

  it('should return NONE when status is DRAFT and courtRoomId is absent', () => {
    expect(sessionFilterFromParams({ status: CrownSessionStatus.DRAFT })).toBe(
      CrownSessionStatusFilterOption.NONE
    );
  });
});

describe('defaultSessionStatusFilterOption', () => {
  it('should return NONE for DRAFT status', () => {
    expect(defaultSessionStatusFilterOption(CrownSessionStatus.DRAFT)).toBe(
      CrownSessionStatusFilterOption.NONE
    );
  });

  it.each([CrownSessionStatus.ALL, CrownSessionStatus.FINAL] as const)(
    'should return ALL for %s status',
    (sessionStatus) => {
      expect(defaultSessionStatusFilterOption(sessionStatus)).toBe(
        CrownSessionStatusFilterOption.ALL
      );
    }
  );
});
