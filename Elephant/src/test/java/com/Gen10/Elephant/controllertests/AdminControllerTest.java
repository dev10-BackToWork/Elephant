package com.Gen10.Elephant.controllertests;

import static org.junit.Assert.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;

import com.Gen10.Elephant.Controller.AdminController;
import com.Gen10.Elephant.Controller.UserController;
import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Location;
import com.Gen10.Elephant.dto.User;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminControllerTest {

    //Insert @Autowired Classes Here
    @Autowired
    AdminController adminCon;

    @Autowired
    UserController userCon;

    String adminEmail = "admin@admin.com";
    String adminPW = "password";

    //Stateful Testing SetUp and TearDown
    @BeforeClass
    public static void setUpClass(){
    }

    @AfterClass
    public static void tearDownClass(){
    }

    @Before
    public void setUp(){
    }

    @After
    public void tearDown() {
    }

    //Tests Here
    @Test
    public void testAddGetUser() {
        User user =  new User("test@test.com", "password");
        user.setFirstName("test");
        user.setLastName("user");
        user.setLocation(adminCon.getLocations(adminEmail, adminPW).getBody().get(0));
        user.setRole(adminCon.getRoles(adminEmail, adminPW).getBody().get(1));
        User createdUser = adminCon.createUser(user, adminEmail, adminPW).getBody();
        User loggedIn = userCon.login("test@test.com", createdUser.getDefaultPW()).getBody();
        
        assertEquals(createdUser, loggedIn);
    }

//    @Test
//    public void testGetOccupants() {
//        User user = adminCon.getUserById(2, adminEmail, adminPW).getBody();
//        Attendance att = new Attendance();
//        att.setAttendanceDate(LocalDate.now());
//        att.setIsAttending(true);
//        att.setIsAuthorized(true);
//        att.setUser(user);
//        userCon.markAttendance(att, adminEmail, adminPW);
//        List<User> occupants = adminCon.getOccupants(1, adminEmail, adminPW).getBody();
//        assertTrue(occupants.size() > 0);
//    }

    //Relies on test user from testAddGetUser()
    @Test
    public void testNoAnswers() {
        assertEquals(1, adminCon.getInactiveUsers(1, adminEmail, adminPW).getBody().size());
    }

    @Test
    public void testFlagged(){
        User user = adminCon.getUserById(2, adminEmail, adminPW).getBody();
        Attendance att = new Attendance();
        att.setAttendanceDate(LocalDate.now());
        att.setIsAttending(true);
        att.setIsAuthorized(false);
        att.setUser(user);
        userCon.markAttendance(att, adminEmail, adminPW);
        assertEquals(1, adminCon.getFlagged(1, adminEmail, adminPW).getBody().size());
    }

    @Test
    public void testResetPassword() {
        User user = adminCon.getUserById(2, adminEmail, adminPW).getBody();
        adminCon.resetPassword(2, adminEmail, adminPW);
        User newUser = adminCon.getUserById(2, adminEmail, adminPW).getBody();

        assertNotEquals(user.getDefaultPW(), newUser.getDefaultPW());
        assertNotEquals(user.getPasswords(), newUser.getPasswords());
    }
}