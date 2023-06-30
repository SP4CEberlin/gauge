import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeInputComponent } from './gauge-input.component';

describe('GaugeInputComponent', () => {
  let component: GaugeInputComponent;
  let fixture: ComponentFixture<GaugeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaugeInputComponent]
    });
    fixture = TestBed.createComponent(GaugeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
