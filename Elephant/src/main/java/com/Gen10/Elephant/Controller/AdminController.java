package com.Gen10.Elephant.Controller;

import java.util.ArrayList;
import java.util.List;

import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.Role;
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
            return new ResponseEntity<User>(service.getUserById(id), HttpStatus.OK);
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

    //  Round 2
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles(@RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Role>>(service.getAllRoles(), HttpStatus.OK);
        }
        return new ResponseEntity<List<Role>>(new ArrayList<Role>(), HttpStatus.UNAUTHORIZED);
    }

    //  Round 2
    @GetMapping("/occupants/{id}")
    public ResponseEntity<List<User>> getOccupants(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.currentUsersInOffice(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);
    }

    //  Round 2
    @GetMapping("/arrivals/{id}")
    public ResponseEntity<List<Arrival>> getArrivals(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Arrival>>(service.getAllArrivalsByLocationId(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<Arrival>>(new ArrayList<Arrival>(), HttpStatus.UNAUTHORIZED);
    }
    
    //  Round 2
    @GetMapping("/departures/{id}")
    public ResponseEntity<List<Departure>> getDepartures(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Departure>>(service.getAllDeparturesByLocationId(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<Departure>>(new ArrayList<Departure>(), HttpStatus.UNAUTHORIZED);
    }
    
    // Round 2 edited
    @GetMapping("/noAnswers/{id}")
    public ResponseEntity<List<User>> getInactiveUsers(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getInactiveUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }

    // Round 2 edited
    @GetMapping("/flagged/{id}")
    public ResponseEntity<List<User>> getFlagged(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getFlaggedUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }

    // Round 2
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getLocations(@RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Location>>(service.getAllLocations(), HttpStatus.OK);
        }
        return new ResponseEntity<List<Location>>(new ArrayList<Location>(), HttpStatus.UNAUTHORIZED);
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

    //Round 2
    @DeleteMapping("/user/{id{")
    public ResponseEntity<User> deleteUser(@PathVariable int id, @PathVariable int num, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            service.deleteUserById(id);
            return new ResponseEntity<User>(new User(), HttpStatus.OK);
        }
        return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);  
    }
}
