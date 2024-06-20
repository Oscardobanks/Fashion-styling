import { Injectable } from '@angular/core';
import { Blog, blogs } from '../components/blog/blog';
import { Author, authors } from '../components/blog/author';
import { Style, styles } from '../components/blog/styles';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Article {
  _id: string
  title: string;
  idAuthor: string;
  date: string;
  description: string;
  image: string;
}

interface Styles {
  _id: string;
  context: string;
  date: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient){}

  url = 'http://127.0.0.1:5000/article/';
  styleUrl = 'http://127.0.0.1:5000/style/';

  create(article: FormData) {
    return this.http.post(this.url + 'blog', article);
  }

  getAll() {
    return this.http.get(this.url + 'all')
  }

  getRecentBlogs(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + 'all').pipe(
      map(response => response.sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }

  getBlogByAuthorId(id: any){
    return this.http.get(this.url + 'getbyidauthor/' + id)
  }

  getBlogById(id: any){
    return this.http.get(this.url + 'getbyid/' + id)
  }

  createStyle(style: FormData) {
    return this.http.post(this.styleUrl + 'blog', style);
  }

  getAllStyles() {
    return this.http.get(this.styleUrl + 'all')
  }

  getStyleByAuthorId(id: any){
    return this.http.get(this.styleUrl + 'getbyidauthor/' + id)
  }

  getBlogs(): Blog[] {
    return blogs;
  }

  getOldBlogById(id: number): Blog | undefined {
    return blogs.find(blog => blog.id === id);
  }

  getOldStyles(): Style[] {
    return styles;
  }

  getAuthors(): Author[] {
    return authors;
  }

  getAuthorById(id: number): Author | undefined {
    return authors.find(author => author.id === id);
  }

}