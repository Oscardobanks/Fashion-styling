import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [``]
})
export class ProfileComponent {
  title: string = 'My Account';
  subtitle: string = '';
  url = '../assets/authors/istockphoto-1453963527-612x612.jpg';

  onSelectFile(file: any) {
    if(file.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }
  }
}
