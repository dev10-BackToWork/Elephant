package com.Gen10.Elephant.Controller;

import java.util.List;

import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    
    @Autowired
    ServiceLayer service;

    @GetMapping("/account/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(service.getUserById(id));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(service.getUsers());
    }
    
    @GetMapping("/noanswers")
    public ResponseEntity<List<User>> getInactiveUsers() {
        return ResponseEntity.ok(service.getInactiveUsers())
    
    @PostMapping("/newAccount")
    public ResponseEntity<User> createUser(@RequestBody User user)
        User newUser = service.createUser(user);
        return ResponseEntity.ok(newUser);
        
}
