import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [`
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
  `]
})
export class BlogFormComponent {
  imageName!: string;
  title: string = 'Our blog';
  subtitle: string = 'Our news, views, events and Best Articles are designed and dedicated to providing valuable insights and resources to our readers to help you move forward, faster in the fashion world.';

  constructor(private imageService: ImageService) { }

  // fetchGallery(): void {
  //   this.imageService.fetchGallery().subscribe(
  //     response => {
  //       // Handle the gallery data response here
  //       console.log(response);
  //       this.imageName = response.name; // Assuming the API response contains the image name
  //     },
  //     error => {
  //       // Handle any errors that occur during the API call
  //       console.error(error);
  //     }
  //   );
  // }

  onSelectFile(file: any) {
    if (file.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () => {
        this.imageName = file.target.files[0].name;
      };
    }
  }
}
