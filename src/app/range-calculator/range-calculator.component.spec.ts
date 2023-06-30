import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCalculatorComponent } from './range-calculator.component';

describe('RangeCalculatorComponent', () => {
  let component: RangeCalculatorComponent;
  let fixture: ComponentFixture<RangeCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RangeCalculatorComponent]
    });
    fixture = TestBed.createComponent(RangeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
