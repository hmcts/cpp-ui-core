import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PdkAutosuggestLiteComponent, FormFieldControl, InputWidth } from '@cpp/pdk';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { loadHearingTypes } from '../actions/reference-data.actions';
import { getHearingTypes, getHearingTypesFetching, ReferenceDataState } from '../reducers/index';
import { HearingType } from '../reference-data.interfaces';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'cpp-hearing-type-autosuggest',
  template: `
    <pdk-autosuggest-lite
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [disabled]="disabled"
      [hasError]="hasError"
      [highlightFirstSuggestion]="highlightFirstSuggestion"
      [highlightMatchedText]="highlightMatchedText"
      [id]="id"
      [inputWidth]="inputWidth"
      (inputText)="search$.next($event)"
      [suggestions]="suggestions$ | async"
      [suggestionKey]="suggestionKey"
      [suggestionTitle]="suggestionTitle"
    >
    </pdk-autosuggest-lite>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HearingTypeAutosuggestComponent),
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => HearingTypeAutosuggestComponent)
    }
  ],
  imports: [PdkAutosuggestLiteComponent, AsyncPipe]
})
export class HearingTypeAutosuggestComponent<T extends HearingType>
  implements OnInit, ControlValueAccessor, FormFieldControl
{
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() disabled = false;
  @Input() fetchOptionsOnMount = false;
  @Input() hasError = false;
  @Input() highlightFirstSuggestion?: boolean;
  @Input() highlightMatchedText = true;
  @Input() id!: string;
  @Input() inputWidth?: InputWidth;
  @Input() maxResults = 6;
  @Output() error = new EventEmitter<any>();

  @ViewChild(PdkAutosuggestLiteComponent, { static: true })
  autosuggestLiteRef!: PdkAutosuggestLiteComponent<T>;

  fetching$: Observable<boolean>;
  search$ = new Subject<string>();
  suggestions$: Observable<HearingType[]>;
  suggestionKey: keyof HearingType = 'id';
  suggestionTitle: keyof HearingType = 'hearingDescription';

  constructor(private store: Store<ReferenceDataState>) {
    this.fetching$ = this.store.pipe(select(getHearingTypesFetching));

    this.suggestions$ = this.search$.pipe(
      switchMap((q) => {
        if (q.length !== 0) {
          return this.store.pipe(
            select(getHearingTypes),
            take(1),
            tap((hearingTypes) => {
              if (hearingTypes === undefined) {
                this.store.dispatch(loadHearingTypes());
              }
            }),
            switchMapTo(this.store),
            select(getHearingTypes),
            filter((hearingTypes) => hearingTypes !== null),
            take(1),
            map((hearingTypes) => {
              if (hearingTypes) {
                const term = q.toLowerCase();

                return hearingTypes.filter(
                  ({ hearingCode, hearingDescription }) =>
                    hearingCode.toLowerCase().includes(term) ||
                    hearingDescription.toLowerCase().includes(term)
                );
              }
              return [];
            }),
            map((hearingTypes) => hearingTypes.slice(0, Math.max(this.maxResults, 10)))
          );
        }
        return of([]);
      }),
      startWith([])
    );
  }

  ngOnInit() {
    if (this.fetchOptionsOnMount) {
      this.store.dispatch(loadHearingTypes());
    }
  }

  // ControlValueAccessor forwarding

  propagateChange: (_: any) => void = (fn: any) => {
    this.autosuggestLiteRef.propagateChange(fn);
  };

  registerOnChange(fn: (_: any) => void): void {
    this.autosuggestLiteRef.registerOnChange(fn);
  }

  registerOnTouched(fn: any) {
    this.autosuggestLiteRef.registerOnTouched(fn);
  }

  writeValue(value?: T) {
    this.autosuggestLiteRef.writeValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // FormFieldControl forwarding

  get controlType() {
    return this.autosuggestLiteRef.controlType;
  }

  get multi() {
    return this.autosuggestLiteRef.multi;
  }

  get ngControl() {
    return this.autosuggestLiteRef.ngControl;
  }

  get controlRef() {
    return this.autosuggestLiteRef.controlRef;
  }
}
