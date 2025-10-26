import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private baseUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  uploadEvent(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
