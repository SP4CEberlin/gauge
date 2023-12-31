import {Component, Input, OnInit} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {GoogleMapsService} from "../service/google-maps.service";
import {TourDataService} from "../service/tour-data.service";
import {Tour} from "../interface/tour";
import {CacheMapService} from "../service/cache-map.service";

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
})
export class TourListComponent implements OnInit {

  @Input() maxRange = 10;
  @Input() showControls = true;


  displayedColumns = ['locButton', 'title', 'distance'];
  dataToDisplay: Tour[] = [];
  dataSource = new TourDataSource(this.dataToDisplay);
  currentLocation = 0;
  lat: number = 0;
  lng: number = 0;

  constructor(private mapService: GoogleMapsService, private mapChacheService: CacheMapService, private tourDataService: TourDataService) {
  }

  ngOnInit(): void {

    if (this.showControls) {
      // add more elements
      this.displayedColumns = ['locButton', 'position', 'title', 'distance', 'trashButton'];
    }


    this.tourDataService.getTourData().subscribe(data => {
      this.dataToDisplay = data;
      this.dataSource.setData(this.dataToDisplay);
      this.setLocation(this.currentLocation);
    });

    this.maxRange = this.tourDataService.getRange();
  }

  getUserLocation() {
    this.currentLocation = -1; // no location from list
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        let userPosition = this.lat.toString() + "," + this.lng.toString()
        for (let tourValue of this.dataToDisplay) {
          this.mapService.getDistance(tourValue.location, userPosition).subscribe({
            next: (route) => {
              console.log(JSON.stringify(route, null, 4));
              tourValue.distance = route.rows[0].elements[0].distance.text;
            }
          })
        }
        this.dataSource.setData(this.dataToDisplay);
      });
    } else {
      console.log("User not allowed")
    }
  }

  getInt(dist: string): boolean {
    let ret = parseFloat(dist.replace('.','').replace(',','.'))
    return ret >= this.maxRange;
  }


  setLocation(i: number) {
    this.currentLocation = i;
    const x1 = this.dataToDisplay[i].x;
    const y1 = this.dataToDisplay[i].y;

    for (let tourValue of this.dataToDisplay) {
      // ask cacheService if we know the distance already
      let cachedDist = this.mapChacheService.getCachedDistance(this.dataToDisplay[i].location , tourValue.location )
      if (cachedDist){
        tourValue.distance = cachedDist;
      } else {
        // ask map service
        this.mapService.getDistance(tourValue.location, this.dataToDisplay[i].location).subscribe({
          next: (route) => {
            tourValue.distance = route.rows[0].elements[0].distance.text;
            this.mapChacheService.setCachedDistance( this.dataToDisplay[i].location , tourValue.location , tourValue.distance);
          }
        })


      }
    }

    this.dataSource.setData(this.dataToDisplay);
  }

  removeData(i: number) {
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

  disconnect() {
  }

  setData(data: Tour[]) {
    this._dataStream.next(data);
  }
}
