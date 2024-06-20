import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [
    `
      label {
        display: block;
        margin-bottom: 5px;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      textarea {
        min-height: 100px;
        line-height: 1.5;
        resize: vertical;
      }
    `,
  ],
})
export class BlogFormComponent {
  title: string = 'Our blog';
  subtitle: string =
    'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  constructor(
    private _auth: AuthService,
    private blogService: BlogService,
    private router: Router,
    private http: HttpClient
  ) {}

  article: any = {
    title: '',
    description: '',
    introduction: '',
    body: '',
    image: '',
  };

  imageName: any;

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imageName = file.name;
        this.article.image = file; // Update the article.image property with the file object

        // Upload the image file to the server and store the file path in the database
        const formData = new FormData();
        formData.append('image', file);

        this.http
          .post('http://localhost:5000/user/images', formData, {
            responseType: 'text',
          })
          .subscribe(
            (response: string) => {
              this.article.image = response;
            },
            (error) => {
              console.log('Error uploading image:', error); // Log the error
            }
          );
      };
    }
  }

  createBlog() {
    // Combine introduction and body into description
    this.article.description =
      this.article.introduction + '\n' + this.article.body;

    const authorId = this._auth.getAuthorDataFromToken();
    if (authorId !== null) {
      this.article.idAuthor = authorId;
    } else {
      console.error('Author ID is null');
    }

    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('description', this.article.description);
    formData.append('image', this.article.image);
    formData.append('idAuthor', this.article.idAuthor);

    this.blogService.create(formData).subscribe(
      (res) => {
        alert('Blog has been created successfully!');
        this.router.navigate(['/author', this._auth.getAuthorDataFromToken()]);
      },
      (error) => {
        console.log('The error is', error);
      }
    );
  }
}
