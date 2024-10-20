package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.SignUpForm;
import com.example.backend.model.Users;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

     public Integer userRegister(SignUpForm stu){
        Users users = repository.findByEmail(stu.getEmail()).orElse(null);
        if(users != null){
            return 1;
        }
        try{
            Users users2 = new Users();
            users2.setRole("admin");
            users2.setEmail(stu.getEmail());
            System.out.println("Hello");
            users2.setPassword(passwordEncoder.encode(stu.getPassword()));
            repository.save(users2);
            return 2;
        }
        catch(Exception e){
            return -1;
        }
    }
     public Integer userRegisterfromdash(SignUpForm stu, String role){
        Users users = repository.findByEmail(stu.getEmail()).orElse(null);
        if(users != null){
            return 1;
        }
        try{
            Users users2 = new Users();
            users2.setRole(role);
            users2.setEmail(stu.getEmail());
            System.out.println("Hello");
            users2.setPassword(passwordEncoder.encode(stu.getPassword()));
            repository.save(users2);
            return 2;
        }
        catch(Exception e){
            return -1;
        }
    }
    public List<Users> getUsersByRole(String role) {
        return repository.findByRole(role);
    }
}
