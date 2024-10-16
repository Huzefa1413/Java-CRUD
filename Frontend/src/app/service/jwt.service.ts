import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  register(signRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, signRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, loginRequest);
  }
}
