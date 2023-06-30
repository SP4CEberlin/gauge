import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { Observable, ReplaySubject } from "rxjs";
import { DataSource } from "@angular/cdk/collections";
import {GoogleMapsService} from "../google-maps.service";

export interface Tour {
  title: string;
  position: number;
  distance: string;
  location: string;
  x: number;
  y: number;
}

const TOUR_DATA: Tour[] = [
  {position: 3, title: 'Home', distance: "", location: '9F4MCGW4%2B4H', x:52.445437, y:13.506187},
  {position: 3, title: 'Office', distance: "",  location: '9F4MCGV2%2BGX', x:52.443812,y:13.502562},
  {position: 1, title: 'MilchBar', distance: "",  location: '9F4MFFHX%2BMG', x:52.478938,y:13.499063},
  {position: 4, title: 'Sunspot Plänterwald', distance: "",  location: '9F4MFFPP%2BX9', x:52.487437,y:13.486688},
  {position: 3, title: 'Sunspot Kaisersteg', distance: "",  location: '9F4MFG59%2B5V', x:52.458062,y:13.519687},
  {position: 4, title: 'Eierhäuschen', distance: "",  location: '9F4MFFJV%2BGP', x:52.481437,y:13.494813},

];

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
})
export class TourListComponent implements OnInit{
  displayedColumns: string[] = ['position', 'title', 'distance', 'trashButton' , 'locButton'];
  dataToDisplay = [...TOUR_DATA];
  dataSource = new TourDataSource(this.dataToDisplay);
  currentLocation = 0;
  lat: number = 0;
  lng: number = 0;

  constructor(private service: GoogleMapsService) {}

  ngOnInit(): void {
    this.setLocation(this.currentLocation);
  }

  getUserLocation() {
    this.currentLocation = -1; // no location from list
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        let userPosition = this.lat.toString() + "," + this.lng.toString()
        for (let tourValue of this.dataToDisplay) {
          this.service.getDistance(tourValue.location, userPosition).subscribe({
            next: (route) => {
              console.log(JSON.stringify(route, null, 4));
              tourValue.distance = route.rows[0].elements[0].distance.text;
            }
          })
        }
        this.dataSource.setData(this.dataToDisplay);
      });
    } else {
      console.log("User not allow")
    }
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * TOUR_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, TOUR_DATA[randomElementIndex]];
    this.dataSource.setData(this.dataToDisplay);
  }

  setLocation(i:number){
    this.currentLocation = i;
    const x1 = this.dataToDisplay[i].x;
    const y1 = this.dataToDisplay[i].y;

    for (let tourValue of this.dataToDisplay) {
      this.service.getDistance(tourValue.location, this.dataToDisplay[i].location).subscribe({
        next: (route) => {
          tourValue.distance = route.rows[0].elements[0].distance.text;
        }
      })
    }
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData(i:number) {
    this.dataToDisplay.splice(i, 1);
    this.dataSource.setData(this.dataToDisplay);
  }
}

class TourDataSource extends DataSource<Tour> {

  private _dataStream = new ReplaySubject<Tour[]>();

  constructor(initialData: Tour[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Tour[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Tour[]) {
    this._dataStream.next(data);
  }
}
