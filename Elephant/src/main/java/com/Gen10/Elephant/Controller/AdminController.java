package com.Gen10.Elephant.Controller;

import java.util.List;

import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(service.getUserById(id));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(service.getUsers());
    }
    
    @GetMapping("/noAnswers")
    public ResponseEntity<List<User>> getInactiveUsers() {
        return ResponseEntity.ok(service.getInactiveUsers());
    }
    
    @PostMapping("/newUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = service.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        User editUser = service.editUser(user);
        return ResponseEntity.ok(editUser);
    }

    @PostMapping("/capacity/{id}/{num")
    public ResponseEntity<Location> editCapacity(@PathVariable int id, @PathVariable int num){
        return ResponseEntity.ok(service.editCapacity(id, num));
    }

    @PostMapping("/timeIncrement/{id}/{num}")
    public ResponseEntity<Location> editIncrement(@PathVariable int id, @PathVariable int num){
        return ResponseEntity.ok(service.editIncrement(id, num));
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable int id) {
        service.deleteUserById(id);
    }
}
