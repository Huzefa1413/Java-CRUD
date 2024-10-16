import { Component } from '@angular/core';
import { Employee } from '../../model/employee';
import { Department } from '../../model/department';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '../../model/location';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'], // Fix typo here
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;
  departments: Department[] = [];
  locations: Location[] = [];

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      doj: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchLocations();
  }

  fetchDepartments() {
    this.service.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }
  fetchLocations() {
    this.service.getLocations().subscribe(
      (data) => {
        this.locations = data;
        console.log(this.locations);
      },
      (error) => {
        console.error('Error fetching locations', error);
      }
    );
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        ...this.employeeForm.value,
        department: {
          id: this.employeeForm.value.departmentId,
        },
        location: {
          id: this.employeeForm.value.locationId,
        },
      };
      console.log(employee);
      this.service.createEmployee(employee).subscribe(
        (response) => {
          console.log(response);
          alert('Employee Updated Successfully');
          this.router.navigate(['/dashboard']);
        },
        (error) => console.log(error)
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
