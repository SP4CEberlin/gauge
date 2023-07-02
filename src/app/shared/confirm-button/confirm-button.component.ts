import {Component, EventEmitter, Input, Output} from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html'
})
export class ConfirmButtonComponent {


  @Input()
  executeData: any;

  @Input()
  loading: boolean = false;

  @Input()
  disabled: boolean = false;

  @Output()
  deleteConfirm = new EventEmitter<string>();

  isArmed: boolean = false;
  triggerTimeWindow = timer(4000);
  confirm: boolean = false;

  armButton(): void {
    if (!this.isArmed) {
      this.isArmed = true;
      this.triggerTimeWindow.subscribe(timeVal => {
        this.isArmed = false;
        this.confirm = false;
      });
    }
  }

  fireButton(): void {
    this.confirm = true;
    if (this.isArmed) {
      this.loading = true;
      this.deleteConfirm.emit(this.executeData);
    }
  }


}
