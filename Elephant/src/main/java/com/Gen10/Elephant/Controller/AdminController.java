package com.Gen10.Elephant.Controller;

import java.util.ArrayList;
import java.util.List;

import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    
    @Autowired
    ServiceLayer service;

    //Returns user from id
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<User>(dbAdmin, HttpStatus.OK);
        }
        return new ResponseEntity<User>(dbAdmin, HttpStatus.UNAUTHORIZED);
    }

    //Returns all users with the location id
    @GetMapping("/users/{id}")
    public ResponseEntity<List<User>> getUsers(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        System.out.println("Got users for a location");
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }
    
    @GetMapping("/noAnswers")
    public ResponseEntity<List<User>> getInactiveUsers(@RequestBody Location location, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getInactiveUsers(location), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }
    
    @PostMapping("/newUser")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            User newUser = service.createUser(user);
            return new ResponseEntity<User>(newUser, HttpStatus.OK);
        }
        return new ResponseEntity<User>(user, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            User editUser = service.editUser(user);
            return new ResponseEntity<User>(editUser, HttpStatus.OK);
        }
        return new ResponseEntity<User>(user, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/capacity/{id}/{num")
    public ResponseEntity<Location> editCapacity(@PathVariable int id, @PathVariable int num,  @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<Location>(service.editCapacity(id, num), HttpStatus.OK);
        }
        return new ResponseEntity<Location>(new Location(), HttpStatus.UNAUTHORIZED);
    }
    
    @PostMapping("/timeIncrement/{id}/{num}")
    public ResponseEntity<Location> editIncrement(@PathVariable int id, @PathVariable int num, @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<Location>(service.editIncrement(id, num), HttpStatus.OK);
        }
        return new ResponseEntity<Location>(new Location(), HttpStatus.UNAUTHORIZED);
    }
}
