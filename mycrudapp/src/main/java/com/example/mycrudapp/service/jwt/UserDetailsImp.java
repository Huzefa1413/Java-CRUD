package com.example.mycrudapp.service.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.mycrudapp.exception.ResourceNotFoundException;
import com.example.mycrudapp.model.Users;
import com.example.mycrudapp.repository.User_Repository;

import java.util.Collections;

@Service
public class UserDetailsImp implements UserDetailsService {

    private final User_Repository repository;

    @Autowired
    public UserDetailsImp(User_Repository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Users user = repository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found with email " + email));

        return new User(user.getEmailId(), user.getPassword(), Collections.emptyList());

    }

}
