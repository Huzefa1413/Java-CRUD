package com.example.mycrudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mycrudapp.model.Departments;

@Repository
public interface Department_Repository extends JpaRepository<Departments, Long> {

}
