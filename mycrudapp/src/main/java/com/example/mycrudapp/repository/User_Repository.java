package com.example.mycrudapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mycrudapp.model.Users;

@Repository
public interface User_Repository extends JpaRepository<Users, Long> {

    boolean existsByEmailId(String emailId);

    Optional<Users> findByEmailId(String email);
}
