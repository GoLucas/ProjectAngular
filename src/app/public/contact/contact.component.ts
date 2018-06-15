import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface Coordinates {
  latitude: number;
   longitude: number;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
// public lat;
// public lng;
//   @ViewChild('contact') contactElementView: ElementRef;
//   @ViewChild('map') mapElementView: ElementRef;
//     public height: Number;
//     public coordinates: Coordinates;

//   constructor() { }

//   ngOnInit() {
//     this.coordinates = JSON.parse(localStorage.getItem('coordinates'));
//     this.lat = this.coordinates.latitude;
//     this.lng = this.coordinates.longitude;
//     this.height = this.contactElementView.nativeElement.offsetHeight;
//     console.log(this.height);
//   }

}
