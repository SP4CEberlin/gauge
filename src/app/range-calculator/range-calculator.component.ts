import {Component, OnInit} from '@angular/core';
import {TourDataService} from "../service/tour-data.service";

@Component({
  selector: 'app-range-calculator',
  templateUrl: './range-calculator.component.html'
})
export class RangeCalculatorComponent implements OnInit {
  range = 9;
  charge = 50;
  maxRange = 18;

  constructor(private tourDataService: TourDataService) {}

  ngOnInit() {
    this.charge = this.tourDataService.getCharge();
    this.range = this.tourDataService.getRange();
  }

  onPercentChange(newValue: number) {
    this.charge = newValue;
    this.range = this.maxRange * (this.charge / 100);
    this.tourDataService.setAccu( this.range, this.charge );
  }

  protected readonly Math = Math;
}
