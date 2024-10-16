package com.example.mycrudapp.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.mycrudapp.model.Users;
import com.example.mycrudapp.repository.User_Repository;

@Service
public class AuthServiceImp implements AuthService {

    private final User_Repository user_Repository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImp(User_Repository user_Repository, PasswordEncoder passwordEncoder) {
        this.user_Repository = user_Repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createCustomer(Users users) {
        if (user_Repository.existsByEmailId(users.getEmailId())) {
            return false;
        }

        Users newUser = new Users();
        BeanUtils.copyProperties(users, newUser);

        String hashPassword = passwordEncoder.encode(users.getPassword());
        newUser.setPassword(hashPassword);
        user_Repository.save(newUser);

        return true;
    }
}
