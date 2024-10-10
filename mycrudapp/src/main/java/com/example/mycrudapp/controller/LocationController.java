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
import com.example.mycrudapp.model.Locations;
import com.example.mycrudapp.repository.Location_Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    @Autowired
    private Location_Repository locationRepository;

    @GetMapping
    public List<Locations> getAllLocations() {
        return locationRepository.findAll();
    }

    @PostMapping
    public Locations createLocations(@RequestBody Locations locations) {
        return locationRepository.save(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locations> getLocationById(@PathVariable Long id) {
        Locations locations = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location doesnot exist with id:" + id));

        return ResponseEntity.ok(locations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locations> updateLocation(@PathVariable Long id,
            @RequestBody Locations locationDetails) {
        Locations locations = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location doesnot exist with id:" + id));
        locations.setCity(locationDetails.getCity());
        locations.setCountry(locationDetails.getCountry());

        Locations updatedLocations = locationRepository.save(locations);
        return ResponseEntity.ok(updatedLocations);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLocation(@PathVariable Long id) {
        Locations locations = locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location doesnot exist with id:" + id));
        locationRepository.delete(locations);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);
    }
}
