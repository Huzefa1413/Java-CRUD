package com.example.mycrudapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mycrudapp.exception.ResourceNotFoundException;
import com.example.mycrudapp.model.Employee;
import com.example.mycrudapp.repository.Employee_Repository;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private Employee_Repository employeeRepository;

    // get all employees
    @GetMapping
    @Transactional
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // create employee
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    // get employee by id
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee doesnot exist with id:" + id));

        return ResponseEntity.ok(employee);
    }

    // update employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee doesnot exist with id:" + id));
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setGender(employeeDetails.getGender());
        employee.setAge(employeeDetails.getAge());
        employee.setDoj(employeeDetails.getDoj());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setLocation(employeeDetails.getLocation());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee doesnot exist with id:" + id));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }

}