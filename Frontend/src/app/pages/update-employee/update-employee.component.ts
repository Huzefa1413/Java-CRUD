import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Department } from '../../model/department';
import { Location } from '../../model/location';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent {
  employeeForm: FormGroup;
  departments: Department[] = [];
  locations: Location[] = [];
  employee: Employee = new Employee();
  id: number = 0;

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
    this.id = this.route.snapshot.params['id'];
    this.service.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employeeForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          doj: data.doj,
          designation: data.designation,
          departmentId: data.department?.id,
          locationId: data.location?.id,
        });
      },
      (error) => console.log(error)
    );
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
      this.service.updateEmployee(this.id, employee).subscribe(
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
