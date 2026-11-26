import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { of } from 'rxjs';
import { SchedulingService } from './scheduling.service';
import { HearingSlot, ListingNote, SearchHearingSlotsParams } from '../types';

describe('SchedulingService', () => {
  let service: SchedulingService;
  let http: CppHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SchedulingService,
        {
          provide: CppHttp,
          useValue: {
            query: jest.fn()
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });
    http = TestBed.inject(CppHttp);
    service = TestBed.inject(SchedulingService);
  });

  describe('searchHearingSlots()', () => {
    it('should search for filtered hearing slots', () => {
      expect.assertions(2);

      const hearingSlot = { courtScheduleId: '*' } as HearingSlot;
      const params: SearchHearingSlotsParams = {
        oucodeL3Code: '*',
        courtRoomId: '*',
        oucodeL2Code: undefined,
        sessionStartDate: '2020-09-16',
        sessionEndDate: '2020-09-23',
        courtSession: 'AM',
        businessType: '*',
        jurisdiction: 'MAGISTRATES'
      };

      (http.query as jest.Mock).mockReturnValue(
        of({
          results: 10,
          pageCount: 2,
          hearingSlots: [hearingSlot],
          notes: [{ id: 'note-id' } as ListingNote]
        })
      );

      service.searchHearingSlots(params).subscribe((result) => {
        expect(result).toEqual({
          hearingSlots: [hearingSlot],
          totalResults: 10,
          notes: [{ id: 'note-id' }]
        });
        expect(http.query).toHaveBeenCalledWith({
          url: '/listing-query-api/query/api/rest/listing/hearingSlots',
          requestType: 'application/vnd.listing.search.hearing.slots+json',
          params: new HttpParams({ fromObject: params as any })
        });
      });
    });
  });
});
