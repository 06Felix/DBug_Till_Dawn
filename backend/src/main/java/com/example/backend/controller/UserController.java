package com.example.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.SignUpForm;
import com.example.backend.model.Users;
// import com.example.demo.dto.AuthRequest;
// import com.example.demo.dto.ProfileForm;
// import com.example.demo.dto.SignUpForm;
// import com.example.demo.model.Profiles;
// import com.example.demo.model.Students;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpForm user) {
        Integer res = userService.userRegister(user);
        if (res == 1 || res == 2) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(500).body(res);
        }
    }
    @PostMapping("/user/registerfromdash/{role}")
    public ResponseEntity<?> registerUserfromdash(@RequestBody SignUpForm user, @PathVariable String role) {
        Integer res = userService.userRegisterfromdash(user, role);
        if (res == 1 || res == 2) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(500).body(res);
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            Users user = userRepository.findByEmail(authRequest.getUsername()).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found!");  
            }
            String password = user.getPassword();
            try{
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
                if (authentication.isAuthenticated() && passwordEncoder.matches(authRequest.getPassword(), password)) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    user.setLastLoggedInTime(LocalDateTime.now());
                    userRepository.save(user);
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials!");  
                }
            }
            catch(Exception e){
                return ResponseEntity.status(401).body("Invalid credentials!");  

            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("There was an error processing your request!");
        }
    }
    @GetMapping("/user-roles")
    public List<Users> getUsersWithRoleUser() {
        return userService.getUsersByRole("user");
    }
    @GetMapping("/analyst-roles")
    public List<Users> getUsersWithRoleAnalyst() {
        return userService.getUsersByRole("analyst");
    }
    @GetMapping("/marketing-roles")
    public List<Users> getUsersWithRoleMarketing() {
        return userService.getUsersByRole("marketing");
    }


}
