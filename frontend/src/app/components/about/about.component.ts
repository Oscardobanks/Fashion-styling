import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [`
  .team img {
    padding-bottom: 10px;
    width: 100%;
    height: 50vh;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .team img {
    width: 100%;
    height: 25vh;
    }
  }

  @media (max-width: 600px) {
    .team img {
    width: 100%;
    height: 50vh;
    }
  }
  `]
})
export class AboutComponent {
  title: string = 'About us';
  subtitle: string = '';
}
