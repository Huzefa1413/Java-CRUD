import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { Department } from '../model/department';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/v1/employees';
  private departmentUrl = 'http://localhost:8080/api/v1/departments';
  private LocationUrl = 'http://localhost:8080/api/v1/locations';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.get<Employee[]>(this.baseUrl, { headers });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  createEmployee(employee: Employee): Observable<Object> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.post(`${this.baseUrl}`, employee, { headers });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  getEmployeeById(id: number): Observable<Employee> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`, {
        headers,
      });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.put(`${this.baseUrl}/${id}`, employee, {
        headers,
      });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
    return this.httpClient.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  getDepartments(): Observable<Department[]> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.get<Department[]>(this.departmentUrl, { headers });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  getLocations(): Observable<Location[]> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.httpClient.get<Location[]>(this.LocationUrl, { headers });
    } else {
      console.error('Authorization token is missing.');
      return new Observable((observer) => {
        observer.error('Authorization token is missing.');
      });
    }
  }

  createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log('Token found');
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('Token not found');
      return null;
    }
  }
}
