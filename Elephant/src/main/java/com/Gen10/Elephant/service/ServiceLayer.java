/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
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

    private BCrypt bcrypt = new BCrypt();

    public ServiceLayer(ArrivalRepository arrivalRepo, AttendanceRepository attendanceRepo,
            DepartureRepository departureRepo, LocationRepository locationRepo, RolesRepository rolesRepo,
            TimeSlotRepository timeSlotRepo, UsersRepository usersRepo) {
        this.arrivalRepo = arrivalRepo;
        this.attendanceRepo = attendanceRepo;
        this.departureRepo = departureRepo;
        this.locationRepo = locationRepo;
        this.rolesRepo = rolesRepo;
        this.timeSlotRepo = timeSlotRepo;
        this.usersRepo = usersRepo;
    }

    // **********
    // Arrival
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

    // public void deleteArrivalByUserId(){
    //
    // }

    public void saveArrival(Arrival arrival) {
        arrivalRepo.save(arrival);
    }

    public void saveArrivalAndDeparture(Arrival arrival, Departure departure) {
        saveArrival(arrival);
        saveDeparture(departure);
    }

    public Arrival reserveArrivalByTimeSlotId(User user, int id) {
        Arrival newArrival = new Arrival();
        
        newArrival.setArrivalDate((java.sql.Date) new Date());
        newArrival.setTimeSlot(getTimeSlotById(id));
        newArrival.setUser(user);
        
        return arrivalRepo.save(newArrival);
    }

    // **********
    // Attendance
    public List<Attendance> findAllAttendance() {
        return attendanceRepo.findAll();
    }

    public Attendance findAttendanceByUserId(int userId) {
        Attendance attendance = attendanceRepo.findById(userId).orElse(null);

        if (attendance == null) {
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

    // **********
    // Departure
    public List<Departure> findAllDepartures() {
        return departureRepo.findAll();
    }

    public Departure getDepartureByDepatureId(int departureId) {
        Departure departure = departureRepo.findById(departureId).orElse(null);

        if (departure == null) {
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

    public Departure reserveDepartureByTimeSlotId(User user, int departureId) {
        List<Departure> departures = findAllDepartures();
        Departure targetDepartureTimeSlot = null;

        for (Departure departure : departures) {
            if (departure.getTimeSlot().getTimeSlotId() == departureId) {
                targetDepartureTimeSlot = departure;
            }
        }

        targetDepartureTimeSlot.setUser(user);

        return departureRepo.save(targetDepartureTimeSlot);
    }

    // **********
    // Location
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
        // Due to auto-incrementing of locations in database, the specific user object
        // needs to be acquired and altered to prevent duplicate location with different
        // field(s).
        Location existingLocation = findLocationById(id);

        existingLocation.setMaxOccupancy(num);

        Location editedLocation = locationRepo.save(existingLocation);

        return editedLocation;
    }

    public Location editIncrement(int locationId, int timeIncrement) {
        Location currentLocation = locationRepo.findById(locationId).orElse(null);

        currentLocation.setTimeIncrement(timeIncrement);

        Location updatedLocation = locationRepo.save(currentLocation);

        editDailyTimeInterval(timeIncrement);

        return updatedLocation;
    }

    public void editDailyTimeInterval(int timeIncrement) {
        int objectCount = 0;
        List<Arrival> arrivals = null;
        List<Departure> departures = null;

        // Start of time interval is 7:00 AM (7 hrs * 60 min/hr = 420 min)
        // LocalDateTime dailyTimeIntervalBasis =
        // LocalDateTime.of(localDate).plusMinutes(420);

        // Total number of minutes from 7:00 AM to 7:00 PM (12 hr * 60 min/hr = 720 min)
        objectCount = 720 / timeIncrement;

        for (int i = 0; i < objectCount; i++) {
            // LocalDateTime newTimeSlot =
        }
        
        return updatedLocation;
    }
    
    public Location editDailyTimeInterval(int locationId, Time startTime, Time endTime) {
        Location currentLocation = locationRepo.findById(locationId).orElse(null);
        
        currentLocation.setBeginningTime(startTime);
        currentLocation.setEndTime(endTime);
        
        return locationRepo.save(currentLocation);
    }

    // **********
    // Role(s)
    public List<Role> getAllRoles() {
        return rolesRepo.findAll();
    }

    public Role findRoleByName(String identifier) {
        Role role = rolesRepo.findByName(identifier);

        if (role == null) {
            System.out.println("The role object is null");
            return role;
        } else {
            return role;
        }
    }

    // public void deleteRoleById(int roleId) {
    // roleRepo.deleteById(roleId);
    // }

    // public void saveRole(Role role) {
    // roleRepo.save(role);
    // }

    // **********
    // TimeSlot
    public List<TimeSlot> getOpenTimeSlotsByLocationId(int locationId) {
        List<TimeSlot> allTimeSlots = timeSlotRepo.findAll();
        List<TimeSlot> locationTimeSlots = new ArrayList<>();

        for (TimeSlot ts : allTimeSlots) {
            if (ts.getLocation().getLocationId() == locationId)
                locationTimeSlots.add(ts);
        }

        return locationTimeSlots;
    }

    public TimeSlot findTimeSlotByLocation(int timeSlotId) {
        TimeSlot timeSlot = timeSlotRepo.findById(timeSlotId).orElse(null);

        if (timeSlot == null) {
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
    
    public TimeSlot getTimeSlotById(int TimeSlotId) {
        TimeSlot timeSlot = timeSlotRepo.findById(TimeSlotId).orElse(null);
        
        if(timeSlot == null) {
            System.out.println("The timeSlot object is null");
            return timeSlot;
        } else {
            return timeSlot;
        }
    }
    
//  **********
//  User(s)

    public List<User> getUsers(int locationId) {

        List<User> users = usersRepo.findAll();
        List<User> usersOfLocation = new ArrayList<>();

        for (User u : users) {
            if (u.getLocation().getLocationId() == locationId) {
                usersOfLocation.add(u);
            }
        }

        return usersOfLocation;
    }

    public List<User> getAllUsersByLocation(Location location) {
        return usersRepo.findAllByLocation(location);
    }

    public List<User> currentUsersInOffice(int id) {
        Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationInAttendance = new ArrayList<>();

        for (User users : usersByLocation) {
            if (findAttendanceByUserId(users.getUserId()).getIsAttending()) {
                usersByLocationInAttendance.add(users);
            }
        }

        return usersByLocationInAttendance;
    }

    // Edited Nate Wood 05/13/2020
    public List<User> getInactiveUsers(int id) {
        Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationNotAnswered = usersByLocation;

        for (User user : usersByLocation) {
            if(attendanceRepo.findByUser(user) != null) {
                usersByLocationNotAnswered.remove(user);
            }
        }

        return usersByLocationNotAnswered;
    }

    
	public List<User> getFlaggedUsers(int id) {
		Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationFlagged = new ArrayList<>();

        for (User user : usersByLocation) {
            if(attendanceRepo.findByUser(user) != null && attendanceRepo.findByUser(user).getIsAuthorized() == false) {
                usersByLocationFlagged.add(user);
            }
        }

        return usersByLocationFlagged;
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
        String password = "password";
        
        String encryptPass = BCrypt.hashpw(password, BCrypt.gensalt(10));
        user.setPasswords(encryptPass);
        System.out.println("to database: " + password + " and " + encryptPass);

        User dbUser = usersRepo.save(user);
        System.out.println("from database: " + password + " and " + BCrypt.);
        return usersRepo.save(user); 
    }

    public User editUser(User user) {
        // Due to auto-incrementing of users in database, the specific user object needs
        // to be acquired and altered to prevent duplicate user with different field(s).
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

    public User editUserPassword(User user) {
        // Due to auto-incrementing of users in database, the specific user object needs
        // to be acquired and altered to prevent duplicate user with different field(s).
        // Changes only the user password, used by users without admin role
        User existingUser = getUserById(user.getUserId());

        existingUser.setPasswords(user.getPasswords());

        User editedUser = usersRepo.save(existingUser);

        return editedUser;
    }

    public Attendance markAttendance(Attendance attendance) {
        attendance.setAttendanceDate(LocalDate.now());
        if (attendanceRepo.findByUser(attendance.getUser()) != null) {
            Attendance existingAttendance = attendanceRepo.findByUser(attendance.getUser());
            existingAttendance.setIsAttending(attendance.getIsAttending());
            attendanceRepo.save(existingAttendance);
        }
        return attendanceRepo.save(attendance);
    }

	public List<Arrival> getAllArrivalsByLocationId(int id) {
        return getAllArrivalsByLocationId(id);
	}

	public List<Departure> getAllDeparturesByLocationId(int id) {
		return getAllDeparturesByLocationId(id);
	}

    public User checkLogin(User user) {
        User dbUser = usersRepo.findByEmail(user.getEmail());
        if ((dbUser != null) && (dbUser.getPasswords()).equals(user.getPasswords())) {
            return dbUser;
        }
        return null;
    }

    public User checkAdmin(String email, String password) {
        User dbUser = usersRepo.findByEmail(email);
        if ((dbUser != null) && (dbUser.getPasswords().equals(password))
                && dbUser.getRole().getName().equals("ROLE_ADMIN")) {
            return dbUser;
        }
        return null;
    }

    public User checkUser(String email, String password) {
        User dbUser = usersRepo.findByEmail(email);
        if ((dbUser != null) && (dbUser.getPasswords().equals(password))
                && (dbUser.getRole().getName().equals("ROLE_ADMIN")
                        || dbUser.getRole().getName().equals("ROLE_USER"))) {
            return dbUser;
        }
        return null;
    }
}
