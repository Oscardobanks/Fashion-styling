import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-landing-services',
  templateUrl: './landing-services.component.html',
  styleUrls: ['./landing-services.component.scss']
})
export class LandingServicesComponent {
  private subscription!: Subscription;

  constructor(private scrollService: ScrollService) {}
  
  panels = [
    { expanded: false,  title: 'Take Your Style quiz', content: 'First step towards discovering your unique fashion persona! answer a few fun questions to about your fashion preferences, lifestyle, body shape, and clothing sizes. This quiz helps the stylist understand your personal style and preferences.'},
    { expanded: false, title: 'match with stylist', content: "Based on the information gathered from the style quiz, the website's algorithm or team of stylists will match you with a stylist who best fits your style profile and requirements. The stylist will then review your responses and begin creating a personalized style plan for you." },
    { expanded: false, title: 'receive your new looks', content: "After the consultation, your stylist will curate a selection of clothing and accessories tailored to your preferences and needs. They may provide outfit suggestions, recommend key pieces to add to your wardrobe, and offer styling tips to help you achieve your desired look." }
  ];



  ngOnInit() {
    this.subscription = this.scrollService.scroll$.subscribe((sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  togglePanel(index: number): void {
    this.panels.forEach((panel, i) => {
      if (i === index) {
        panel.expanded = !panel.expanded;
      } else {
        panel.expanded = false;
      }
    });
  }
}
