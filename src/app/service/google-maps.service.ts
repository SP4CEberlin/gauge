import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  apiKey = "AIzaSyAXa1dcKOryMKquFrYCXjL7oME-X4kkKiM";

  constructor(private http: HttpClient) { }

  getDistance( target: string, dest: string): Observable<any> {
    let url = "/api/maps/api/distancematrix/json?units=metric&language=de-DE&origins="+target+"&destinations="+dest+"&key="+this.apiKey;
    return this.http.get<any>(url);
  }

  findPlace( query:string): Observable<any> {
    let saveQuery = encodeURIComponent(query);
    let url = "/api/maps/api/place/textsearch/json?query="+saveQuery+"&key="+this.apiKey;
    return this.http.get<any>(url);
  }

}
