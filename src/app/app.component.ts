import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = ['#100', '#101', '#102'];
  activeLink = this.links[1];
}
