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
import com.example.mycrudapp.model.Departments;
import com.example.mycrudapp.repository.Department_Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    @Autowired
    private Department_Repository departmentRepository;

    @GetMapping
    public List<Departments> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @PostMapping
    public Departments createDepartments(@RequestBody Departments departments) {
        return departmentRepository.save(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departments> getDepartmentById(@PathVariable Long id) {
        Departments departments = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department doesnot exist with id:" + id));

        return ResponseEntity.ok(departments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departments> updateDepartments(@PathVariable Long id,
            @RequestBody Departments departmentDetails) {
        Departments departments = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department doesnot exist with id:" + id));
        departments.setDepartmentName(departmentDetails.getDepartmentName());

        Departments updatedDepartments = departmentRepository.save(departments);
        return ResponseEntity.ok(updatedDepartments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDepartment(@PathVariable Long id) {
        Departments departments = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department doesnot exist with id:" + id));
        departmentRepository.delete(departments);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
