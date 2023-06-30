import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  getDistance( target: string, dest: string): Observable<any> {
    let apiKey = "YOUR API KEY";
    let url = "/api/maps/api/distancematrix/json?units=metric&language=de-DE&origins="+target+"&destinations="+dest+"&key="+apiKey;
    return this.http.get<any>(url);
  }

}
