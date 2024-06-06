import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .logo {
      font-family: 'Footlight MT Light', serif;
    }

    @media (max-width: 991px) {
        #nav-lg {
            display: none;
        }
    }

    @media (min-width: 992px) {
        #header {
            display: none;
        }
    }

    @media (max-width: 375px) {
        .logo{
            font-size: x-large;
        }
    }
  `]
})
export class NavbarComponent {

}
