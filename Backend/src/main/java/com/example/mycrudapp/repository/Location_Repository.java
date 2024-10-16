package com.example.mycrudapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mycrudapp.model.Locations;

public interface Location_Repository extends JpaRepository<Locations, Long> {

}
