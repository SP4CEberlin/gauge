import { Component } from '@angular/core';

@Component({
  selector: 'app-range-calculator',
  templateUrl: './range-calculator.component.html'
})
export class RangeCalculatorComponent {
  range = 9;
  charge = 50;
  maxRange= 18;

  onPercentChange(newValue: number) {
    this.charge = newValue;
    this.range = this.maxRange * ( this.charge / 100);
  }

  protected readonly Math = Math;
}
