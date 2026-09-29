import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CppHttp, HttpQueryOptions, mapObjectToHttpParams } from '@cpp/core';
import { Observable, throwError, timer } from 'rxjs';
import { map, retryWhen, switchMap, take, timeout } from 'rxjs/operators';
import { HearingSlot, ListingNote, SearchHearingSlotsParams } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
  constructor(protected cppHttp: CppHttp) {}

  searchHearingSlots(
    paramsValues: SearchHearingSlotsParams,
    inBackground = false
  ): Observable<{ hearingSlots: HearingSlot[]; totalResults: number; notes: ListingNote[] }> {
    return this.cppHttp
      .query<{ hearingSlots: HearingSlot[]; results: number; notes: ListingNote[] }>({
        url: '/listing-query-api/query/api/rest/listing/hearingSlots',
        requestType: 'application/vnd.listing.search.hearing.slots+json',
        params: mapObjectToHttpParams(paramsValues),
        background: inBackground
      } as HttpQueryOptions)
      .pipe(
        map(({ hearingSlots, results, notes }) => ({
          hearingSlots,
          totalResults: results,
          notes
        })),
        retryWhen((errors$) =>
          errors$.pipe(
            switchMap((error: HttpErrorResponse) =>
              error.status === 502 ? timer(1000) : throwError(error)
            )
          )
        ),
        timeout(30000)
      );
  }

  async hasHearingSlotsFor(paramsValues: SearchHearingSlotsParams): Promise<boolean> {
    const extendedParams: SearchHearingSlotsParams = {
      ...paramsValues,
      showOverbookedSlots: true
    };

    return new Promise<boolean>((res, reject) =>
      this.searchHearingSlots(extendedParams, true)
        .pipe(
          map(({ hearingSlots }) => hearingSlots.length > 0),
          take(1)
        )
        .subscribe(res, reject)
    );
  }
}
