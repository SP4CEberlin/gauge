import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { Observable, ReplaySubject } from "rxjs";
import { DataSource } from "@angular/cdk/collections";

export interface Tour {
  title: string;
  position: number;
  distance: number;
  tourDate: string;
  location: string;
  x: number;
  y: number;
}

const TOUR_DATA: Tour[] = [
  {position: 3, title: 'Home', distance: 10.811, tourDate: 'B', location: 'FCXG+VJ Berlin', x:52.445437, y:13.506187},
  {position: 3, title: 'Office', distance: 10.811, tourDate: 'B', location: 'FCXG+VJ Berlin', x:52.443812,y:13.502562},
  {position: 1, title: 'MilchBar', distance: 1.0079, tourDate: '12.12.2023', location: 'FCXG+VJ Berlin', x:52.478938,y:13.499063},
  {position: 4, title: 'Sunspot Plänterwald', distance: 4.0026, tourDate: 'He' , location: 'FCXG+VJ Berlin', x:52.487437,y:13.486688},
  {position: 3, title: 'Sunspot Kaisersteg', distance: 6.941, tourDate: 'Li', location: 'FCXG+VJ Berlin', x:52.458062,y:13.519687},
  {position: 4, title: 'Eierhäuschen', distance: 9.0122, tourDate: 'Be', location: 'FCXG+VJ Berlin', x:52.481437,y:13.494813},

];

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
})
export class TourListComponent implements OnInit{
  displayedColumns: string[] = ['position', 'title', 'distance', 'tourDate', 'trashbutton' , 'locbutton'];
  dataToDisplay = [...TOUR_DATA];

  dataSource = new TourDataSource(this.dataToDisplay);
  currentLocation = 0;

  ngOnInit(): void {
    this.setLocation(this.currentLocation);
  }

  calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return Math.round(distance* 10000) / 100;
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
      tourValue.distance = this.calculateDistance(x1,y1, tourValue.x, tourValue.y);
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
