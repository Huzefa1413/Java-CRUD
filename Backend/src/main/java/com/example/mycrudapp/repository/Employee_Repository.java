package com.example.mycrudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mycrudapp.model.Employee;

@Repository
public interface Employee_Repository extends JpaRepository<Employee, Long> {
}