import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourListComponent } from './tour-list.component';

describe('TourListComponent', () => {
  let component: TourListComponent;
  let fixture: ComponentFixture<TourListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourListComponent]
    });
    fixture = TestBed.createComponent(TourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
