import { Component, DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { EstimateInput } from './estimate-input';
import { PdkForm, PdkInput, PdkTextInput } from '@cpp/pdk';

function initTest<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
  TestBed.configureTestingModule({
    declarations: [component, ...directives],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      PdkForm,
      PdkInput,
      PdkTextInput,
      EstimateInput
    ],
    teardown: { destroyAfterEach: false }
  });
  return TestBed.createComponent(component);
}

interface TestEstimateInput {
  model: number;
  focus?: () => void;
  blur?: () => void;
  daysPerWeek?: number;
  hoursPerDay?: number;
}

describe('estimate-input', () => {
  let estimate: FormControl;
  let form: NgForm;
  let fixture: ComponentFixture<TestEstimateInput>;
  let weeksInput: DebugElement;
  let daysInput: DebugElement;
  let hoursInput: DebugElement;
  let minutesInput: DebugElement;

  const initTestWith = (C: Type<TestEstimateInput>) =>
    fakeAsync(() => {
      fixture = initTest(C);
      fixture.detectChanges();
      tick();
      form = fixture.debugElement.children[0].injector.get(NgForm);
      estimate = form.control.get('estimate') as FormControl;
      weeksInput = fixture.debugElement.query(By.css('[name=estimateWeeks]'));
      daysInput = fixture.debugElement.query(By.css('[name=estimateDays]'));
      hoursInput = fixture.debugElement.query(By.css('[name=estimateHours]'));
      minutesInput = fixture.debugElement.query(By.css('[name=estimateMinutes]'));
    });

  const setTimeValues = (values: {
    weeks?: string;
    days?: string;
    hours?: string;
    minutes?: string;
  }) => {
    const { weeks, days, hours, minutes } = values;

    if (weeksInput) {
      weeksInput.nativeElement.value = weeks || '';
      weeksInput.nativeElement.dispatchEvent(new Event('input'));
    }
    if (daysInput) {
      daysInput.nativeElement.value = days || '';
      daysInput.nativeElement.dispatchEvent(new Event('input'));
    }
    if (hoursInput) {
      hoursInput.nativeElement.value = hours || '';
      hoursInput.nativeElement.dispatchEvent(new Event('input'));
    }
    minutesInput.nativeElement.value = minutes || '';
    minutesInput.nativeElement.dispatchEvent(new Event('input'));
  };

  describe('when only minutes are used', () => {
    @Component({
      selector: 'estimate-minutes-input',
      template: `
        <form>
          <estimate-input name="estimate" [ngModel]="model" aria-describedby="identifier">
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateMinutes));

    it('hides the weeks, days and hours inputs', () => {
      expect(weeksInput).toBeFalsy();
      expect(daysInput).toBeFalsy();
      expect(hoursInput).toBeFalsy();
    });

    it('sets the model value when a value is entered', () => {
      setTimeValues({ minutes: '61' });
      expect(estimate.value).toEqual(61);
    });

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 61;
      fixture.detectChanges();
      tick();
      expect(minutesInput.nativeElement.value).toEqual('61');
    }));

    it('attaches the `aria-describedby` attributes to the minutes input', () => {
      expect(minutesInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
    });
  });

  describe('when hours are enabled', () => {
    @Component({
      selector: 'estimate-hours-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            hours-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateHoursMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateHoursMinutes));

    it('hides the weeks and days inputs', () => {
      expect(weeksInput).toBeFalsy();
      expect(daysInput).toBeFalsy();
    });

    it('sets the model value when a value is entered', () => {
      setTimeValues({ hours: '2', minutes: '59' });
      expect(estimate.value).toEqual(179);
    });

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 60 * 24 + 30;
      fixture.detectChanges();
      tick();
      expect(hoursInput.nativeElement.value).toEqual('24');
      expect(minutesInput.nativeElement.value).toEqual('30');
    }));

    it('attaches the `aria-describedby` attributes to the hours input', () => {
      expect(hoursInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
      expect(minutesInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
    });
  });

  describe('when days and hours are enabled', () => {
    @Component({
      selector: 'estimate-days-hours-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            hours-enabled
            days-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateDaysHoursMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateDaysHoursMinutes));

    it('hides the weeks input', () => {
      expect(weeksInput).toBeFalsy();
    });

    it('sets the model value when a value is entered', () => {
      setTimeValues({ days: '1', hours: '2', minutes: '59' });
      expect(estimate.value).toEqual(539);
    });

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 100 * 360 + 60 * 5 + 30;
      fixture.detectChanges();
      tick();
      expect(daysInput.nativeElement.value).toEqual('100');
      expect(hoursInput.nativeElement.value).toEqual('5');
      expect(minutesInput.nativeElement.value).toEqual('30');
    }));

    it('attaches the `aria-describedby` attributes to the days input', () => {
      expect(daysInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
      expect(hoursInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
      expect(minutesInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
    });
  });

  describe('when weeks, days and hours are enabled', () => {
    @Component({
      selector: 'estimate-weeks-days-hours-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            weeks-enabled
            hours-enabled
            days-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateWeeksDaysHoursMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateWeeksDaysHoursMinutes));

    it('sets the model value when a value is entered', () => {
      setTimeValues({ weeks: '6', days: '3', hours: '2', minutes: '59' });
      expect(estimate.value).toEqual(16379);
    });

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 100 * 2520 + 3 * 360 + 60 * 5 + 30;
      fixture.detectChanges();
      tick();
      expect(weeksInput.nativeElement.value).toEqual('100');
      expect(daysInput.nativeElement.value).toEqual('3');
      expect(hoursInput.nativeElement.value).toEqual('5');
      expect(minutesInput.nativeElement.value).toEqual('30');
    }));

    it('attaches the `aria-describedby` attributes to the weeks input', () => {
      expect(weeksInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
      expect(daysInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
      expect(hoursInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
      expect(minutesInput.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
    });
  });

  describe('when days are enabled', () => {
    @Component({
      selector: 'estimate-days-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            days-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateDaysMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateDaysMinutes));

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 3 * 360 + 1000;
      fixture.detectChanges();
      tick();
      expect(daysInput.nativeElement.value).toEqual('5');
      expect(minutesInput.nativeElement.value).toEqual('280');
    }));
  });

  describe('when weeks are enabled', () => {
    @Component({
      selector: 'estimate-weeks-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            weeks-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateWeeksMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateWeeksMinutes));

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 1 * 2520 + 100;
      fixture.detectChanges();
      tick();
      expect(weeksInput.nativeElement.value).toEqual('1');
      expect(minutesInput.nativeElement.value).toEqual('100');
    }));
  });

  describe('when weeks and hours are enabled', () => {
    @Component({
      selector: 'estimate-weeks-hours-minutes-input',
      template: `
        <form>
          <estimate-input name="estimate" [ngModel]="model" weeks-enabled hours-enabled>
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateWeeksHoursMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateWeeksHoursMinutes));

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 1 * 2520 + 60 * 20 + 5;
      fixture.detectChanges();
      tick();
      expect(weeksInput.nativeElement.value).toEqual('1');
      expect(hoursInput.nativeElement.value).toEqual('20');
      expect(minutesInput.nativeElement.value).toEqual('5');
    }));
  });

  describe('when weeks and days are enabled', () => {
    @Component({
      selector: 'estimate-weeks-days-minutes-input',
      template: `
        <form>
          <estimate-input name="estimate" [ngModel]="model" weeks-enabled days-enabled>
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateWeeksDaysMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateWeeksDaysMinutes));

    it('populates the estimate inputs when an external value is provided', fakeAsync(() => {
      fixture.componentInstance.model = 1 * 2520 + 5 * 360 + 59;
      fixture.detectChanges();
      tick();
      expect(weeksInput.nativeElement.value).toEqual('1');
      expect(daysInput.nativeElement.value).toEqual('5');
      expect(minutesInput.nativeElement.value).toEqual('59');
    }));
  });

  describe('when any input configuration is used', () => {
    @Component({
      selector: 'estimate-any-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            weeks-enabled
            hours-enabled
            days-enabled
            (focus)="focus ? focus($event) : null"
            (blur)="blur ? blur($event) : null"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateAny {
      model!: number;
      focus?: () => void;
      blur?: () => void;
    }

    beforeEach(initTestWith(EstimateAny));

    it('sets a value of `undefined` when no input is provided', () => {
      setTimeValues({});
      expect(estimate.value).toBeUndefined();
    });

    it('emits `focus` and `blur` events', fakeAsync(() => {
      const focus = jest.fn();
      const blur = jest.fn();

      fixture.componentInstance.focus = focus;
      fixture.componentInstance.blur = blur;
      tick();
      fixture.detectChanges();

      hoursInput.nativeElement.dispatchEvent(new Event('focus'));
      expect(focus).toHaveBeenCalledTimes(1);

      hoursInput.nativeElement.dispatchEvent(new Event('blur'));
      minutesInput.nativeElement.dispatchEvent(new Event('focus'));
      tick();
      expect(blur).toHaveBeenCalledTimes(0);
      expect(focus).toHaveBeenCalledTimes(1);

      minutesInput.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      hoursInput.nativeElement.dispatchEvent(new Event('focus'));
      expect(blur).toHaveBeenCalledTimes(1);
      expect(focus).toHaveBeenCalledTimes(2);
    }));

    it('raises a `estimateFormat` error for non-numeric inputs', () => {
      expect(form.valid).toBe(true);
      setTimeValues({ minutes: 'x' });
      expect(form.control.hasError('estimateFormat', ['estimate'])).toBe(true);
      setTimeValues({ hours: 'x' });
      expect(form.control.hasError('estimateFormat', ['estimate'])).toBe(true);
      setTimeValues({ days: 'x' });
      expect(form.control.hasError('estimateFormat', ['estimate'])).toBe(true);
      setTimeValues({ weeks: 'x' });
      expect(form.control.hasError('estimateFormat', ['estimate'])).toBe(true);
    });

    it('isolates the internal inputs from the outer form', () => {
      expect(form.control.get('estimateWeeks')).toBeFalsy();
      expect(form.control.get('estimateDays')).toBeFalsy();
      expect(form.control.get('estimateHours')).toBeFalsy();
      expect(form.control.get('estimateMinutes')).toBeFalsy();
    });
  });

  describe('when daysPerWeek and hoursPerDay inputs are provided', () => {
    @Component({
      selector: 'estimate-days-hours-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            [daysPerWeek]="5"
            [hoursPerDay]="6"
            hours-enabled
            days-enabled
            weeks-enabled
            aria-describedby="identifier"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateDaysHoursMinutes {
      model!: number;
    }

    beforeEach(initTestWith(EstimateDaysHoursMinutes));

    it('sets the model value when a value is entered', () => {
      setTimeValues({ days: '2', hours: '0', minutes: '0' });
      expect(estimate.value).toEqual(720);
      setTimeValues({ weeks: '1', days: '0', hours: '0', minutes: '0' });
      expect(estimate.value).toEqual(1800);
    });
  });

  describe('when minimum value validator is provided', () => {
    let component: EstimateInput;

    @Component({
      selector: 'estimate-days-hours-minutes-input',
      template: `
        <form>
          <estimate-input
            name="estimate"
            [ngModel]="model"
            aria-describedby="identifier"
            [minMinutesValue]="10"
          >
          </estimate-input>
        </form>
      `,
      standalone: false
    })
    class EstimateMinValue {
      model!: number;
    }

    beforeEach(initTestWith(EstimateMinValue));

    beforeEach(() => {
      component = fixture.debugElement.query(By.directive(EstimateInput)).componentInstance;
    });

    it('sets the model value when a value is entered greater than the minimum minutes', () => {
      setTimeValues({ minutes: '15' });
      expect(form.control.controls['estimate'].errors).toBeNull();
      expect(estimate.value).toEqual(15);
    });

    it('sets the model value when a value equal to the minimum minutes', () => {
      setTimeValues({ minutes: '10' });
      expect(form.control.controls['estimate'].errors).toBeNull();
      expect(estimate.value).toEqual(10);
    });

    it('raises a `minMinutesEstimate` error if the supplied value is less than the minimum', () => {
      setTimeValues({ minutes: '9' });
      expect(form.control.hasError('minMinutesEstimate', ['estimate'])).toBe(true);
      expect(estimate.value).toEqual(9);
    });

    it('error message uses `minute` when minimum value is 1', fakeAsync(() => {
      component.minMinutesValue = 1;
      tick();
      fixture.detectChanges();
      setTimeValues({ minutes: '0' });
      const errorMessages = component.errorMessages;
      const minMinutesMessage = errorMessages.find((msg) => msg.rule === 'minMinutesEstimate');
      expect(minMinutesMessage?.message).toContain('1 minute');
    }));

    it('error message uses `minutes` when minimum value is 10', () => {
      setTimeValues({ minutes: '9' });
      const errorMessages = component.errorMessages;
      const minMinutesMessage = errorMessages.find((msg) => msg.rule === 'minMinutesEstimate');
      expect(minMinutesMessage?.message).toContain('10 minutes');
    });
  });
});
