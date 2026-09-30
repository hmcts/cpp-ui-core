import { map } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  Signal,
  SimpleChanges,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { coerceBooleanProperty, FormFieldControl, PdkForm, PdkInput, PdkTextInput } from '@cpp/pdk';

let i = 0;

const minutesPerHour = 60;

interface FormInterface {
  weeks?: FormControl<string | null>;
  days?: FormControl<string | null>;
  hours?: FormControl<string | null>;
  minutes: FormControl<string | null>;
}

@Component({
  selector: 'estimate-input',
  templateUrl: './estimate-input.html',
  styleUrls: ['./estimate-input.scss'],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: EstimateInput
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EstimateInput),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EstimateInput),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [PdkForm, PdkTextInput, PdkInput, FormsModule, ReactiveFormsModule]
})
export class EstimateInput
  implements ControlValueAccessor, FormFieldControl, Validator, OnInit, OnChanges
{
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('aria-describedby') ariaDescribedBy!: string;
  @Input() hoursPerDay!: number;
  @Input() daysPerWeek!: number;
  @Input() minMinutesValue!: number;

  weeksEnabled = input(null, {
    transform: (value) => coerceBooleanProperty(value),
    alias: 'weeks-enabled'
  });
  daysEnabled = input(null, {
    transform: (value) => coerceBooleanProperty(value),
    alias: 'days-enabled'
  });
  hoursEnabled = input(null, {
    transform: (value) => coerceBooleanProperty(value),
    alias: 'hours-enabled'
  });

  readonly weeksRef = viewChild<unknown, ElementRef<HTMLInputElement>>('weeksInput', {
    read: ElementRef<HTMLInputElement>
  });
  readonly daysRef = viewChild<unknown, ElementRef<HTMLInputElement>>('daysInput', {
    read: ElementRef<HTMLInputElement>
  });
  readonly hoursRef = viewChild<unknown, ElementRef<HTMLInputElement>>('hoursInput', {
    read: ElementRef<HTMLInputElement>
  });
  readonly minutesRef = viewChild.required<unknown, ElementRef<HTMLInputElement>>('minutesInput', {
    read: ElementRef<HTMLInputElement>
  });

  id: string;
  controlType = 'estimate';
  multi = true;
  estimateInputs: FormGroup<FormInterface>;
  canBlur = false;
  hasFocus = false;

  minutesPerDay!: number;
  minutesPerWeek!: number;

  private propagateChange = (_: any) => {};

  get errorMessages() {
    const expected = this.minMinutesValue;
    const suffix = expected === 1 ? 'minute' : 'minutes';

    return [
      {
        rule: 'estimateFormat',
        message: `Time not recognised, use this format, for example 1 5 15`
      },
      {
        rule: 'minMinutesEstimate',
        message: `Estimate is too low - you must enter at least ${expected} ${suffix}`
      }
    ];
  }

  @Output() blur = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  constructor(private injector: Injector, elementRef: ElementRef) {
    i += 1;
    this.id = `estimate-input-${i}`;

    // Initialize the form group with explicit generic types.
    this.estimateInputs = new FormGroup<FormInterface>({
      minutes: new FormControl<string>('')
    });

    // Listen to inner control value changes and propagate the composite value.
    this.estimateInputs.valueChanges
      .pipe(
        map(({ weeks, days, hours, minutes }) => {
          if (weeks || days || hours || minutes) {
            return (
              this.minutesPerWeek * Number(weeks || 0) +
              this.minutesPerDay * Number(days || 0) +
              minutesPerHour * Number(hours || 0) +
              (Number(minutes) || 0)
            );
          }
          return undefined;
        })
      )
      .subscribe((val) => this.propagateChange(val));
  }

  get ngControl(): NgControl {
    return this.injector.get(NgControl);
  }

  get controlRef() {
    if (this.weeksEnabled() && this.weeksRef()) {
      return this.weeksRef as Signal<ElementRef<HTMLInputElement>>;
    }
    if (this.daysEnabled() && this.daysRef()) {
      return this.daysRef as Signal<ElementRef<HTMLInputElement>>;
    }
    if (this.hoursEnabled() && this.hoursRef()) {
      return this.hoursRef as Signal<ElementRef<HTMLInputElement>>;
    }
    return this.minutesRef;
  }

  ngOnInit() {
    if (this.weeksEnabled()) {
      this.estimateInputs.addControl('weeks', new FormControl<string>(''));
    }
    if (this.daysEnabled()) {
      this.estimateInputs.addControl('days', new FormControl<string>(''));
    }
    if (this.hoursEnabled()) {
      this.estimateInputs.addControl('hours', new FormControl<string>(''));
    }
    // Calculate minutes per day and per week based on input values or defaults.
    this.minutesPerDay = minutesPerHour * (this.hoursPerDay || 6);
    this.minutesPerWeek = this.minutesPerDay * (this.daysPerWeek || 7);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.minutesPerDay &&
      changes.minutesPerDay.currentValue !== changes.minutesPerDay.previousValue
    ) {
      this.minutesPerDay = minutesPerHour * (changes.minutesPerDay.currentValue || 24);
    }
    if (
      changes.daysPerWeek &&
      changes.daysPerWeek.currentValue !== changes.daysPerWeek.previousValue
    ) {
      this.minutesPerWeek = this.minutesPerDay * (changes.daysPerWeek.currentValue || 7);
    }
  }

  getAriaDescribedbyFor(controlName: string): string | null {
    if (controlName === 'weeks') {
      return this.ariaDescribedBy;
    }
    if (controlName === 'days' && !this.weeksEnabled()) {
      return this.ariaDescribedBy;
    }
    if (controlName === 'hours' && !this.weeksEnabled() && !this.daysEnabled()) {
      return this.ariaDescribedBy;
    }
    if (
      controlName === 'minutes' &&
      !this.weeksEnabled() &&
      !this.daysEnabled() &&
      !this.hoursEnabled()
    ) {
      return this.ariaDescribedBy;
    }
    return null;
  }

  getErrors(control: string) {
    const controlRef = this.estimateInputs.get(control);
    if (controlRef && controlRef.errors) {
      return Object.keys(controlRef.errors).map((key) => ({
        rule: key,
        message: ''
      }));
    }
    return null;
  }

  handleBlurInput($event: any) {
    this.canBlur = true;
    setTimeout(() => {
      if (this.canBlur) {
        this.blur.emit($event);
        this.hasFocus = false;
      }
    });
  }

  handleFocusInput($event: any) {
    if (!this.hasFocus) {
      this.focus.emit($event);
      this.hasFocus = true;
    }
    this.canBlur = false;
  }

  registerOnChange = (fn: (_: any) => object) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched() {}

  validate(c: FormControl): ValidationErrors | null {
    // Treat an empty value as valid so that the input can be optional.
    if (c.value === undefined) {
      return null;
    }

    const estimateFormat = this.validateFormat();
    if (estimateFormat && Object.keys(estimateFormat).length > 0) {
      return { estimateFormat };
    }
    const minMinutesEstimate = this.validateMinimumMinutes(c);
    if (minMinutesEstimate) {
      return minMinutesEstimate;
    }
    return null;
  }

  validateMinimumMinutes(c: FormControl): { [k: string]: any } | null {
    if (this.minMinutesValue && c.value < this.minMinutesValue) {
      return {
        minMinutesEstimate: {
          expected: this.minMinutesValue,
          actual: c.value
        }
      };
    }
    return null;
  }

  validateFormat(): { [k: string]: any } | null {
    return ['weeks', 'days', 'hours', 'minutes'].reduce(
      (errors: { [k: string]: any } = {}, controlName) => {
        const control = this.estimateInputs.get(controlName);
        if (control && !control.valid) {
          errors[controlName] = control.errors;
        }
        return errors;
      },
      {}
    );
  }

  writeValue(totalMinutes: number) {
    if (!totalMinutes) {
      this.estimateInputs.patchValue({
        weeks: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined
      });
      return;
    }

    let weeks: number | undefined;
    let days: number | undefined;
    let hours: number | undefined;
    let minutes: number | undefined;
    let remainingMinutes = totalMinutes;

    if (this.weeksEnabled()) {
      weeks = Math.floor(remainingMinutes / this.minutesPerWeek) || undefined;
      remainingMinutes = remainingMinutes % this.minutesPerWeek;
    }
    if (this.daysEnabled()) {
      days = Math.floor(remainingMinutes / this.minutesPerDay) || undefined;
      remainingMinutes = remainingMinutes % this.minutesPerDay;
    }
    if (this.hoursEnabled()) {
      hours = Math.floor(remainingMinutes / minutesPerHour) || undefined;
      remainingMinutes = remainingMinutes % minutesPerHour;
    }
    // eslint-disable-next-line prefer-const
    minutes = remainingMinutes || undefined;

    // Convert numeric values to strings to match the FormControl types.
    this.estimateInputs.patchValue({
      weeks: weeks !== undefined ? weeks.toString() : undefined,
      days: days !== undefined ? days.toString() : undefined,
      hours: hours !== undefined ? hours.toString() : undefined,
      minutes: minutes !== undefined ? minutes.toString() : undefined
    });
  }
}
