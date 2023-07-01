import {Component, OnInit} from '@angular/core';
import {GoogleMapsService} from "../service/google-maps.service";
import {TourDataService} from "../service/tour-data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tour} from "../interface/tour";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tour-add',
  templateUrl: './tour-add.component.html'
})
export class TourAddComponent implements OnInit{

  locationForm!: FormGroup;
  address = "";
  constructor(
    private formBuilder: FormBuilder,
    private service: GoogleMapsService,
    private tourDataService: TourDataService,
    private router: Router) {}


  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      locationInput: [''],
      plusCodeInput: [''],
      latInput: [''],
      lonInput: ['']
    });
  }

  onSubmit(){
    let form = this.locationForm.value
    let tour: Tour = {position: 4, title: 'x-hain', distance: "",  location: '9F4MGC7X%2B4W', x:52.512812,y:13.449813};
    tour.position = 4;
    tour.title = form.locationInput;
    tour.location = encodeURIComponent(form.plusCodeInput);
    tour.x = form.latInput;
    tour.y = form.lonInput;
    this.tourDataService.addData(tour);
    this.router.navigate(['tours'])
  }

  findPlace(){
    this.service.findPlace(this.locationForm.value.locationInput).subscribe({
      next: (place) => {
        // show address so the use can be sure it's correct
        this.address = place.results[0].formatted_address;
        // fill the form
        this.locationForm.get('plusCodeInput')?.setValue(place.results[0].plus_code.global_code);
        this.locationForm.get('latInput')?.setValue(place.results[0].geometry.location.lat);
        this.locationForm.get('lonInput')?.setValue(place.results[0].geometry.location.lng);
      }
    });
  }

}
