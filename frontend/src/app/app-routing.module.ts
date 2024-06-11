import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component'; 
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { AboutComponent } from './components/about/about.component';
import { AllBlogsComponent } from './components/blog/all-blogs/all-blogs.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { BlogFormComponent } from './components/blog/blog-form/blog-form.component';
import { AuthorComponent } from './components/blog/author/author.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [ 

  {path: '', redirectTo: '/landing', pathMatch: 'full'},

  {path: 'landing', component: LandingpageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'signin', component: SigninSignupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'blogs', component: AllBlogsComponent},
  {path: 'blog/:id', component: BlogDetailComponent},
  {path: 'create', component: BlogFormComponent},
  {path: 'author/:id', component: AuthorComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: '**', component: ErrorPageComponent},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
