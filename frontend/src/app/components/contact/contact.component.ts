import { Component, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  title: string = 'Contact Us';
  subtitle: string = '';

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const mapDiv = this.elementRef.nativeElement.querySelector('#map');
    const mapOptions = {
      center: { lat: 4.044570, lng: 9.692620 },
      zoom: 12
    };
    const map = new google.maps.Map(mapDiv, mapOptions);

    const marker = new google.maps.Marker({
      position: { lat: 4.044570, lng: 9.692620 },
      map: map,
      title: 'Douala'
    });
  }
}
