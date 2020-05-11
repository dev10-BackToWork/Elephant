package com.Gen10.Elephant.Controller;

import java.util.List;

import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.TimeSlot;
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
    public ResponseEntity<User> login(@RequestBody User user) {
        return ResponseEntity.ok(service.checkLogin(user));
    }

    @PostMapping("/arrival/{id}")
    public ResponseEntity<Arrival> reserveArrival(@PathVariable int id, @RequestBody User user) {
        return ResponseEntity.ok(service.reserveArrivalByTimeSlotId(id, user));
    }

    
    @PostMapping("/departure/{id}")
    public ResponseEntity<Departure> reserveDeparture(@PathVariable int id, @RequestBody User user) {
        return ResponseEntity.ok(service.reserveDepartureByTimeSlotId(id, user));
    }
    
    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        User editUser = service.editUser(user);
        return ResponseEntity.ok(editUser);
        
    }
    /*
    @DeleteMapping("/time/{id}")
    public ResponseEntity<TimeSlot> deleteReservedTime(@PathVariable int id) {
        return ResponseEntity.ok(service.deleteReservationByTimeSlotId(id));
    }
    */
}
