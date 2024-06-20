import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  title: string = 'Our blog';
  subtitle: string = 'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  id: any;
  article: any;
  author: any;

  constructor(private blogService: BlogService, private act: ActivatedRoute, public _auth: AuthService) { }

  ngOnInit() {
    this.id = this.act.snapshot.paramMap.get('id')

    this.blogService.getBlogById(this.id).subscribe(res => {
      this.article = res;
      this._auth.getAuthorById(this.article.idAuthor).subscribe((data) => {
        this.author = data;
        this.author = this.author.data
      });
    })
  }

  
}
