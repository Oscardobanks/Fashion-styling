import { Injectable } from '@angular/core';
import { Blog, blogs } from '../components/blog/blog';
import { Author, authors } from '../components/blog/author';
import { Style, styles } from '../components/blog/styles';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  getBlogs(): Blog[] {
    return blogs;
  }

  getBlogById(id: number): Blog | undefined {
    return blogs.find(blog => blog.id === id);
  }

  getAuthors(): Author[] {
    return authors;
  }

  getAuthorById(id: number): Author | undefined {
    return authors.find(author => author.id === id);
  }

  getStyles(): Style[] {
    return styles;
  }

  getStyleById(id: number): Style | undefined {
    return styles.find(styles => styles.id === id);
  }
}