package com.Gen10.Elephant.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.Role;
import com.Gen10.Elephant.dto.User;
import com.Gen10.Elephant.service.ServiceLayer;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    Boolean hasGenerated = false;

    //Returns user from id
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<User>(service.getUserById(id), HttpStatus.OK);
        }
        return new ResponseEntity(dbAdmin, HttpStatus.UNAUTHORIZED);
    }

    //Returns all users with the location id
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/users/{id}")
    public ResponseEntity<List<User>> getUsers(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        System.out.println("Got users for a location");
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/guests/{id}")
    public ResponseEntity<List<User>> getGuests(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        System.out.println("Got guests for a location");
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getGuests(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }

    //  Round 2
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles(@RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Role>>(service.getAllRoles(), HttpStatus.OK);
        }
        return new ResponseEntity<List<Role>>(new ArrayList<Role>(), HttpStatus.UNAUTHORIZED);
    }

    //  Round 2
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/occupants/{id}")
    public ResponseEntity<List<Attendance>> getOccupants(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Attendance>>(service.currentAttendancesInOffice(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<Attendance>>(new ArrayList<Attendance>(), HttpStatus.UNAUTHORIZED);
    }
    
    // Round 2 edited
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/noAnswers/{id}")
    public ResponseEntity<List<User>> getInactiveUsers(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getInactiveUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }

    // Round 2 edited
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/flagged/{id}")
    public ResponseEntity<List<User>> getFlagged(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getFlaggedUsers(id), HttpStatus.OK);
        }
        return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.UNAUTHORIZED);  
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/flaggedGlobal")
    public ResponseEntity<List<User>> getFlaggedGlobal(@RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.getFlaggedUsersGlobal(), HttpStatus.OK);
        }
        String message = "There was an error while attempting to get all of the unauthorized/flagged users for the current date.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }

    // Round 2
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getLocations(@RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Location>>(service.getAllLocations(), HttpStatus.OK);
        }
        return new ResponseEntity<List<Location>>(new ArrayList<Location>(), HttpStatus.UNAUTHORIZED);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/newUser")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            try{
                User newUser = service.createUser(user);
                return new ResponseEntity<User>(newUser, HttpStatus.OK);
            } catch (DataFormatException e) {
                return new ResponseEntity(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        return new ResponseEntity<User>(user, HttpStatus.UNAUTHORIZED);
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/newGuest")
    public ResponseEntity<User> createGuest(@RequestBody User guest, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            try{
                User newGuest = service.createGuest(guest);
                return new ResponseEntity<User>(newGuest, HttpStatus.OK);
            } catch (DataFormatException e) {
                return new ResponseEntity(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        return new ResponseEntity<User>(guest, HttpStatus.UNAUTHORIZED);
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody User user, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            User editUser = service.editUser(user);
            return new ResponseEntity<User>(editUser, HttpStatus.OK);
        }
        return new ResponseEntity<User>(user, HttpStatus.UNAUTHORIZED);
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/signUpGuest")
    public ResponseEntity<Attendance> signUpGuest(@RequestBody Attendance attendance, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            Attendance savedAttendance = service.markGuestAttendance(attendance);
            return new ResponseEntity<Attendance>(savedAttendance, HttpStatus.OK);
        }
        return new ResponseEntity<Attendance>(attendance, HttpStatus.UNAUTHORIZED);
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/capacity/{id}/{num}")
    public ResponseEntity<Location> editCapacity(@PathVariable int id, @PathVariable int num,  @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<Location>(service.editCapacity(id, num), HttpStatus.OK);
        }
        return new ResponseEntity<Location>(new Location(), HttpStatus.UNAUTHORIZED);
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/resetPassword/{id}")
    public ResponseEntity<User> resetPassword(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password){
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<User>(service.resetUserPassword(id), HttpStatus.OK);
        }
        return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);  
    }

    //Round 2
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @DeleteMapping("/user/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            service.deleteUserById(id);
            return new ResponseEntity("The specified user was deleted.", HttpStatus.OK);
        }
        return new ResponseEntity<User>(new User(), HttpStatus.UNAUTHORIZED);  
    }

    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/generatePasswords")
    public ResponseEntity<Boolean> generatePasswords(@RequestHeader("email") String email, @RequestHeader("password") String password) {
        if(email.equals("Elephant") && password.equals("OneTimeUseOnly!") && hasGenerated == false) {
            Boolean result = service.generateAllPasswords();
            hasGenerated = true;
            return ResponseEntity.ok(result);
        }
        return new ResponseEntity<Boolean>(false, HttpStatus.FORBIDDEN);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/attendanceReport/{id}/{date}")
    public ResponseEntity<List<Attendance>> attendanceReport(@PathVariable int id, @PathVariable String date, @RequestHeader("email") String email, @RequestHeader("password") String password) {       
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Attendance>>(service.generateAttendanceReport(id, date), HttpStatus.OK);
        }
        String message = "There was an error while generating the attendance report.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/deactivateUser/{id}")
    public ResponseEntity<User> deactivateUser(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<User>(service.deactivateSpecifiedUser(id), HttpStatus.OK);
        }
        String message = "There was an error while updating the user's active status to inactive.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/reactivateUser/{id}")
    public ResponseEntity<User> reactivateUser(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<User>(service.reactivateSpecifiedUser(id), HttpStatus.OK);
        }
        String message = "There was an error while updating the user's active status to active.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/datesPresent/{id}")
    public ResponseEntity<List<Attendance>> datesPresent(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<Attendance>>(service.retrieveDatesPresent(id), HttpStatus.OK);
        }
        String message = "There was an error while retrieving the dates the user was in the office.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/attendanceDuringRange/{id}/{startDate}/{endDate}")
    public ResponseEntity<TreeMap<LocalDate, List<User>>> attendanceDuringRange (@PathVariable int id, @PathVariable String startDate, @PathVariable String endDate, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<TreeMap<LocalDate, List<User>>>(service.generateAttendanceDuringRange(id, startDate, endDate), HttpStatus.OK);
        }
        String message = "There was an error while attempt to trace contact with other users in the office.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @GetMapping("/attendanceDuringRangeSummary/{id}/{startDate}/{endDate}")
    public ResponseEntity<List<User>> attendanceDuringRangeSummary (@PathVariable int id, @PathVariable String startDate, @PathVariable String endDate, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<List<User>>(service.generateAttendanceDuringRangeSummary(id, startDate, endDate), HttpStatus.OK);
        }
        String message = "There was an error while attempt to trace contact with other users in the office.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
    
    @CrossOrigin(origins = "https://044db60.netsolhost.com")
    @PostMapping("/departedEarly/{id}")
    public ResponseEntity<Attendance> departedEarly(@PathVariable int id, @RequestHeader("email") String email, @RequestHeader("password") String password) {
        User dbAdmin = service.checkAdmin(email, password);
        if(dbAdmin != null){
            return new ResponseEntity<Attendance>(service.markDepartedEarly(id), HttpStatus.OK);
        }
        String message = "There was an error while attempting to mark the user as departed early for the current date.";
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
}
