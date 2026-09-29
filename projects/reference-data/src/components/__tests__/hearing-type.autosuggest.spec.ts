import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { referenceDataReducer } from '../../reducers';
import { HearingTypeAutosuggestComponent } from '../hearing-type.autosuggest';
import { PdkAutosuggestLiteComponent } from '@cpp/pdk';

describe('HearingTypeAutosuggestComponent', () => {
  let fixture: ComponentFixture<HearingTypeAutosuggestTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        StoreModule.forRoot(() => null, {
          runtimeChecks: {}
        }),
        StoreModule.forFeature('referenceData', referenceDataReducer),
        HearingTypeAutosuggestComponent
      ],
      declarations: [HearingTypeAutosuggestTestComponent]
    });

    TestBed.overrideComponent(HearingTypeAutosuggestComponent, {
      remove: {
        imports: [PdkAutosuggestLiteComponent]
      },
      add: {
        imports: [AutosuggestLiteMockComponent]
      }
    });

    fixture = TestBed.createComponent(HearingTypeAutosuggestTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('disabled', () => {
    const autosuggestLiteInstance = () =>
      fixture.debugElement.query(By.directive(AutosuggestLiteMockComponent)).componentInstance;

    it('should default to enabled', () => {
      expect(autosuggestLiteInstance().disabled).toBe(false);
    });

    it('should forward disabled to the inner autosuggest', () => {
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(autosuggestLiteInstance().disabled).toBe(true);
    });

    it('should honour setDisabledState from the forms API', () => {
      const hearingTypeAutosuggest = fixture.debugElement.query(
        By.directive(HearingTypeAutosuggestComponent)
      ).componentInstance as HearingTypeAutosuggestComponent<never>;

      hearingTypeAutosuggest.setDisabledState(true);
      fixture.detectChanges();

      expect(autosuggestLiteInstance().disabled).toBe(true);
    });
  });
});

@Component({
  selector: 'cpp-hearing-type-autosuggest-test',
  template: `
    <cpp-hearing-type-autosuggest [id]="id" [disabled]="disabled"> </cpp-hearing-type-autosuggest>
  `,
  standalone: false
})
class HearingTypeAutosuggestTestComponent {
  disabled = false;
  id = 'id';
}

@Component({
  selector: 'pdk-autosuggest-lite',
  template: ``
})
class AutosuggestLiteMockComponent {
  @Input() ariaDescribedBy?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() disabled?: boolean;
  @Input() hasError?: boolean;
  @Input() highlightFirstSuggestion?: boolean;
  @Input() highlightMatchedText?: boolean;
  @Input() id?: string;
  @Input() inputWidth?: number;
  @Input() suggestions?: any[];
  @Input() suggestionKey?: string;
  @Input() suggestionTitle?: string;
  @Output() inputText = new EventEmitter<string>();
}
