import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-landing-about',
  templateUrl: './landing-about.component.html',
  styleUrls: ['./landing-about.component.scss']
})
export class LandingAboutComponent {
  private subscription!: Subscription;

  constructor(private scrollService: ScrollService) {}

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
}
