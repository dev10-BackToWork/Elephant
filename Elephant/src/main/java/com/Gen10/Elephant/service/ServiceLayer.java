/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import com.Gen10.Elephant.dao.ArrivalRepository;
import com.Gen10.Elephant.dao.AttendanceRepository;
import com.Gen10.Elephant.dao.DepartureRepository;
import com.Gen10.Elephant.dao.LocationRepository;
import com.Gen10.Elephant.dao.RolesRepository;
import com.Gen10.Elephant.dao.TimeSlotRepository;
import com.Gen10.Elephant.dao.UsersRepository;
import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.Role;
import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.dto.User;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Matthew
 */
@Service
public class ServiceLayer {

    private final ArrivalRepository arrivalRepo;
    private final AttendanceRepository attendanceRepo;
    private final DepartureRepository departureRepo;
    private final LocationRepository locationRepo;
    private final RolesRepository rolesRepo;
    private final TimeSlotRepository timeSlotRepo;
    private final UsersRepository usersRepo;

    public ServiceLayer(ArrivalRepository arrivalRepo, AttendanceRepository attendanceRepo, DepartureRepository departureRepo, LocationRepository locationRepo, RolesRepository rolesRepo, TimeSlotRepository timeSlotRepo, UsersRepository usersRepo) {
        this.arrivalRepo = arrivalRepo;
        this.attendanceRepo = attendanceRepo;
        this.departureRepo = departureRepo;
        this.locationRepo = locationRepo;
        this.rolesRepo = rolesRepo;
        this.timeSlotRepo = timeSlotRepo;
        this.usersRepo = usersRepo;
    }

//  **********
//  Arrival
    public List<Arrival> findAllArrivals() {
        return arrivalRepo.findAll();
    }

    public Arrival getArrivalByArrivalId(int arrivalId) {
        Arrival arrival = arrivalRepo.findById(arrivalId).orElse(null);

        if (arrival == null) {
            System.out.println("The arrival object is null");
            return arrival;
        } else {
            return arrival;
        }
    }

    public void deleteArrivalById(int arrivalId) {
        arrivalRepo.deleteById(arrivalId);
    }
    
//    public void deleteArrivalByUserId(){
//        
//    }

    public void saveArrival(Arrival arrival) {
        arrivalRepo.save(arrival);
    }
    
    public void saveArrivalAndDeparture(Arrival arrival, Departure departure) {
        saveArrival(arrival);
        saveDeparture(departure);
    }
    
    public Arrival reserveArrivalByTimeSlotId(int id) {
        List<Arrival> arrivals = findAllArrivals();
        Arrival targetArrivalTimeSlot = null;
        
        for(Arrival arrival : arrivals) {
            if(arrival.getTimeSlot().getTimeSlotId() == id) {
                targetArrivalTimeSlot = arrival;
            }
        }
        
        return targetArrivalTimeSlot;
    }

//  **********
//  Attendance
    public List<Attendance> findAllAttendance() {
        return attendanceRepo.findAll();
    }
    
    public Attendance findAttendanceByUserId(int userId) {
        Attendance attendance = attendanceRepo.findById(userId).orElse(null);
        
        if(attendance == null) {
            System.out.println("The attendance object is null");
            return attendance;
        } else {
            return attendance;
        }
    }
    
    public void deleteAttendanceById(int attendanceId) {
        attendanceRepo.deleteById(attendanceId);
    }
    
    public void takeAttendance(Attendance attendance) {
        attendanceRepo.save(attendance);
    }
    
//  **********
//  Departure
    public List<Departure> findAllDepartures() {
        return departureRepo.findAll();
    }
    
    public Departure getDepartureByDepatureId(int departureId) {
        Departure departure = departureRepo.findById(departureId).orElse(null);
        
        if(departure == null) {
            System.out.println("The departure object is null");
            return departure;
        } else {
            return departure;
        }
    }
    
    public void deleteDepartureById(int departureId) {
        departureRepo.deleteById(departureId);
    }
    
    public void saveDeparture(Departure departure) {
        departureRepo.save(departure);
    }
    
    public Departure reserveDepartureByTimeSlotId(int id) {
        List<Departure> departures = findAllDepartures();
        Departure targetDepartureTimeSlot = null;
        
        for(Departure departure : departures) {
            if(departure.getTimeSlot().getTimeSlotId() == id) {
                targetDepartureTimeSlot = departure;
            }
        }
        
        return targetDepartureTimeSlot;
    }

//  **********
//  Location
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    public Location findLocationById(int locationId) {
        Location location = locationRepo.findById(locationId).orElse(null);

        if (location == null) {
            System.out.println("The location object is null");
            return location;
        } else {
            return location;
        }
    }

