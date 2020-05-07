package com.Gen10.Elephant.Controller;

import java.util.List;

import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    ServiceLayer service;

    @GetMapping("/times/{id}")
    public ResponseEntity<List<TimeSlot>> getTimes(@PathVariable int id) {
        return ResponseEntity.ok(service.findAllTimeSlots(id));
    }

    // @PostMapping("/login")
    // public ResponseEntity<User> login(@RequestBody ) {
    //     return ResponseEntity.ok(login)
    // }

    @PostMapping("/arrival/{id}")
    public ResponseEntity<Arrival> reserveArrival(@PathVariable int id) {
        return ResponseEntity.ok(service.reserveArrivalByTimeSlotId(id));
    }

    @PostMapping("/departure/{id}")
    public ResponseEntity<Departure> reserveDeparture(@PathVariable int id) {
        return ResponseEntity.ok(service.reserveDepartureByTimeSlotId(id));
    }

    @DeleteMapping("/time/{id}")
    public ResponseEntity<TimeSlot> deleteReservedTime(@PathVariable int id) {
        return ResponseEntity.ok(service.deleteReservationByTimeSlotId(id));
    }
}
