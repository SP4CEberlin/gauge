import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  /*
  Please insert your google-Maps API-key below.

  Google API
  https://developers.google.com/maps/documentation/javascript/get-api-key

  Google Places API
  https://developers.google.com/maps/documentation/places/web-service/search

  Google Distance Matrix API
  https://developers.google.com/maps/documentation/distance-matrix/overview

   */
  apiKey = ""; // ENTER_YOUR_API_KEY_HERE

  mockedDist = {rows:[{elements:[{distance: {text:"err"}}]}]};
  mockedLoc = {results:[{formatted_address:'error: no api key'}]}

  constructor(private http: HttpClient) {
  }

  getDistance(target: string, dest: string): Observable<any> {
    if (this.apiKey != ""){
      let url = "/api/maps/api/distancematrix/json?units=metric&language=de-DE&origins=" + target + "&destinations=" + dest + "&key=" + this.apiKey;
      return this.http.get<any>(url);
    }else{
      return of(this.mockedDist);
    }
  }

  findPlace(query: string): Observable<any> {
    if (this.apiKey != "") {
      let saveQuery = encodeURIComponent(query);
      let url = "/api/maps/api/place/textsearch/json?query=" + saveQuery + "&key=" + this.apiKey;
      return this.http.get<any>(url);
    }else{
      return of(this.mockedLoc);
    }
  }

}



