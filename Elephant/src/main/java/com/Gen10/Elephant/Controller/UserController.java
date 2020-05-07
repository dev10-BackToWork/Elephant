package com.Gen10.Elephant.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    ServiceLayer service;

    @GetMapping("/times/{id}")
    public ResponseEntity<List<TimeSlot>> getTimes(@PathVariable int id) {
        return ResponseEntity.ok(service.getOpenTimeSlotsByLocationId(id));
    }

    // @PostMapping("/login")
    // public ResponseEntity<User> login(@RequestBody ) {
    //     return ResponseEntity.ok(login)
    // }

    /*
    @PostMapping("/arrival/{id}")
    public ResponseEntity<Arrival> reserveArrival(@PathVariable int id) {
        return ResponseEntity.ok(service.reserveArrivalByTimeSlotId(id));
    }

    @PostMapping("/departure/{id}")
    public ResponseEntity<Departure> reserveDeparture(@PathVariable int id) {
        return ResponseEntity.ok(service.reserveDepartureByTimeSlotId(id));
    }
    */
    
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
