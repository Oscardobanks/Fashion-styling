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
import { authGuard } from './services/auth.guard';
import { StyleFormComponent } from './components/style/style-form/style-form.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },

  { path: 'landing', component: LandingpageComponent },
  { path: 'home', canActivate: [authGuard], component: HomepageComponent },
  { path: 'signin', component: SigninSignupComponent },
  { path: 'about', canActivate: [authGuard], component: AboutComponent },
  { path: 'contact', canActivate: [authGuard], component: ContactComponent },
  { path: 'blogs', canActivate: [authGuard], component: AllBlogsComponent },
  {
    path: 'blog/:id',
    canActivate: [authGuard],
    component: BlogDetailComponent,
  },
  { path: 'createblog', canActivate: [authGuard], component: BlogFormComponent },
  { path: 'createstyle', canActivate: [authGuard], component: StyleFormComponent },
  { path: 'author/:id', canActivate: [authGuard], component: AuthorComponent },
  {
    path: 'profile/:id',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  { path: 'chat', component: ChatComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
