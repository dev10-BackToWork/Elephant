package com.Gen10.Elephant.Controller;

import java.util.ArrayList;
import java.util.List;

import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;
import com.Gen10.Elephant.service.invalidCredentialsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    ServiceLayer service;

    //checks username(email) and password against system, returns user stored in database if correct, null if incorrect
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestHeader("email") String email, @RequestHeader("password") String password) {
        try {
            User dbUser = service.checkLogin(email, password);
            return new ResponseEntity<User>(dbUser, HttpStatus.OK);
        } catch (invalidCredentialsException e) {
            return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
        }
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getLocations(@RequestHeader("email") String email, @RequestHeader("password") String password){
        try {
            service.checkUser(email, password);
            return new ResponseEntity<List<Location>>(service.getAllLocations(), HttpStatus.OK);
        } catch (invalidCredentialsException e) {
            return new ResponseEntity<List<Location>>(new ArrayList<Location>(), HttpStatus.UNAUTHORIZED);
        }
    }

    //edts a user, restricted to password only
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        try {
            service.checkUser(email, password);
            User editUser = service.editUserPassword(user);
            return new ResponseEntity<User>(editUser, HttpStatus.OK);
        } catch (invalidCredentialsException e) {
            return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);
        }
    }

    // Round 2
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/coming")
    public ResponseEntity<Attendance> markAttendance(@RequestBody Attendance attendance, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        try {
            User dbUser = service.checkUser(email, password);
            if (service.getLocationById(dbUser.getLocation().getLocationId()).getMaxOccupancy() <= service.currentUsersInOffice(dbUser.getLocation().getLocationId()).size()){
                return new ResponseEntity("Your location is already at capacity", HttpStatus.IM_USED);
            } else {
                return new ResponseEntity<Attendance>(service.markAttendance(attendance), HttpStatus.OK);
            }
        } catch (invalidCredentialsException e) {
            return new ResponseEntity<Attendance>(new Attendance(), HttpStatus.UNAUTHORIZED);
        }
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    //@GetMapping("/checkChange/{id}")
    //@PostMapping("/checkChange")
    @PostMapping("/checkChange/{id}")
    public ResponseEntity<Boolean> checkPasswordChange(@RequestBody User user, @PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        try {
            service.checkUser(email, password);
            return new ResponseEntity<Boolean>(service.checkPasswordChange(user), HttpStatus.OK);
        } catch (invalidCredentialsException e) {
            return new ResponseEntity(new User(), HttpStatus.UNAUTHORIZED);
        }
    }
}