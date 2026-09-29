import { SchedulingActions } from '../actions';
import { HearingSlot, ListingNote, SearchHearingSlotsParams } from '../types';
import { scheduling } from './scheduling';
import {
  createListingNoteSuccess,
  deleteListingNoteSuccess,
  loadListingNotes,
  showListingNoteSuccessMessage,
  updateListingNoteSuccess
} from '../actions/listing-notes.actions';

const mockHearingSlot = [{ courtScheduleId: '*' }] as HearingSlot[];

const schedulingStateMock = {
  allocation: {
    params: { pageSize: 10 } as SearchHearingSlotsParams,
    hearingSlots: mockHearingSlot,
    totalResults: 1
  },
  listingNotes: {
    notes: [],
    publishStatusMessage: undefined
  }
};

describe('scheduling reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = scheduling(undefined, {} as any);
      expect(result).toMatchSnapshot();
    });
  });

  describe('SchedulingActions.loadHearingSlotsSuccess', () => {
    it('should populate hearingSlots, totalResults, and params', () => {
      const action = SchedulingActions.loadHearingSlotsSuccess({
        params: { pageSize: 10 } as SearchHearingSlotsParams,
        hearingSlots: mockHearingSlot,
        totalResults: 1
      });
      const result = scheduling(undefined, action);
      expect(result.allocation).toEqual({
        hearingSlots: mockHearingSlot,
        totalResults: 1,
        params: { pageSize: 10 }
      });
    });
  });

  describe('SchedulingActions.resetHearingSlots', () => {
    it('should reset allocation to initial state', () => {
      const action = SchedulingActions.resetHearingSlots();
      const result = scheduling(schedulingStateMock, action);
      expect(result.allocation).toEqual({
        hearingSlots: [],
        totalResults: -1,
        params: null
      });
    });
  });

  describe('Listing notes', () => {
    it('should load listing notes', () => {
      const state = schedulingStateMock;
      const notes = [{ id: 'note-id' } as ListingNote];

      const actualState = scheduling(state, loadListingNotes({ notes }));

      expect(actualState.listingNotes.notes).toEqual(notes);
    });

    it('should create listing note', () => {
      const state = schedulingStateMock;
      const note = { id: 'note-id', courtRoomId: 'courtRoomId' } as ListingNote;

      const actualState = scheduling(state, createListingNoteSuccess({ note }));

      expect(actualState.listingNotes.notes).toContainEqual(note);
    });

    it('should update note', () => {
      const state = {
        ...schedulingStateMock,
        listingNotes: {
          ...schedulingStateMock.listingNotes,
          notes: [{ id: 'note-id', note: 'created note' }] as ListingNote[]
        }
      };

      const payload = { noteId: 'note-id', noteDescription: 'updated note' };
      const actualState = scheduling(state, updateListingNoteSuccess(payload));

      expect(actualState.listingNotes.notes[0]).toEqual({ id: 'note-id', note: 'updated note' });
    });

    it('should delete note', () => {
      const state = {
        ...schedulingStateMock,
        listingNotes: {
          ...schedulingStateMock.listingNotes,
          notes: [{ id: 'note-id', note: 'created note' }] as ListingNote[]
        }
      };

      const actualState = scheduling(state, deleteListingNoteSuccess({ noteId: 'note-id' }));

      expect(actualState.listingNotes.notes).toEqual([]);
    });

    it('should set publishStatusMessage', () => {
      const state = schedulingStateMock;
      const successMessage = 'Note saved successfully';

      const actualState = scheduling(state, showListingNoteSuccessMessage({ successMessage }));

      expect(actualState.listingNotes.publishStatusMessage).toBe(successMessage);
    });
  });
});
