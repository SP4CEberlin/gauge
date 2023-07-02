import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tour} from '../interface/tour';

@Injectable({
  providedIn: 'root'
})
export class TourDataService {

  tourData: Tour[] = [
    {position: 3, title: 'Home', distance: "", location: '9F4MCGW4%2B4H', x: 52.445437, y: 13.506187},
    {position: 3, title: 'Office', distance: "", location: '9F4MCGV2%2BGX', x: 52.443812, y: 13.502562},
    {position: 1, title: 'MilchBar', distance: "", location: '9F4MFFHX%2BMG', x: 52.478938, y: 13.499063},
    {position: 4, title: 'Sunspot Plänterwald', distance: "", location: '9F4MFFPP%2BX9', x: 52.487437, y: 13.486688},
    {position: 3, title: 'Sunspot Kaisersteg', distance: "", location: '9F4MFG59%2B5V', x: 52.458062, y: 13.519687},
    {position: 4, title: 'Eierhäuschen', distance: "", location: '9F4MFFJV%2BGP', x: 52.481437, y: 13.494813},
    {position: 4, title: 'C-Base', distance: "", location: '9F4MGC7C%2B52', x: 52.512937, y: 13.420063},
    {position: 4, title: 'x-hain', distance: "", location: '9F4MGC7X%2B4W', x: 52.512812, y: 13.449813},
    {position: 4, title: 'Eifelturm', distance: "", location: '8FW4V75V%2B8Q', x: 48.8583, y: 2.2944813},

  ];

  rangeValue: number = 9;
  chargeValue: number = 50;

  getTourData(): Observable<Tour[]> {
    return of(this.tourData);
  }

  addData(newTour: Tour) {
    this.tourData.push(newTour);
    console.log(this.tourData)
  }

  getRange(){
    return this.rangeValue;
  }

  getCharge(){
    return this.chargeValue;
  }

  setAccu( range: number , charge: number) {
    this.rangeValue = range;
    this.chargeValue = charge;
  }

}
