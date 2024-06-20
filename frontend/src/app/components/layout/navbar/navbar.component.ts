import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .logo {
      font-family: 'Footlight MT Light', serif;
    }
      a {
        cursor: pointer;
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

export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  token!: string;
  id: any;
  newAuthor: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _auth: AuthService){}

  ngOnInit(): void {
    this.id = this._auth.getAuthorDataFromToken();
    
    this._auth.getAuthorById(this.id).subscribe(res => {
      this.newAuthor = res;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  myAccount() {
    if (this.newAuthor.data.fullName === '') {
      this.router.navigate(['/profile', this._auth.getAuthorDataFromToken()]);
    } else {
      this.router.navigate(['/author', this._auth.getAuthorDataFromToken()]);
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/signin']);
  }
}

