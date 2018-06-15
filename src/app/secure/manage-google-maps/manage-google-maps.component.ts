import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { ToasterService } from '../../shared/toaster.service';
import { AfterViewInit } from '@angular/core';

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-manage-google-maps',
  templateUrl: './manage-google-maps.component.html',
  styleUrls: ['./manage-google-maps.component.scss']
})
export class ManageGoogleMapsComponent implements OnInit {
  public apiKeyFormControl: FormControl;
  public latitude = 52.237049;
  public longitude = 21.017532;
  public searchControl: FormControl;
  public zoom: number;
  public disabled = false;
  public coordinates: Coordinates;
  @ViewChild('search') public searchElementRef: ElementRef;
  public firstRowGap = 10;
  public height: Number;
  constructor(
    private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
      private toasterService: ToasterService) {
      }

  ngOnInit() {

    this.apiKeyFormControl = new FormControl('', [Validators.required]);

    // set google maps defaults
    this.coordinates = JSON.parse(localStorage.getItem('coordinates'));
    if (this.coordinates !== null) {
      this.latitude = this.coordinates.latitude;
      this.longitude = this.coordinates.longitude;
    }
    // create search FormControl
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          // types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  saveAPI() {
    console.log(this.apiKeyFormControl.value);
    this.apiKeyFormControl.reset();
    this.toasterService.showToaster('Zapisano Google API key', 'success');
  }

  saveCoordinates() {
    if (this.latitude && this.longitude) {
      this.disabled = false;
      const save = JSON.stringify({
        latitude: this.latitude,
        longitude: this.longitude
      });
      localStorage.setItem('coordinates', save);
      this.searchControl.reset();
      this.toasterService.showToaster('Zapisano lokalizację', 'success');
    }
  }

  placeMarker($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  markerDragEnd($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
}
