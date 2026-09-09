import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ReferenceDataActions } from '../actions/index';
import { getAllOrganisationUnits, ReferenceDataState } from '../reducers/index';
import { ReferenceDataService } from '../services/reference-data.service';

export function getAllCourtCentreUnitsGuard(
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean> {
  const referenceDataService = inject(ReferenceDataService);
  const store = inject(Store<ReferenceDataState>);
  const router = inject(Router);
  const { referenceDataErrorRedirectTo } = route.data as {
    referenceDataErrorRedirectTo?: string;
  };

  return hasOrganisationUnitsInStore(store).pipe(
    switchMap((inStore) =>
      inStore ? of(true) : hasOrganisationUnitsInApi(store, referenceDataService)
    ),
    tap({
      error: () => {
        if (referenceDataErrorRedirectTo) {
          router.navigateByUrl(referenceDataErrorRedirectTo);
        }
      }
    }),
    catchError(() => of(false))
  );
}

const hasOrganisationUnitsInStore = (store: Store<ReferenceDataState>): Observable<boolean> =>
  store.pipe(
    map(getAllOrganisationUnits),
    map((allOrganisationUnits) => !!allOrganisationUnits),
    take(1)
  );

const hasOrganisationUnitsInApi = (
  store: Store<ReferenceDataState>,
  service: ReferenceDataService
) =>
  service.fetchOrganisationUnits(true).pipe(
    tap((allOrganisationUnits) =>
      store.dispatch(ReferenceDataActions.loadAllOrganisationUnitsSuccess({ allOrganisationUnits }))
    ),
    map(() => true)
  );
