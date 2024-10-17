import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { jwtDecode } from 'jwt-decode';
import { Employee } from '../../model/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  offset: number = 1; // Start at page 1
  pageSize: number = 5; // Number of employees per page
  totalPages: number = 0; // Total number of pages
  totalItems: number = 0; // Total number of employees
  pageSizes: number[] = [5, 10, 20, 50];
  searchQuery: string = ''; // Store search query

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
      this.getEmployees();
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  // Get employees with pagination
  getEmployees() {
    this.service
      .getEmployeesWithPagination(this.offset, this.pageSize)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.employees = response.employees;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalItems;
        },
        (error) => console.log(error)
      );
  }

  // Change page size event
  changePageSize(event: Event) {
    const newPageSize = (event.target as HTMLSelectElement).value;
    this.pageSize = Number(newPageSize);
    this.offset = 1; // Reset to first page
    this.searchQuery ? this.searchEmployees() : this.getEmployees();
  }

  // Pagination functions for next and previous pages
  nextPage() {
    if (this.offset < this.totalPages) {
      this.offset++;
      this.searchQuery ? this.searchEmployees() : this.getEmployees();
    }
  }

  previousPage() {
    if (this.offset > 1) {
      this.offset--;
      this.searchQuery ? this.searchEmployees() : this.getEmployees();
    }
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.offset = page;
      this.searchQuery ? this.searchEmployees() : this.getEmployees();
    }
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.service.deleteEmployee(id).subscribe((data) => {
      alert('Employee deleted successfully');
      this.getEmployees(); // Refresh the employee list after deletion
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

  searchEmployees() {
    if (this.searchQuery.trim().length > 2) {
      this.service
        .searchEmployees(this.searchQuery, this.offset, this.pageSize)
        .subscribe(
          (response: any) => {
            this.employees = response.employees;
            this.totalPages = response.totalPages;
            this.totalItems = response.totalItems;
          },
          (error) => console.log(error)
        );
    } else {
      alert('Please enter at least 3 characters to search.');
    }
  }

  // Triggered when search button is clicked
  onSearch() {
    this.offset = 1; // Reset to the first page for new search
    this.searchEmployees(); // Call the dedicated search method
  }
  // Clear the search query and fetch all employees
  clearSearch() {
    this.searchQuery = ''; // Clear the search input
    this.offset = 1; // Reset to the first page
    this.getEmployees(); // Fetch all employees
  }
}
