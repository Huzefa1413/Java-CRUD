import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { Employee } from '../../employee';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  employee: Employee = new Employee();

  constructor(private service: JwtService, private router: Router) {}

  ngOnInit(): void {}

  saveEmployee() {
    this.service.register(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.goToLogin();
      },
      (error) => console.log(error)
    );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    if (
      this.employee.firstName &&
      this.employee.lastName &&
      this.employee.emailId &&
      this.employee.password
    ) {
      console.log(this.employee);
      this.saveEmployee();
    } else {
      alert('Fields cannot be empty');
    }
  }
}
