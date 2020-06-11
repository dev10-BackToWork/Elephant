/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.zip.DataFormatException;

import com.Gen10.Elephant.dao.AttendanceRepository;
import com.Gen10.Elephant.dao.LocationRepository;
import com.Gen10.Elephant.dao.RolesRepository;
import com.Gen10.Elephant.dao.UsersRepository;
import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.Role;
import com.Gen10.Elephant.dto.User;
import java.util.Comparator;
import java.util.HashMap;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 *
 * @author Matthew
 */
@Service
public class ServiceLayer {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private LocationRepository locationRepo;

    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private UsersRepository usersRepo;

    // public ServiceLayer( AttendanceRepository attendanceRepo, LocationRepository locationRepo, 
    //                         RolesRepository rolesRepo, UsersRepository usersRepo) {
    //     this.attendanceRepo = attendanceRepo;
    //     this.locationRepo = locationRepo;
    //     this.rolesRepo = rolesRepo;
    //     this.usersRepo = usersRepo;
    // }

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
        for (Attendance attendance : allAttendance) {
            if (attendance.getAttendanceDate().equals(LocalDate.now())) {
                currentAttendance.add(attendance);
            }
        }

        return currentAttendance;
    }
    
    public List<LocalDate> retrieveDatesPresent(int id) {
        List<Attendance> allAttendance = attendanceRepo.findAttendanceWithinLast30Days();
        List<LocalDate> usersAttendanceDates = new ArrayList<>();
        
        for (Attendance attendance : allAttendance) {
            if (attendance.getUser().getUserId() == id && attendance.getIsAttending() && attendance.getIsAuthorized()) {
                usersAttendanceDates.add(attendance.getAttendanceDate());
            }
        }
        
        return usersAttendanceDates;
    }
    
    public List<Attendance> generateAttendanceReport(int id, String date) {
        LocalDate specifiedDate = LocalDate.parse(date);
        
        List<Attendance> attendanceList = attendanceRepo.findAttendanceAuthorizedOnDate(id, specifiedDate);
        
        return attendanceList.stream()
                .sorted((o1, o2) -> o1.getUser().getLastName().compareTo(o2.getUser().getLastName()))
                .collect(Collectors.toList());
    }
    
    public TreeMap<LocalDate, List<User>> generateAttendanceDuringRange (int id, String startDate, String endDate) {
        LocalDate firstSpecifiedDate = LocalDate.parse(endDate);
        LocalDate earliestDate = LocalDate.parse(startDate);
        
        List<Attendance> allAttendance = attendanceRepo.findAttendanceAuthorizedWithinRange(id, earliestDate, firstSpecifiedDate);
        HashMap<LocalDate, List<User>> usersByDate = new HashMap<>();
        TreeMap<LocalDate, List<User>> sortedUsersByDate = new TreeMap<>();
        
        for (Attendance attendance : allAttendance) {
            usersByDate.computeIfAbsent(attendance.getAttendanceDate(), k -> new ArrayList<>()).add(attendance.getUser());
        }
        
        usersByDate.forEach((key, value) -> 
                usersByDate.put(key, value.stream()
                .sorted(Comparator.comparing(User::getLastName))
                .collect(Collectors.toList())));
        
        sortedUsersByDate.putAll(usersByDate);
        
        return sortedUsersByDate;
    }
    
    public List<User> generateAttendanceDuringRangeSummary(int id, String startDate, String endDate) {
        LocalDate firstSpecifiedDate = LocalDate.parse(endDate);
        LocalDate earliestDate = LocalDate.parse(startDate);
        
        List<Attendance> allAttendance = attendanceRepo.findAttendanceAuthorizedWithinRange(id, earliestDate, firstSpecifiedDate);
        List<User> uniqueUsers = new ArrayList<>();
        
        for (Attendance attendance : allAttendance) {
            if(!uniqueUsers.contains(attendance.getUser())) {
                uniqueUsers.add(attendance.getUser());
            }
        }
        
        List<User> uniqueUsersSorted = uniqueUsers.stream()
                .sorted(Comparator.comparing(User::getLastName))
                .collect(Collectors.toList());
        
        return uniqueUsersSorted;
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
    // User(s)

    public List<User> getUsers(int locationId) {
        return usersRepo.findAllUsersOfSpecifiedLocation(locationId);
    }

    public List<User> getAllUsersByLocation(Location location) {
        return usersRepo.findAllByLocation(location);
    }

    // Edited Matthew Gerszewski 5/18/2020
    public List<User> currentUsersInOffice(int id) {
        return usersRepo.findCurrentUsersInOffice(id);
    }

    // Edited Nate Wood 05/13/2020
    // Edited Matthew Gerszewski 5/18/2020
    public List<User> getInactiveUsers(int id) {
        Location location = locationRepo.findById(id).orElse(null);
        // List<User> usersByLocation = getAllUsersByLocation(location);
        List<User> usersByLocationNotAnswered = usersRepo.findAllActiveByLocation(location);

        // for (User user : usersByLocation) {
        //     if (attendanceRepo.findTodayByUser(user.getUserId(), LocalDate.now()) != null) {
        //         usersByLocationNotAnswered.remove(user);
        //     }
        // }

        return usersByLocationNotAnswered;
    }

    private List<User> getAllActiveUsersByLocation(Location location) {
        return null;
    }

    public List<User> getFlaggedUsers(int id) {
        return usersRepo.findFlaggedUsersByLocation(id);
    }
    
    public List<User> getFlaggedUsersGlobal() {
        return usersRepo.findFlaggedUsersGlobal();
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

        for (Attendance attendance : allAttendance) {
            if (attendance.getUser().getUserId() == userId)
                attendanceRepo.deleteById(attendance.getAttendanceId());
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

        if (dbUser != null){
            Mailer.send(
                "noreply.dev10@gmail.com", "gwgdtdanxxqwrlts", "noreply.dev10@gmail.com",
                "Account Created", 
                "<p>Hello " + dbUser.getFirstName() + ", </p><p> &emsp; A new account has been created for you with the username: <span style=\"text-decoration: none; color: inherit;\"><strong>" + dbUser.getEmail() + "</strong></span>" + 
                "<br/> &emsp; Your temporary password is: <strong>" + dbUser.getDefaultPW() + 
                "</p><p style=\"color:red\"></strong> &emsp; Note that you will be required to change your password upon logging in for the first time.</p>" + 
                "<p>This is an automatically generated email from  <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>"
            );
        }

        return usersRepo.save(dbUser);
    }

    public User editUser(User user) {
        // Due to auto-incrementing of users in database, the specific user object needs
        // to be acquired and altered to prevent duplicate user with different field(s).
        User existingUser = getUserById(user.getUserId());

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());

        existingUser.setEmail(user.getEmail());
        existingUser.setLocation(user.getLocation());
        existingUser.setRole(user.getRole());

        User editedUser = usersRepo.save(existingUser);
        System.out.println(usersRepo.findById(existingUser.getUserId()).orElse(null).getFirstName());
        return editedUser;
    }
    
    public User deactivateSpecifiedUser(int id) {
        User existingUser = getUserById(id);
        
        existingUser.setIsActive(false);
        
        User deactivatedUser = usersRepo.save(existingUser);
        return deactivatedUser;        
    }
    
    public User reactivateSpecifiedUser(int id) {
        User existingUser = getUserById(id);
        
        existingUser.setIsActive(true);
        
        User activatedUser = usersRepo.save(existingUser);
        return activatedUser;
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
        Attendance todaysAttendance = attendanceRepo.findTodayByUser(attendance.getUser().getUserId(), LocalDate.now());
        
        if(attendance.getIsAttending() == true && attendance.getIsAuthorized() == false) {
            Mailer.send(
                "noreply.dev10@gmail.com", "gwgdtdanxxqwrlts", "noreply.dev10@gmail.com", 
                "Authorization for " + attendance.getUser().getFirstName() + " " + attendance.getUser().getLastName(),
                "<p>" + attendance.getUser().getFirstName() + " " + attendance.getUser().getLastName() + " has selected 'yes' for one of the authorization questions. <br/> Please follow up with them at " + attendance.getUser().getEmail() + " for more information.</p>" +
                "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>"
            );
        }

        Location location = attendance.getUser().getLocation();
        List<User> usersInOffice = currentUsersInOffice(location.getLocationId());
        if (usersInOffice.size() == location.getMaxOccupancy() + 1) {
            Mailer.send(
                "noreply.dev10@gmail.com", "gwgdtdanxxqwrlts", "noreply.dev10@gmail.com", 
                "Max Capacity Warning",
                "<p> More people than currently recommended by your max capacity of <strong>" + location.getMaxOccupancy() + "</strong> are currently signed up to come in today." +
                "<br/> Please take any necessary actions to ensure the safety of the employees at your location." + 
                "<br/> You can view the people currently coming into the office by signing into your account and scrolling down to the <strong>\"Today's Attendance\"<strong section</p>" +
                "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>"
            );
        }

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
                && (dbUser.getRole().getName().equals("ROLE_ADMIN") || dbUser.getRole().getName().equals("ROLE_SUPERADMIN"))) {
            // if ((dbUser != null) && password.equals(dbUser.getPasswords())){
            return dbUser;
        }
        return null;
    }

    public User checkUser(String email, String password) {
        User dbUser = usersRepo.findByEmail(email);
        if ((dbUser != null) && (BCrypt.checkpw(password, dbUser.getPasswords()))
                && (dbUser.getRole().getName().equals("ROLE_ADMIN")
                        || dbUser.getRole().getName().equals("ROLE_USER") || dbUser.getRole().getName().equals("ROLE_SUPERADMIN"))) {
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
        User savedUser = usersRepo.save(existingUser);
        
        if (savedUser != null){
            Mailer.send(
                "noreply.dev10@gmail.com", "gwgdtdanxxqwrlts", "noreply.dev10@gmail.com", 
                "Reset Password for " + existingUser.getEmail(), 
                "<p>Hi " + savedUser.getFirstName() + ",</p>&emsp; We received a password reset request for your account from your branch manager." + 
                "<br/>&emsp; Your new password is: <strong>" + savedUser.getDefaultPW() + "</strong></p>" +
                "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>"
            );
        }

        return savedUser;
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
                usersRepo.save(user);
            }
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
