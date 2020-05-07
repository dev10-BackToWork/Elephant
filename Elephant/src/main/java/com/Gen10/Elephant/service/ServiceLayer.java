/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import java.util.List;

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

    public Arrival findArrivalByArrivalId(int arrivalId) {
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

//  **********
//  Attendance
    public List<Attendance> findAllAttendances() {
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
    
    public void saveAttendance(Attendance attendance) {
        attendanceRepo.save(attendance);
    }
    
//  **********
//  Departure
    public List<Departure> findAllDepartures() {
        return departureRepo.findAll();
    }
    
    public Departure findDepartureByDepatureId(int departureId) {
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
    

//  **********
//  Location
    public List<Location> findAllLocations() {
        return locationRepo.findAll();
    }

    public Location findLocationByIdentifier(String identifier) {
        Location location = locationRepo.findById(identifier).orElse(null);

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

    public void saveLocation(Location location) {
        locationRepo.save(location);
    }

//  **********
//  Role(s)
    public List<Role> findAllRoles() {
        return rolesRepo.findAll();
    }
    
    public Role findRoleByIdentifier(String identifier) {
        Role role = roleRepo.findById(identifier).orElse(null);
        
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
    public List<TimeSlot> findAllTimeSlots() {
        return timeSlotRepo.findAll();
    }
    
    public TimeSlot findTimeSlotByLocation(String identifier) {
        TimeSlot timeSlot = timeSlotRepo.findById(identifier).orElse(null);
        
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
    public List<User> findAllUsers() {
        return usersRepo.findAll();
    }

    public User findUserByIdentifier(int userId) {
        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            System.out.println("The user object is null");
            return user;
        } else {
            return user;
        }
    }

    public void deleteUserById(int userId) {
        userRepo.deleteById(userId);
    }

    public void saveUser(User user) {
        userRepo.save(user);
    }

}
