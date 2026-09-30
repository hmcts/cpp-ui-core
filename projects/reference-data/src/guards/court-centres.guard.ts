import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { ReferenceDataActions } from '../actions/index';
import { getOrganisationUnits, ReferenceDataState } from '../reducers/index';
import { ReferenceDataService } from '../services/reference-data.service';

/**
 * @deprecated Use {@link createCourtCentreUnitsGuard} from `court-centre-units.gard` instead.
 */
@Injectable()
export class OrganisationUnitsGuard {
  constructor(
    private referenceData: ReferenceDataService,
    private router: Router,
    private store: Store<ReferenceDataState>
  ) {}

  hasOrganisationUnitsInStore() {
    return this.store.pipe(
      map(getOrganisationUnits),
      map((organisationUnits) => !!organisationUnits),
      take(1)
    );
  }

  hasOrganisationUnitsInApi() {
    return this.referenceData.fetchOrganisationUnits(false).pipe(
      tap((organisationUnits) =>
        this.store.dispatch(
          ReferenceDataActions.loadOrganisationUnitsSuccess({ organisationUnits })
        )
      ),
      mapTo(true)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { referenceDataErrorRedirectTo } = route.data as {
      referenceDataErrorRedirectTo?: string;
    };
    return this.hasOrganisationUnitsInStore().pipe(
      switchMap((hasInStore) => (hasInStore ? of(true) : this.hasOrganisationUnitsInApi())),
      tap({
        error: () => {
          if (referenceDataErrorRedirectTo) {
            this.router.navigateByUrl(referenceDataErrorRedirectTo);
          }
        }
      }),
      catchError(() => of(false))
    );
  }
}
