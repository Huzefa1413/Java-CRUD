import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent {
  employee: Employee = new Employee();
  id: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
