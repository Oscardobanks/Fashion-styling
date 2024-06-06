import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss']
})
export class SigninSignupComponent {

  title = 'signin-signup';
  selectedOption!: string;
  showResetPasswordForm = false;
  signUpMode: boolean = false;
  signUpMode2: boolean = false;
  hideSignUp: boolean = false;

  author = {
    username: '',
    email: '',
    password: '',
    bodyweight: '',
    height: '',
  }

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    const sign_in_btn2 = document.querySelector("#sign-in-btn2");
    const sign_up_btn2 = document.querySelector("#sign-up-btn2");
    const signup_btn = document.getElementById("signup-btn");

    sign_up_btn?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode");
    });

    sign_in_btn?.addEventListener("click", () => {
      container?.classList.remove("sign-up-mode");
      this.signUpMode = false;
      this.signUpMode2 = false;
    });

    sign_up_btn2?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode2");
      if (container!.classList.contains("sign-up-mode2")) {
        signup_btn!.style.display = "none";
      }
    });

    sign_in_btn2?.addEventListener("click", () => {
      container?.classList.remove("sign-up-mode2");
      signup_btn!.style.display = "block";
      this.signUpMode = false;
      this.signUpMode2 = false;
    });
  }

  toggleResetPasswordForm(showReset: boolean, event: Event) {
    event.preventDefault();
    this.showResetPasswordForm = showReset;
    this.signUpMode = !this.signUpMode;
    this.hideSignUp = !this.hideSignUp;
    this.signUpMode2 = !this.signUpMode2;
  }

  toggleSignUpModes() {
    this.signUpMode = !this.signUpMode;
    this.hideSignUp = !this.hideSignUp;
    this.signUpMode2 = !this.signUpMode2;
    this.showResetPasswordForm = false;
  }

  register() {
    let registerData = new FormData()
    registerData.append('username', this.author.username)
    registerData.append('email', this.author.email)
    registerData.append('password', this.author.password)
    registerData.append('bodyweight', this.author.bodyweight)
    registerData.append('height', this.author.height)

    if (registerData.has(this.author.bodyweight)) {
      this._auth.registerStylist(registerData).subscribe(
        res => {
          this.router.navigate(['/home'])
        }
      )
    } else {
      this._auth.registerUser(registerData).subscribe(
        res => {
          this.router.navigate(['/home'])
        }
      )
    }
  }

  login() {

  }
}
