import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

interface Author {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  about: string;
  password: string;
  profileImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private loggedInUserId: string | null = null;
  private loggedInAuthor: any | null = null;

  id: any;

  author: any ={
    _id: '',
    fullName: '',
    username: '',
    email: '',
    password: '',
    profileImage: '',
    about: '',
  };

  private url = 'http://localhost:5000/auth/';

  private blogUrl = 'http://localhost:5000/article/';

  private authorUrl = 'http://localhost:5000/user/';

  registerUser(user: any) {
    return this.http.post(this.url + 'register-user', user);
  }

  registerStylist(stylist: any) {
    return this.http.post(this.url + 'register-stylist', stylist);
  }

  login(user: any) {
    return this.http.post<any>(this.url + 'login', user).pipe(
      tap((response) => {
        this.loggedInUserId = response.data.user._id;
        this.loggedInAuthor = response.data.user.author;
        localStorage.setItem('token', response.data.user._id);
      })
    );
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getAuthorDataFromToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  async getAuthorData(): Promise<any> {
  this.id = this.getAuthorDataFromToken();

  try {
    const res = await this.getAuthorById(this.id).toPromise();
    this.author = res;
    return this.author.data;
  } catch (error) {
    console.error('Error fetching author data:', error);
    return null;
  }
}

  getAuthorById(id: any) {
    return this.http.get(this.authorUrl + id);
  }

  getById(id: any) {
    return this.http.get(this.blogUrl + 'getbyid/' + id);
  }

  createArticle(article: any) {
    article.authorId = this.loggedInUserId;
    return this.http.post(this.blogUrl + 'create', article);
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(
      this.authorUrl + 'update/' + author._id,
      author
    );
  }
}
