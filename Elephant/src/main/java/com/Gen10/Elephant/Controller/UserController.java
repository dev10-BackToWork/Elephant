package com.Gen10.Elephant.Controller;

import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Departure;
import java.util.List;

import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    ServiceLayer service;

    @GetMapping("/times/{id}")
    public ResponseEntity<List<TimeSlot>> getTimes(@PathVariable int id) {
        return ResponseEntity.ok(service.getOpenTimeSlotsByLocationId(id));
    }

    //checks username(email) and password against system, returns user stored in database if correct, null if incorrect
    @PostMapping("/login")
    @CrossOrigin(origins= "http://localhost:8000")
    public ResponseEntity<User> login(@RequestHeader("email") String email, @RequestHeader("password") String password) {
        User user = new User(email, password);
        User dbUser = service.checkLogin(user);
        if (dbUser != null){
            return new ResponseEntity<User>(dbUser, HttpStatus.OK);
        }
        return new ResponseEntity<User>(user, HttpStatus.UNAUTHORIZED);
    }


    @PostMapping("/arrival/{id}")
    public ResponseEntity<Arrival> reserveArrival(@RequestBody User user, @PathVariable int id) {
        return ResponseEntity.ok(service.reserveArrivalByTimeSlotId(user, id));
    }
    
    @PostMapping("/departure/{id}")
    public ResponseEntity<Departure> reserveDeparture(@RequestBody User user, @PathVariable int id) {
        return ResponseEntity.ok(service.reserveDepartureByTimeSlotId(user, id));
    }
    
    //eidts a user, restricted to password only
    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        User editUser = service.editUserPassword(user);
        return ResponseEntity.ok(editUser);
        
    }
}