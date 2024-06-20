import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AllBlogsComponent } from './components/blog/all-blogs/all-blogs.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { BlogFormComponent } from './components/blog/blog-form/blog-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthorComponent } from './components/blog/author/author.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingpageComponent } from './pages/landingpage/landingpage.component'; 
import { CarouselComponent } from './pages/landingpage/components/carousel/carousel.component';
import { TestimonialComponent } from './pages/landingpage/components/testimonial/testimonial.component';
import { LandingFooterComponent } from './pages/landingpage/components/landing-footer/landing-footer.component';
import { LandingAboutComponent } from './pages/landingpage/components/landing-about/landing-about.component'; 
import { LandingServicesComponent } from './pages/landingpage/components/landing-services/landing-services.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { StyleFormComponent } from './components/style/style-form/style-form.component';
import { ChatComponent } from './pages/chat/chat.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AllBlogsComponent,
    ErrorPageComponent,
    BlogFormComponent,
    BlogDetailComponent,
    AboutComponent,
    ContactComponent,
    AuthorComponent,
    ProfileComponent,
    HomepageComponent,
    SigninSignupComponent,
    LandingpageComponent,
    CarouselComponent,
    TestimonialComponent,
    FooterComponent,
    LandingFooterComponent,
    LandingAboutComponent,
    LandingServicesComponent,
    ContactComponent,
    StyleFormComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
