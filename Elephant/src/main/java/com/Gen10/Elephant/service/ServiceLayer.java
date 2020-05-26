/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import java.sql.SQLDataException;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.zip.DataFormatException;

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

import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    public List<Arrival> getAllArrivalsByLocationId(int id) {
        List<Arrival> arrivals = findAllArrivals();
        List<Arrival> currentArrivalsByLocation = new ArrayList<>();
        java.sql.Date currentDateSQL = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        for (Arrival arrival : arrivals) {
            if (arrival.getTimeSlot().getLocation().getLocationId() == id
                    && arrival.getArrivalDate().toString().contains(currentDateSQL.toString()))
                currentArrivalsByLocation.add(arrival);
        }

        return currentArrivalsByLocation;
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

    public Arrival reserveArrivalByTimeSlotId(User user, int id) throws timeSlotReservedException {
        TimeSlot timeSlot = getTimeSlotById(id);

        if (timeSlot.getIsTaken()) {
            throw new timeSlotReservedException(
                    "The time slot is no longer available. Please choose another time to plan your arrival.");
        }

        timeSlot.setIsTaken(true);
        timeSlotRepo.save(timeSlot);

        Arrival newArrival = new Arrival();

        java.sql.Date newDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        newArrival.setArrivalDate(newDate);
        newArrival.setTimeSlot(getTimeSlotById(id));
        newArrival.setUser(getUserById(user.getUserId()));

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

    public List<Attendance> findAttendanceByCurrentDate() {
        List<Attendance> allAttendance = attendanceRepo.findAll();
        List<Attendance> currentAttendance = new ArrayList<>();
        java.sql.Date currentDateSQL = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        LocalDate date = LocalDate.now();
        for (Attendance attendance : allAttendance) {
            if (attendance.getAttendanceDate().equals(LocalDate.now())) {
                currentAttendance.add(attendance);
            }
        }

        return currentAttendance;
    }

    // **********
    // Departure
    public List<Departure> findAllDepartures() {
        return departureRepo.findAll();
    }

    public List<Departure> getAllDeparturesByLocationId(int id) {
        List<Departure> departures = findAllDepartures();
        List<Departure> currentDeparturesByLocation = new ArrayList<>();
        java.sql.Date currentDateSQL = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        for (Departure departure : departures) {
            if (departure.getTimeSlot().getLocation().getLocationId() == id
                    && departure.getDepartureDate().toString().contains(currentDateSQL.toString()))
                currentDeparturesByLocation.add(departure);
        }

        return currentDeparturesByLocation;
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

    public Departure reserveDepartureByTimeSlotId(User user, int id) throws timeSlotReservedException {
        TimeSlot timeSlot = getTimeSlotById(id);

        if (timeSlot.getIsTaken()) {
            throw new timeSlotReservedException(
                    "The time slot is no longer available. Please choose another time to plan your departure.");
        }

        timeSlot.setIsTaken(true);
        timeSlotRepo.save(timeSlot);

        Departure newDeparture = new Departure();

        java.sql.Date newDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        newDeparture.setDepartureDate(newDate);
        newDeparture.setTimeSlot(getTimeSlotById(id));
        newDeparture.setUser(getUserById(user.getUserId()));

        return departureRepo.save(newDeparture);
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

        return updatedLocation;
    }

    public Location editDailyTimeInterval(int locationId, Time startTime, Time endTime) {
        Location currentLocation = locationRepo.findById(locationId).orElse(null);

        currentLocation.setBeginningTime(startTime);
        currentLocation.setEndTime(endTime);

        return locationRepo.save(currentLocation);
    }

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
        java.sql.Date currentDateSQL = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        for (TimeSlot ts : allTimeSlots) {
            if (ts.getLocation().getLocationId() == locationId && ts.getIsTaken() == false
                    && ts.getTimeSlotDate().toString().contains(currentDateSQL.toString()))
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

        if (timeSlot == null) {
            System.out.println("The timeSlot object is null");
            return timeSlot;
        } else {
            return timeSlot;
        }
    }

    // **********
    // User(s)

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

    // Edited Matthew Gerszewski 5/18/2020
    public List<User> currentUsersInOffice(int id) {
        Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationInAttendance = new ArrayList<>();
        List<Attendance> currentAttendance = findAttendanceByCurrentDate();

        for (User users : usersByLocation) {
            for (Attendance attendance : currentAttendance) {
                if (attendance.getUser().equals(users) && attendance.getIsAttending() && attendance.getIsAuthorized()) {
                    usersByLocationInAttendance.add(users);
                }
            }
        }

        return usersByLocationInAttendance;
    }

    // Edited Nate Wood 05/13/2020
    // Edited Matthew Gerszewski 5/18/2020
    public List<User> getInactiveUsers(int id) {
        // List<Attendance> currentAttendance = findAttendanceByCurrentDate();
        // List<User> usersInAttendance = new ArrayList<>();
        // Location location = locationRepo.findById(id).orElse(null);
        // List<User> usersByLocation = getAllUsersByLocation(location);
        // List<User> usersByLocationNotAnswered = usersByLocation;
        // List<User> currentInactiveUsersByLocation = new ArrayList<>();
        // User defaultUser = usersRepo.findByEmail("user@user.com");

        // for (Attendance attendance : currentAttendance) {
        // usersInAttendance.add(attendance.getUser());
        // }

        // for (User user : usersByLocation) {
        // if (attendanceRepo.findTodayByUser(user.getUserId(), LocalDate.now()) !=
        // null) {
        // usersByLocationNotAnswered.remove(user);
        // }
        // if (!usersInAttendance.contains(user))
        // currentInactiveUsersByLocation.add(user);
        // }

        // if (currentInactiveUsersByLocation.contains(defaultUser))
        // currentInactiveUsersByLocation.remove(defaultUser);

        // return currentInactiveUsersByLocation;
        Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationNotAnswered = getAllUsersByLocation(location);
        java.sql.Date currentDateSQL = new java.sql.Date(Calendar.getInstance().getTime().getTime());

        for (User user : usersByLocation) {
            if (attendanceRepo.findTodayByUser(user.getUserId(), LocalDate.now()) != null) {
                usersByLocationNotAnswered.remove(user);
            }
        }

        return usersByLocationNotAnswered;
    }

    public List<User> getFlaggedUsers(int id) {
        List<User> usersByLocationFlagged = new ArrayList<>();
        List<Attendance> currentAttendance = findAttendanceByCurrentDate();

        for (Attendance attendance : currentAttendance) {
            if (attendance.getIsAuthorized() == false && attendance.getIsAttending() == true
                    && attendance.getUser().getLocation().getLocationId() == id) {
                usersByLocationFlagged.add(attendance.getUser());
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
        List<Attendance> allAttendance = findAllAttendance();
        List<Arrival> allArrivals = findAllArrivals();
        List<Departure> allDepartures = findAllDepartures();

        for (Attendance attendance : allAttendance) {
            if (attendance.getUser().getUserId() == userId)
                attendanceRepo.deleteById(attendance.getAttendanceId());
        }

        for (Arrival arrival : allArrivals) {
            if (arrival.getUser().getUserId() == userId)
                arrivalRepo.deleteById(arrival.getArrivalId());
        }

        for (Departure departure : allDepartures) {
            if (departure.getUser().getUserId() == userId)
                departureRepo.deleteById(departure.getDepartureId());
        }

        usersRepo.deleteById(userId);
    }

    public User createUser(User user) throws DataFormatException {
        if (usersRepo.findByEmail(user.getEmail()) != null) {
            throw new DataFormatException("An account already exists for that email");
        }
        String password = generatePassword();
        user.setDefaultPW(password);

        String encryptPass = BCrypt.hashpw(password, BCrypt.gensalt(10));
        user.setPasswords(encryptPass);

        User dbUser = usersRepo.save(user);
        return usersRepo.save(dbUser);
    }

    public User editUser(User user) {
        // Due to auto-incrementing of users in database, the specific user object needs
        // to be acquired and altered to prevent duplicate user with different field(s).
        User existingUser = getUserById(user.getUserId());

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());

        String encryptedPW = BCrypt.hashpw(user.getPasswords(), BCrypt.gensalt(10));
        existingUser.setPasswords(encryptedPW);

        existingUser.setEmail(user.getEmail());
        existingUser.setLocation(user.getLocation());
        existingUser.setRole(user.getRole());

        User editedUser = usersRepo.save(existingUser);
        System.out.println(usersRepo.findById(existingUser.getUserId()).orElse(null).getFirstName());
        return editedUser;
    }

    public User editUserPassword(User user) {
        // Due to auto-incrementing of users in database, the specific user object needs
        // to be acquired and altered to prevent duplicate user with different field(s).
        // Changes only the user password, used by users without admin role
        User existingUser = getUserById(user.getUserId());

        String encryptedPW = BCrypt.hashpw(user.getPasswords(), BCrypt.gensalt(10));
        existingUser.setPasswords(encryptedPW);

        User editedUser = usersRepo.save(existingUser);

        return editedUser;
    }

    public Attendance markAttendance(Attendance attendance) {
        attendance.setAttendanceDate(LocalDate.now());
        // Attendance todaysAttendance =
        // attendanceRepo.findByUser(attendance.getUser()).stream()
        // .filter(a -> a.getAttendanceDate() == new
        // java.sql.Date(Calendar.getInstance().getTime().getTime())).collect(Collectors.toList()).get(0);
        Attendance todaysAttendance = attendanceRepo.findTodayByUser(attendance.getUser().getUserId(), LocalDate.now());

        if (todaysAttendance != null) {
            todaysAttendance.setIsAttending(attendance.getIsAttending());
            todaysAttendance.setIsAuthorized(attendance.getIsAuthorized());
            return attendanceRepo.save(todaysAttendance);
        } else {
            return attendanceRepo.save(attendance);
        }
    }

    public User checkLogin(User user) {
        User dbUser = usersRepo.findByEmail(user.getEmail());
        if ((dbUser != null) && BCrypt.checkpw(user.getPasswords(), dbUser.getPasswords())) {
            return dbUser;
        }
        return null;
    }

    public User checkAdmin(String email, String password) {
        User dbUser = usersRepo.findByEmail(email);
        if ((dbUser != null) && (BCrypt.checkpw(password, dbUser.getPasswords()))
                && dbUser.getRole().getName().equals("ROLE_ADMIN")) {
            // if ((dbUser != null) && password.equals(dbUser.getPasswords())){
            return dbUser;
        }
        return null;
    }

    public User checkUser(String email, String password) {
        User dbUser = usersRepo.findByEmail(email);
        if ((dbUser != null) && (BCrypt.checkpw(password, dbUser.getPasswords()))
                && (dbUser.getRole().getName().equals("ROLE_ADMIN")
                        || dbUser.getRole().getName().equals("ROLE_USER"))) {
            return dbUser;
        }
        return null;
    }

    private String generatePassword() {
        int lcMin = 97, lcMax = 122, ucCapMin = 65, ucCapMax = 90;
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int letterInt;
            if (random.nextInt(2) == 0) {
                letterInt = lcMin + (int) (random.nextFloat() * (lcMax - lcMin + 1));
            } else {
                letterInt = ucCapMin + (int) (random.nextFloat() * (ucCapMax - ucCapMin + 1));
            }
            buffer.append((char) letterInt);
        }
        return buffer.toString();
    }

    public User resetUserPassword(int id) {
        User existingUser = usersRepo.findById(id).orElse(null);
        String password = generatePassword();
        existingUser.setDefaultPW(password);

        String encryptPass = BCrypt.hashpw(password, BCrypt.gensalt(10));
        existingUser.setPasswords(encryptPass);

        return usersRepo.save(existingUser);
    }

    public Location getLocationById(int id) {
        return locationRepo.getByLocationId(id);
    }

    public Boolean checkPasswordChange(User user) {
        if (BCrypt.checkpw(user.getDefaultPW(), user.getPasswords())) {
            return false;
        }
        return true;
    }

    public Boolean generateAllPasswords(){
        try {
            for (User user : usersRepo.findAll()) {
                String password = generatePassword();
                user.setDefaultPW(password);

                String encryptPass = BCrypt.hashpw(password, BCrypt.gensalt(10));
                user.setPasswords(encryptPass);
                User dbUser = usersRepo.save(user);
            }
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
