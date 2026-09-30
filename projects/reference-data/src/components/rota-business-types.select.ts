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
import {
  FormFieldControl,
  SelectChangeEvent,
  PdkSelectComponent,
  SelectInputWidth,
  SelectOption
} from '@cpp/pdk';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { loadRotaBusinessTypes } from '../actions/reference-data.actions';
import {
  getRotaBusinessTypesByJurisdiction,
  getRotaBusinessTypesFetching,
  ReferenceDataState
} from '../reducers/index';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RotaBusinessType, RotaBusinessTypeJurisdiction } from '../reference-data.interfaces';
import { sortSelectOptionAlphabetical } from '../utils/sort-select-options-Alphabetical';

@Component({
  selector: 'cpp-rota-business-type-select',
  template: `
    <pdk-select
      [ariaDescribedBy]="ariaDescribedBy"
      [disabled]="disabled"
      [id]="id"
      [justified]="justified"
      [inputWidth]="inputWidth"
      [name]="name"
      [options]="options$ | async"
      [placeholder]="placeholder"
      [required]="required"
      (change)="change.emit($event)"
    >
    </pdk-select>
  `,
  imports: [PdkSelectComponent, AsyncPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RotaBusinessTypeSelectComponent),
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => RotaBusinessTypeSelectComponent)
    }
  ]
})
export class RotaBusinessTypeSelectComponent
  implements OnInit, ControlValueAccessor, FormFieldControl
{
  @Input() ariaDescribedBy: string | null = null;
  @Input() disabled?: boolean;
  @Input() fetchOptionsOnMount = false;
  @Input() id!: string;
  @Input() justified?: boolean;
  @Input() name!: string;
  @Input() placeholder?: string;
  @Input() required?: boolean;
  @Input() inputWidth?: SelectInputWidth;
  @Input() set filterBy(fn: () => boolean) {
    this._filterBy = fn;
    this._buildOptions$.next();
  }
  @Input() jurisdiction: RotaBusinessTypeJurisdiction | 'ALL' = 'MAGISTRATES';
  @Output() change = new EventEmitter<SelectChangeEvent>();

  @ViewChild(PdkSelectComponent, { static: true }) selectRef!: PdkSelectComponent;

  options$: Observable<SelectOption[]>;
  private _filterBy: (businessType: RotaBusinessType) => boolean = () => true;

  // This is neccessary as filters change in some contexts
  //depending on user input or radio button selection - not necessarily conditional
  private _buildOptions$ = new BehaviorSubject<void>(undefined);

  constructor(private store: Store<ReferenceDataState>) {
    this.options$ = this._buildOptions$.pipe(
      switchMap(() =>
        this.store.pipe(
          select(getRotaBusinessTypesByJurisdiction(this.jurisdiction)),
          filter((businessTypes) => businessTypes !== null || businessTypes !== undefined),
          take(1),
          map((businessTypes) =>
            businessTypes.filter((businessType) => this._filterBy(businessType))
          ),
          map((businessTypes) => {
            if (businessTypes) {
              return businessTypes
                .map(({ typeCode, typeDescription }) => ({
                  value: typeCode,
                  label: typeDescription
                }))
                .sort(sortSelectOptionAlphabetical);
            }
            return [];
          }),
          startWith([])
        )
      )
    );
  }

  ngOnInit() {
    if (this.fetchOptionsOnMount) {
      this.store.pipe(select(getRotaBusinessTypesFetching), take(1)).subscribe((needsFetching) => {
        if (needsFetching) {
          this.store.dispatch(loadRotaBusinessTypes());
        }
      });
    }
  }

  registerOnChange = (fn: (_: any) => void): void => {
    this.selectRef.registerOnChange(fn);
  };

  // ControlValueAccessor forwarding

  propagateChange: (_: any) => void = (fn: any) => {
    this.selectRef.propagateChange(fn);
  };

  registerOnTouched(fn: any) {
    this.selectRef.registerOnTouched(fn);
  }

  writeValue(value?: string) {
    this.selectRef.writeValue(value ? value : undefined);
  }

  // FormFieldControl forwarding

  get controlType() {
    return this.selectRef.controlType;
  }

  get multi() {
    return this.selectRef.multi;
  }

  get ngControl() {
    return this.selectRef.ngControl;
  }

  get controlRef() {
    return this.selectRef.controlRef;
  }
}
