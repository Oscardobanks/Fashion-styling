import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [``],
})
export class ProfileComponent {
  title: string = 'My Account';
  subtitle: string = '';
  profileImage: string = 'https://placekitten.com/250/250';

  id: any;
  newAuthor: any = {
    _id: '',
    fullName: '',
    username: '',
    email: '',
    password: '',
    profileImage: '',
    about: '',
  };

  constructor(
    private router: Router,
    private _auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadAuthorData();
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.profileImage = event.target.result;

        // Upload the image file to the server and store the file path in the database
        const formData = new FormData();
        formData.append('image', file);

        this.http
          .post('http://localhost:5000/user/images', formData, {
            responseType: 'text',
          })
          .subscribe(
            (response: string) => {
              this.newAuthor.profileImage = response; // Store the file path in the newAuthor object
            },
            (error) => {
              console.log('Error uploading image:', error);
            }
          );
      };
    }
  }

  loadAuthorData() {
    this._auth.getAuthorData().then((authorData) => {
      this.newAuthor = authorData;
      this.profileImage =
        this.newAuthor.profileImage || 'https://placekitten.com/250/250';
      console.log(this.newAuthor);
    });
  }

  onSubmit() {
    this._auth.updateAuthor(this.newAuthor).subscribe(
      (updatedAuthor) => {
        alert('Profile updated Successfully!');
        this.newAuthor = updatedAuthor;
        this.router.navigate(['/author', this._auth.getAuthorDataFromToken()]);
      },
      (error) => {
        console.log('Error updating author:', error);
      }
    );
  }
}
