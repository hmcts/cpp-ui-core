import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { ReferenceDataActions } from '../../actions/index';
import { referenceDataReducer, ReferenceDataState } from '../../reducers/index';
import { ReferenceDataService } from '../../services/reference-data.service';
import { getAllCourtCentreUnitsGuard } from '../get-all-court-centre-units.guard';

describe('getAllCourtCentreUnitsGuard', () => {
  let store: Store<ReferenceDataState>;

  let fetchOrganisationUnits: jest.Mock;
  let navigateByUrl: jest.Mock;

  beforeEach(() => {
    fetchOrganisationUnits = jest.fn();
    navigateByUrl = jest.fn();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            referenceData: referenceDataReducer
          },
          {
            runtimeChecks: {}
          }
        )
      ],
      providers: [
        {
          provide: ReferenceDataService,
          useValue: {
            fetchOrganisationUnits
          }
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl
          }
        }
      ]
    });

    store = TestBed.inject(Store);

    jest.spyOn(store, 'dispatch');
  });

  const createSnapshot = (referenceDataErrorRedirectTo = '') => {
    const snapshot = new ActivatedRouteSnapshot();
    snapshot.data = {
      referenceDataErrorRedirectTo
    };
    return snapshot;
  };

  it('should resolve to true when the organisation units exist in the store', () => {
    expect.assertions(1);
    const snapshot = createSnapshot();

    store.dispatch(
      ReferenceDataActions.loadAllOrganisationUnitsSuccess({ allOrganisationUnits: [] })
    );

    TestBed.runInInjectionContext(() =>
      getAllCourtCentreUnitsGuard(snapshot, {} as RouterStateSnapshot)
    ).subscribe((didResolve) => {
      expect(didResolve).toBe(true);
    });
  });

  it('should resolve to true after fetching the organisation units when not found in the store', () => {
    expect.assertions(3);
    const snapshot = createSnapshot();

    fetchOrganisationUnits.mockReturnValue(of([]));

    TestBed.runInInjectionContext(() =>
      getAllCourtCentreUnitsGuard(snapshot, {} as RouterStateSnapshot)
    ).subscribe((didResolve) => {
      expect(didResolve).toBe(true);
      expect(fetchOrganisationUnits).toHaveBeenCalledWith(true);
      expect(store.dispatch).toHaveBeenCalledWith(
        ReferenceDataActions.loadAllOrganisationUnitsSuccess({ allOrganisationUnits: [] })
      );
    });
  });

  it('should reject the activation when there is an error fetching the organisation units', () => {
    expect.assertions(2);
    const error = new HttpErrorResponse({ status: 500 });
    const snapshot = createSnapshot('/error-page');

    fetchOrganisationUnits.mockReturnValue(throwError(error));

    TestBed.runInInjectionContext(() =>
      getAllCourtCentreUnitsGuard(snapshot, {} as RouterStateSnapshot)
    ).subscribe((didResolve) => {
      expect(didResolve).toBe(false);
      expect(navigateByUrl).toHaveBeenCalledWith('/error-page');
    });
  });
});
