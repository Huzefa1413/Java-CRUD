import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { jwtDecode } from 'jwt-decode';
import { Employee } from '../../model/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class DashboardComponent {
  employees: Employee[] = [];

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (!token || this.isTokenExpired(token)) {
      console.log(
        'Token is either missing or expired. Redirecting to login...'
      );
      this.router.navigate(['/login']);
    } else {
      this.getAllEmployees();
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  getAllEmployees() {
    this.service.getAllEmployees().subscribe(
      (response) => {
        console.log(response);
        this.employees = response;
      },
      (error) => console.log(error)
    );
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    console.log(id);
    this.service.deleteEmployee(id).subscribe((data) => {
      console.log(data);
      alert('Employee deleted successfully');
      this.getAllEmployees();
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  createEmployee() {
    this.router.navigate(['create-employee']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