    public void deleteLocationById(int locationId) {
        locationRepo.deleteById(locationId);
    }

    public void newLocation(Location location) {
        locationRepo.save(location);
    }
    
    public Location editCapacity(int id, int num) {
//  Due to auto-incrementing of locations in database, the specific user object needs to be acquired and altered to prevent duplicate location with different field(s).
        Location existingLocation = findLocationById(id);
        
        existingLocation.setMaxOccupancy(num);
        
        Location editedLocation = locationRepo.save(existingLocation);
        
        return editedLocation;
    }
    
    public Location editIncrement(int locationId, int timeIncrement) {
        Location currentLocation = locationRepo.findById(locationId).orElse(null);
        
        currentLocation.setTimeIncrement(timeIncrement);
        
        Location updatedLocation = locationRepo.save(currentLocation);
        
        return updatedLocation;
    }

//  **********
//  Role(s)
    public List<Role> getAllRoles() {
        return rolesRepo.findAll();
    }
    
    public Role findRoleByName(String identifier) {
        Role role = rolesRepo.findByName(identifier);
        
        if(role == null) {
            System.out.println("The role object is null");
            return role;
        } else {
            return role;
        }
    }
    
//    public void deleteRoleById(int roleId) {
//        roleRepo.deleteById(roleId);
//    }
    
//    public void saveRole(Role role) {
//        roleRepo.save(role);
//    }

//  **********    
//  TimeSlot
    public List<TimeSlot> getOpenTimeSlotsByLocationId(int locationId) {
        List<TimeSlot> allTimeSlots = timeSlotRepo.findAll();
        List<TimeSlot> locationTimeSlots = null;
        
        for(TimeSlot ts : allTimeSlots) {
            if (ts.getLocation().getLocationId() == locationId)
                locationTimeSlots.add(ts);
        }
        
        return locationTimeSlots;
    }
    
    public TimeSlot findTimeSlotByLocation(int timeSlotId) {
        TimeSlot timeSlot = timeSlotRepo.findById(timeSlotId).orElse(null);
        
        if(timeSlot == null) {
            System.out.println("The timeSlot object is null");
            return timeSlot;
        } else {
            return timeSlot;
        }
    }
    
    public void deleteTimeSlotById(int timeSlotId) {
        timeSlotRepo.deleteById(timeSlotId);
    }
    
    public void saveTimeSlot(TimeSlot timeSlot) {
        timeSlotRepo.save(timeSlot);
    }
    
//  **********
//  User(s)

    public List<User> getUsers() {
        System.out.println("cp11");
        
        List<User> users = usersRepo.findAll();
        
        for(User u : users) {
            System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
            System.out.println(u.getFirstName());
        }
        
        return users;
    }
    
    public List<User> getAllUsersByLocation(Location location) {
        return usersRepo.findAllByLocation(location);
    }
    
    public List<User> currentUsersInOffice(Location location) {
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationInAttendance = null;
        
        for (User users : usersByLocation) {
            if (findAttendanceByUserId(users.getUserId()).getIsAttending()) {
                usersByLocationInAttendance.add(users);
            }
        }
        
        return usersByLocationInAttendance;
    }
    
    public List<User> getInactiveUsers(Location location) {
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationNotInAttendance = null;
        
        for (User users : usersByLocation) {
            if (!findAttendanceByUserId(users.getUserId()).getIsAttending()) {
                usersByLocationNotInAttendance.add(users);
            }
        }
        
        return usersByLocationNotInAttendance;
    }

    public User getUserById(int userId) {
        User user = usersRepo.findById(userId).orElse(null);

        if (user == null) {
            System.out.println("The user object is null");
            return user;
        } else {
            return user;
        }
    }


    public void deleteUserById(int userId) {
        usersRepo.deleteById(userId);
    }

    public User createUser(User user) {
        user.setPasswords("password");
        
        return usersRepo.save(user);
    }
    
    public User editUser(User user) {
//  Due to auto-incrementing of users in database, the specific user object needs to be acquired and altered to prevent duplicate user with different field(s).
        User existingUser = getUserById(user.getUserId());
        
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setPasswords(user.getPasswords());
        existingUser.setEmail(user.getEmail());
        existingUser.setLocation(user.getLocation());
        existingUser.setRole(user.getRole());
        
        User editedUser = usersRepo.save(existingUser);
        
        return editedUser;
    }

}
