import { CrownSessionStatusFilter, CrownSessionStatusFilterOption } from '../types/filters';
import { CrownSessionStatus } from '../types/hearingSlot';

export const searchFieldsForSessionFilter = (
  filter: CrownSessionStatusFilter | undefined
): { status?: CrownSessionStatus; courtRoomId?: string } => {
  if (filter == null) return {};
  if (filter === CrownSessionStatusFilterOption.NONE) {
    return { status: CrownSessionStatus.DRAFT, courtRoomId: undefined };
  }
  return {
    status: CrownSessionStatus.FINAL,
    courtRoomId: filter === CrownSessionStatusFilterOption.ALL ? undefined : filter
  };
};

export const sessionFilterFromParams = (params: {
  courtRoomId?: string;
  status?: CrownSessionStatus;
}): CrownSessionStatusFilter | undefined => {
  const { courtRoomId, status } = params;
  if (courtRoomId) {
    return courtRoomId;
  }
  if (status === CrownSessionStatus.DRAFT) {
    return CrownSessionStatusFilterOption.NONE;
  }
  if (status === CrownSessionStatus.FINAL) {
    return CrownSessionStatusFilterOption.ALL;
  }
  return undefined;
};

export const defaultSessionStatusFilterOption = (
  defaultSessionStatus: CrownSessionStatus = CrownSessionStatus.DRAFT
): CrownSessionStatusFilterOption =>
  defaultSessionStatus === CrownSessionStatus.DRAFT
    ? CrownSessionStatusFilterOption.NONE
    : CrownSessionStatusFilterOption.ALL;
