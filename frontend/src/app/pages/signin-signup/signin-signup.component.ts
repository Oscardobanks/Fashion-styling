import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss'],
})
export class SigninSignupComponent {
  title = 'signin-signup';
  selectedOption: string = 'user';
  showResetPasswordForm = false;
  signUpMode: boolean = false;
  signUpMode2: boolean = false;
  hideSignUp: boolean = false;

  fb = inject(FormBuilder);
  _auth = inject(AuthService);
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  forgetForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');
    const sign_in_btn2 = document.querySelector('#sign-in-btn2');
    const sign_up_btn2 = document.querySelector('#sign-up-btn2');
    const signup_btn = document.getElementById('signup-btn');

    sign_up_btn?.addEventListener('click', () => {
      container?.classList.add('sign-up-mode');
    });

    sign_in_btn?.addEventListener('click', () => {
      container?.classList.remove('sign-up-mode');
      this.signUpMode = false;
      this.signUpMode2 = false;
    });

    sign_up_btn2?.addEventListener('click', () => {
      container?.classList.add('sign-up-mode2');
      if (container!.classList.contains('sign-up-mode2')) {
        signup_btn!.style.display = 'none';
      }
    });

    sign_in_btn2?.addEventListener('click', () => {
      container?.classList.remove('sign-up-mode2');
      signup_btn!.style.display = 'block';
      this.signUpMode = false;
      this.signUpMode2 = false;
    });

    this.createRegisterForm();
    this.createLoginForm();

    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
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

  createRegisterForm() {
    if (this.selectedOption === 'user') {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
        bodyweight: ['', Validators.required],
        height: ['', Validators.required],
      });
    } else {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
      });
    }
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  toggleOption(option: string) {
    this.selectedOption = option;
    this.registerForm.reset();
    this.createRegisterForm();
  }

  register() {
    if (this.selectedOption === 'user') {
      this._auth.registerUser(this.registerForm.value).subscribe({
        next: () => {
          alert('Your User Account has been Created!');
          this.registerForm.reset();
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.registerForm.reset();
        },
      });
    } else {
      const userWithoutBodyweightAndHeight = {
        ...this.registerForm.value,
        bodyweight: null,
        height: null,
      };
      this._auth.registerStylist(userWithoutBodyweightAndHeight).subscribe({
        next: () => {
          alert('Your Stylist Account has been Created!');
          this.registerForm.reset();
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.registerForm.reset();
        },
      });
    }
  }

  login() {
    this._auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        alert('You have successfully logged in!');
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.loginForm.reset();
      },
    });
  }

  resetPassword() {
    
  }
}
