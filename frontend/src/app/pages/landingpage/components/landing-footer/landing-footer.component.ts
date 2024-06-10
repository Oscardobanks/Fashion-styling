import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent {
  constructor(private scrollService: ScrollService) {}

  onClickScrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
