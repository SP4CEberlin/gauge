import {Component, Input, OnInit} from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { DataSource } from "@angular/cdk/collections";
import { GoogleMapsService } from "../service/google-maps.service";
import {TourDataService} from "../service/tour-data.service";
import {Tour} from "../interface/tour";

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
})
export class TourListComponent implements OnInit{

  @Input() maxRange = 10;
  @Input() showControls = true;


  displayedColumns = [ 'locButton', 'title', 'distance' ];
  dataToDisplay: Tour[] = [];
  dataSource = new TourDataSource(this.dataToDisplay);
  currentLocation = 0;
  lat: number = 0;
  lng: number = 0;

  constructor(private service: GoogleMapsService, private tourDataService: TourDataService) {}

  ngOnInit(): void {

    if (this.showControls) {
      // add more elements
      this.displayedColumns = [ 'locButton', 'position', 'title', 'distance', 'trashButton' ];
    }


    this.tourDataService.getTourData().subscribe(data => {
      this.dataToDisplay = data;
      this.dataSource.setData(this.dataToDisplay);
      this.setLocation(this.currentLocation);
    });
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

  getInt( dist: string) {
    return parseInt(dist);
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
