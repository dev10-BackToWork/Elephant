/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Gen10.Elephant.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

import com.Gen10.Elephant.dao.AttendanceRepository;
import com.Gen10.Elephant.dao.LocationRepository;
import com.Gen10.Elephant.dao.RolesRepository;
import com.Gen10.Elephant.dao.UsersRepository;
import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.Role;
import com.Gen10.Elephant.dto.User;

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

    private LocalDate lastCleanDate = LocalDate.now();

    private String emailPW = "gwgdtdanxxqwrlts";

    // **********
    // Attendance
    public List<Attendance> findAllAttendance() {
        return attendanceRepo.findAll();
    }

    public List<Attendance> retrieveDatesPresent(int id) {
        List<Attendance> allAttendance = attendanceRepo.findAttendanceWithinLast30Days();
        List<Attendance> usersAttendanceDates = new ArrayList<>();

        for (Attendance attendance : allAttendance) {
            if (attendance.getUser().getUserId() == id && attendance.getIsAttending() && attendance.getIsAuthorized()) {
                usersAttendanceDates.add(attendance);
            }
        }

        return usersAttendanceDates;
    }

    public List<Attendance> generateAttendanceReport(int id, String date) {
        LocalDate specifiedDate = LocalDate.parse(date);
        int locIdOnDate = usersRepo.findUserLocationIdOnDate(id, date);
        List<Attendance> attendanceList = attendanceRepo.findAttendanceAuthorizedOnDate(locIdOnDate, specifiedDate);

        return attendanceList.stream()
                .sorted((o1, o2) -> o1.getUser().getLastName().compareTo(o2.getUser().getLastName()))
                .collect(Collectors.toList());
    }

    public TreeMap<LocalDate, List<User>> generateAttendanceDuringRange(int id, String startDate, String endDate) {
        LocalDate firstSpecifiedDate = LocalDate.parse(endDate);
        LocalDate earliestDate = LocalDate.parse(startDate);

        List<Attendance> allAttendance = attendanceRepo.findAttendanceAuthorizedWithinRange(id, earliestDate,
                firstSpecifiedDate);
        HashMap<LocalDate, List<User>> usersByDate = new HashMap<>();
        TreeMap<LocalDate, List<User>> sortedUsersByDate = new TreeMap<>();

        for (Attendance attendance : allAttendance) {
            usersByDate.computeIfAbsent(attendance.getAttendanceDate(), k -> new ArrayList<>())
                    .add(attendance.getUser());
        }

        usersByDate.forEach((key, value) -> usersByDate.put(key,
                value.stream().sorted(Comparator.comparing(User::getLastName)).collect(Collectors.toList())));

        sortedUsersByDate.putAll(usersByDate);

        return sortedUsersByDate;
    }

    public List<User> generateAttendanceDuringRangeSummary(int id, String startDate, String endDate) {
        LocalDate firstSpecifiedDate = LocalDate.parse(endDate);
        LocalDate earliestDate = LocalDate.parse(startDate);

        List<Attendance> allAttendance = attendanceRepo.findAttendanceAuthorizedWithinRange(id, earliestDate,
                firstSpecifiedDate);
        List<User> uniqueUsers = new ArrayList<>();

        for (Attendance attendance : allAttendance) {
            if (!uniqueUsers.contains(attendance.getUser())) {
                uniqueUsers.add(attendance.getUser());
            }
        }

        List<User> uniqueUsersSorted = uniqueUsers.stream().sorted(Comparator.comparing(User::getLastName))
                .collect(Collectors.toList());

        return uniqueUsersSorted;
    }

    public Attendance markDepartedEarly(int id) {
        attendanceRepo.markAttendanceDepartedEarly(id);
        return attendanceRepo.findAttendanceDepartedEarly(id);
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

    public Location addLocation(Location location) {
        return locationRepo.save(location);
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

    // **********
    // User(s)

    public List<User> getUsers(int locationId) {
        return usersRepo.findAllUsersOfSpecifiedLocation(locationId);
    }

    public List<User> getGuests(int id) {
        return usersRepo.findAllGuestsOfSpecifiedLocation(id);
    }

    public List<User> currentUsersInOffice(int id) {
        return usersRepo.findCurrentUsersInOffice(id);
    }

    public List<Attendance> currentAttendancesInOffice(int id) {
        return attendanceRepo.findCurrentAttendancesInOffice(id);
    }

    public List<User> getInactiveUsers(int id) {
        Location location = locationRepo.findById(id).orElse(null);
        List<User> usersByLocationNotAnswered = usersRepo.findAllInactiveByLocation(location);

        return usersByLocationNotAnswered;
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

        if (dbUser != null) {
            Mailer.send("noreply.dev10@gmail.com", emailPW, user.getEmail(), "Account Created", "<p>Hello "
                    + dbUser.getFirstName()
                    + ", </p><p> &emsp; A new account has been created for you with the username: <span style=\"text-decoration: none; color: inherit;\"><strong>"
                    + dbUser.getEmail() + "</strong></span>" + "<br/> &emsp; Your temporary password is: <strong>"
                    + dbUser.getDefaultPW()
                    + "</p><p style=\"color:red\"></strong> &emsp; Note that you will be required to change your password upon logging in for the first time.</p>"
                    + "<p>This is an automatically generated email from  <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p
        }

        return dbUser;
    }

    public User createGuest(User guest) throws DataFormatException {
        if (usersRepo.findByName(guest.getFirstName(), guest.getLastName()) != null) {
            throw new DataFormatException("A guest already exists for that name");
        }
        return usersRepo.save(guest);
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
        // attendance.setAttendanceDate(LocalDate.now().minusDays(1));
        Attendance todaysAttendance = attendanceRepo.findTodayByUser(attendance.getUser().getUserId(), LocalDate.now());

        if (attendance.getIsAttending() == true && attendance.getIsAuthorized() == false) {
            ArrayList<String> adminEmails = new ArrayList<>();
            adminEmails.add("hr@genesis10.com");
            adminEmails.add(locationRepo.getDistributionEmailByLocation(attendance.getLocation().getLocationId()));
            for (String email : adminEmails) {
                Mailer.send("noreply.dev10@gmail.com", emailPW, email,
                        "Authorization Pending for " + attendance.getUser().getFirstName() + " "
                                + attendance.getUser().getLastName(),
                        "<p>" + attendance.getUser().getFirstName() + " " + attendance.getUser().getLastName()
                                + " has selected 'yes' for one of the authorization questions. <br/> Please follow up with them at "
                                + attendance.getUser().getEmail() + " for more information.</p>"
                                + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");
            }
        }

        Location location = attendance.getUser().getLocation();
        List<User> usersInOffice = currentUsersInOffice(location.getLocationId());
        if (usersInOffice.size() == location.getMaxOccupancy() + 1) {
            List<String> adminEmails = usersRepo.getAdminEmailsByLocation(attendance.getLocation().getLocationId());
            for (String email : adminEmails) {
                Mailer.send("noreply.dev10@gmail.com", emailPW, email, "Max Capacity Warning",
                        "<p> More people than currently recommended by your max capacity of <strong>"
                                + location.getMaxOccupancy() + "</strong> are currently signed up to come in today."
                                + "<br/> Please take any necessary actions to ensure the safety of the employees at your location."
                                + "<br/> You can view the people currently coming into the office by signing into your account and scrolling down to the <strong>\"Today's Attendance\"<strong section</p>"
                                + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");
            }
        }

        if (todaysAttendance != null) {
            todaysAttendance.setIsAttending(attendance.getIsAttending());
            todaysAttendance.setIsAuthorized(attendance.getIsAuthorized());
            todaysAttendance.setVisitingHost(attendance.getVisitingHost());
            todaysAttendance.setMiscInfo(attendance.getMiscInfo());
            return attendanceRepo.save(todaysAttendance);
        } else {
            return attendanceRepo.save(attendance);
        }
    }

    public Attendance markGuestAttendance(Attendance attendance) {
        attendance.setAttendanceDate(LocalDate.now());
        // attendance.setAttendanceDate(LocalDate.now().minusDays(1));
        Attendance todaysAttendance = attendanceRepo.findTodayByUser(attendance.getUser().getUserId(), LocalDate.now());

        Location location = attendance.getUser().getLocation();
        List<User> usersInOffice = currentUsersInOffice(location.getLocationId());
        if (usersInOffice.size() == location.getMaxOccupancy() + 1) {
            List<String> adminEmails = usersRepo.getAdminEmailsByLocation(attendance.getLocation().getLocationId());
            for (String email : adminEmails) {
                Mailer.send("noreply.dev10@gmail.com", emailPW, email, "Max Capacity Warning",
                        "<p> More people than currently recommended by your max capacity of <strong>"
                                + location.getMaxOccupancy() + "</strong> are currently signed up to come in today."
                                + "<br/> Please take any necessary actions to ensure the safety of the employees at your location."
                                + "<br/> You can view the people currently coming into the office by signing into your account and scrolling down to the <strong>\"Today's Attendance\"<strong section</p>"
                                + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");
            }
        }

        if (todaysAttendance != null) {
            todaysAttendance.setIsAttending(attendance.getIsAttending());
            return attendanceRepo.save(todaysAttendance);
        } else {
            return attendanceRepo.save(attendance);
        }
    }

    public User checkLogin(String email, String password) throws invalidCredentialsException {
        cleanOldData();
        User dbUser = usersRepo.findByEmail(email);
        if (dbUser == null) {
            throw new invalidCredentialsException("Username was invalid");
        } else if (!BCrypt.checkpw(password, dbUser.getPasswords())) {
            throw new invalidCredentialsException("Password was incorrect");
        } else {
            return dbUser;
        }
    }

    public User checkAdmin(String email, String password) throws invalidCredentialsException {
        User dbUser = usersRepo.findByEmail(email);
        if (dbUser == null) {
            throw new invalidCredentialsException("Username was invalid");
        } else if (!BCrypt.checkpw(password, dbUser.getPasswords())) {
            throw new invalidCredentialsException("Password was incorrect");
        } else if (!(dbUser.getRole().getName().equals("ROLE_ADMIN")
                || dbUser.getRole().getName().equals("ROLE_SUPERADMIN"))) {
            throw new invalidCredentialsException("Insufficient permissions");
        } else {
            return dbUser;
        }
    }

    public User checkUser(String email, String password) throws invalidCredentialsException {
        User dbUser = usersRepo.findByEmail(email);
        if (dbUser == null) {
            throw new invalidCredentialsException("Username was invalid");
        } else if (!BCrypt.checkpw(password, dbUser.getPasswords())) {
            throw new invalidCredentialsException("Password was incorrect");
        } else if (!(dbUser.getRole().getName().equals("ROLE_ADMIN") || dbUser.getRole().getName().equals("ROLE_USER")
                || dbUser.getRole().getName().equals("ROLE_SUPERADMIN"))) {
            throw new invalidCredentialsException("Insufficient permissions");
        } else {
            return dbUser;
        }
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

        if (savedUser != null) {
            Mailer.send("noreply.dev10@gmail.com", emailPW, existingUser.getEmail(),
                    "Reset Password for " + existingUser.getEmail(),
                    "<p>Hi " + savedUser.getFirstName()
                            + ",</p>&emsp; We received a password reset request for your account from your branch manager."
                            + "<br/>&emsp; Your new password is: <strong>" + savedUser.getDefaultPW() + "</strong></p>"
                            + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");
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

    public Boolean generateAllPasswords() {
        try {
            for (User user : usersRepo.findAllMilwaukee()) {
                String password = generatePassword();
                user.setDefaultPW(password);

                String encryptPass = BCrypt.hashpw(password, BCrypt.gensalt(10));
                user.setPasswords(encryptPass);
                User savedUser = usersRepo.save(user);

                if (savedUser.getRole().getName().equals("ROLE_SUPERADMIN")
                        || savedUser.getRole().getName().equals("ROLE_ADMIN")) {
                    Mailer.send("noreply.dev10@gmail.com", emailPW, user.getEmail(), "Account Ready", "<p>Hi "
                            + user.getFirstName()
                            + ",</p>&emsp; Your account is now ready to use at https://044db60.netsolhost.com/adminLogin.html."
                            + "<br/>&emsp; Your username is: <strong>" + savedUser.getEmail() + "</strong></p>"
                            + "<br/>&emsp; Your temporary password is: <strong>" + savedUser.getDefaultPW() + "</strong></p>"
                            + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");

                } else {
                    Mailer.send("noreply.dev10@gmail.com", emailPW, user.getEmail(), "Account Ready", "<p>Hi "
                            + user.getFirstName()
                            + ",</p>&emsp; Your account is now ready to use at https://044db60.netsolhost.com/index.html."
                            + "<br/>&emsp; Your username is: <strong>" + savedUser.getEmail() + "</strong></p>"
                            + "<br/>&emsp; Your temporary password is: <strong>" + savedUser.getDefaultPW() + "</strong></p>"
                            + "<p>This is an automatically generated email from the <span style=\"color: rgb(228,112,31)\"><strong> Gen10 Back-To-Work <strong></span> application.</p>");
                }
            }
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private void cleanOldData() {
        int maxAge = 90;
        if (lastCleanDate != LocalDate.now()) {
            List<Attendance> oldAttendances = attendanceRepo.findAllOldAttendanceIdsByAge(maxAge);
            attendanceRepo.deleteInBatch(oldAttendances);
            List<User> oldGuests = usersRepo.findAllOldGuestsByAge(maxAge);
            usersRepo.deleteInBatch(oldGuests);
            lastCleanDate = LocalDate.now();
        }
    }
}
