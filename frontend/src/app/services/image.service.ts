import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'https://api.example.com/gallery';

  constructor(private http: HttpClient) {}

  fetchGallery(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}