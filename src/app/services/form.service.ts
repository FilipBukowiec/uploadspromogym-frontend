import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = `${environment.apiUrl}upload`;

  constructor(private http: HttpClient) {}

  uploadEvent(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
