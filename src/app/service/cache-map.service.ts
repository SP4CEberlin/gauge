import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheMapService {

  /*
  CacheMapService takes the distance data and stores it.
  The app can fist look in the CacheMapService if the Location and Distances already known,
  so we can save some API-requests from the google-maps-service.
  */

  distMap: Array<distance> = [
    {
      target: '9F4MCGW4%2B4H', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '1 m'},
        {destination: '9F4MCGV2%2BGX', distance: '0,4 km'},
        {destination: '9F4MFFHX%2BMG', distance: '5,8 km'},
        {destination: '9F4MFFPP%2BX9', distance: '5,9 km'},
        {destination: '9F4MFG59%2B5V', distance: '2,1 km'},
        {destination: '9F4MFFJV%2BGP', distance: '6,1 km'},
        {destination: '9F4MGC7C%2B52', distance: '10,6 km'},
        {destination: '9F4MGC7X%2B4W', distance: '10,3 km'}
      ]
    },
    {
      target: '9F4MCGV2%2BGX', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '0,4 km'},
        {destination: '9F4MCGV2%2BGX', distance: '1 m'},
        {destination: '9F4MFFHX%2BMG', distance: '6,1 km'},
        {destination: '9F4MFFPP%2BX9', distance: '6,8 km'},
        {destination: '9F4MFG59%2B5V', distance: '2,4 km'},
        {destination: '9F4MFFJV%2BGP', distance: '7,0 km'},
        {destination: '9F4MGC7C%2B52', distance: '10,9 km'},
        {destination: '9F4MGC7X%2B4W', distance: '10,6 km'}
      ]
    },
    {
      target: '9F4MFFHX%2BMG', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '5,6 km'},
        {destination: '9F4MCGV2%2BGX', distance: '5,9 km'},
        {destination: '9F4MFFHX%2BMG', distance: '1 m'},
        {destination: '9F4MFFPP%2BX9', distance: '5,7 km'},
        {destination: '9F4MFG59%2B5V', distance: '5,2 km'},
        {destination: '9F4MFFJV%2BGP', distance: '5,9 km'},
        {destination: '9F4MGC7C%2B52', distance: '8,2 km'},
        {destination: '9F4MGC7X%2B4W', distance: '5,7 km'}
      ]
    },
    {
      target: '9F4MFFPP%2BX9', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '6,0 km'},
        {destination: '9F4MCGV2%2BGX', distance: '6,2 km'},
        {destination: '9F4MFFHX%2BMG', distance: '5,8 km'},
        {destination: '9F4MFFPP%2BX9', distance: '1 m'},
        {destination: '9F4MFG59%2B5V', distance: '5,6 km'},
        {destination: '9F4MFFJV%2BGP', distance: '1,8 km'},
        {destination: '9F4MGC7C%2B52', distance: '6,1 km'},
        {destination: '9F4MGC7X%2B4W', distance: '5,8 km'}
      ]
    },
    {
      target: '9F4MFG59%2B5V', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '2,0 km'},
        {destination: '9F4MCGV2%2BGX', distance: '2,3 km'},
        {destination: '9F4MFFHX%2BMG', distance: '5,3 km'},
        {destination: '9F4MFFPP%2BX9', distance: '5,4 km'},
        {destination: '9F4MFG59%2B5V', distance: '1 m'},
        {destination: '9F4MFFJV%2BGP', distance: '5,6 km'},
        {destination: '9F4MGC7C%2B52', distance: '10,1 km'},
        {destination: '9F4MGC7X%2B4W', distance: '9,8 km'}
      ]
    },
    {
      target: '9F4MFFJV%2BGP', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '6,0 km'},
        {destination: '9F4MCGV2%2BGX', distance: '6,3 km'},
        {destination: '9F4MFFHX%2BMG', distance: '5,9 km'},
        {destination: '9F4MFFPP%2BX9', distance: '1,8 km'},
        {destination: '9F4MFG59%2B5V', distance: '5,7 km'},
        {destination: '9F4MFFJV%2BGP', distance: '1 m'},
        {destination: '9F4MGC7C%2B52', distance: '7,3 km'},
        {destination: '9F4MGC7X%2B4W', distance: '7,0 km'}
      ]
    },
    {
      target: '9F4MGC7C%2B52', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '11,0 km'},
        {destination: '9F4MCGV2%2BGX', distance: '11,3 km'},
        {destination: '9F4MFFHX%2BMG', distance: '8,2 km'},
        {destination: '9F4MFFPP%2BX9', distance: '5,6 km'},
        {destination: '9F4MFG59%2B5V', distance: '10,7 km'},
        {destination: '9F4MFFJV%2BGP', distance: '6,9 km'},
        {destination: '9F4MGC7C%2B52', distance: '1 m'},
        {destination: '9F4MGC7X%2B4W', distance: '2,6 km'}
      ]
    },
    {
      target: '9F4MGC7X%2B4W', destinations: [
        {destination: '9F4MCGW4%2B4H', distance: '10,7 km'},
        {destination: '9F4MCGV2%2BGX', distance: '11,0 km'},
        {destination: '9F4MFFHX%2BMG', distance: '5,7 km'},
        {destination: '9F4MFFPP%2BX9', distance: '5,2 km'},
        {destination: '9F4MFG59%2B5V', distance: '10,3 km'},
        {destination: '9F4MFFJV%2BGP', distance: '6,6 km'},
        {destination: '9F4MGC7C%2B52', distance: '2,6 km'},
        {destination: '9F4MGC7X%2B4W', distance: '1 m'}
      ]
    },
  ];

  constructor() {
  }

  getCachedDistance(target: string, dest: string) {
    let returnDist;
    let destList = this.distMap.find(o => o.target === target);
    if (destList) {
      returnDist = (destList.destinations.find(d => d.destination === dest))?.distance;
    }
    return returnDist;
  }

  setCachedDistance(target: string, dest: string, distance: string) {
    let destList = this.distMap.find(o => o.target === target);

    if (!destList) { // not found
      this.distMap.push({target: target, destinations: [{destination: target, distance: '1 m'}]});
    } else {
      destList.destinations.push({destination: dest, distance: distance});
    }
  }
}

export interface distance {
  target: string,
  destinations: Array<destinations>
}

export interface destinations {
  destination: string,
  distance: string
}
