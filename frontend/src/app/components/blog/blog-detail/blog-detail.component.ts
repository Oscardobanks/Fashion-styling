import { Component } from '@angular/core';
import { Blog } from 'src/app/components/blog/blog'
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  blog: Blog | undefined;
  title: string = 'Our blog';
  subtitle: string = 'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog(): void {
    this.blog = this.blogService.getBlogById(0);
  }
}
