import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrownSchedulingSlotsComponent } from './crown-scheduling-slots.component';
import { DatePipe } from '@angular/common';
import { RotaBusinessType } from '@cpp/reference-data';

describe('CrownSchedulingSlotsComponent', () => {
  let component: CrownSchedulingSlotsComponent;
  let fixture: ComponentFixture<CrownSchedulingSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrownSchedulingSlotsComponent, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(CrownSchedulingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should set rotaBusinessTypes correctly and generate a mapping', () => {
    const businessTypes: RotaBusinessType[] = [
      { typeCode: 'PTPH', typeDescription: 'PTPH' },
      { typeCode: 'SEN', typeDescription: 'Sentence' }
    ] as unknown as RotaBusinessType[];

    component.rotaBusinessTypes = businessTypes;
    expect(component.rotaBusinessTypesByCode).toEqual({
      PTPH: businessTypes[0],
      SEN: businessTypes[1]
    });
  });
});
