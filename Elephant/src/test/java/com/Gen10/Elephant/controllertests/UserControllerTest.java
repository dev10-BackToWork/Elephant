package com.Gen10.Elephant.controllertests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import com.Gen10.Elephant.Controller.UserController;
import com.Gen10.Elephant.dto.Arrival;
import com.Gen10.Elephant.dto.Attendance;
import com.Gen10.Elephant.dto.Departure;
import com.Gen10.Elephant.dto.TimeSlot;
import com.Gen10.Elephant.dto.User;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    //Insert @Autowired Classes Here
    @Autowired
    UserController userCon;

    String userEmail = "user@user.com";
    String userPW = "password";


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
    public void testLogin() {
        User shouldExist = userCon.login(userEmail, userPW).getBody();
        assertTrue(shouldExist.getUserId() == 2);
        User shouldNull = userCon.login(userEmail, "badPassword").getBody();
        assertFalse(shouldNull.getUserId() == 2);
    }

    @Test
    public void testGetTimes() {
        List<TimeSlot> slots = userCon.getTimes(1, userEmail, userPW).getBody();
        assertTrue(slots.size() > 0);
    }

    @Test
    public void testChangePW() {
        User user = new User("user@user.com", "newPassword");
        user.setUserId(2);
        userCon.editUser(user, userEmail, userPW);

        User changedUser = userCon.login(userEmail, "newPassword").getBody();
        assertTrue(changedUser.getUserId() == 2);
        User shouldFail = userCon.login(userEmail, userPW).getBody();
        assertFalse(shouldFail.getUserId() == 2);

        //Cleanup
        user.setPasswords("password");
        userCon.editUser(user, userEmail, "newPassword");
    }
    
    @Test
    public void testComingNotComing() {
        User user = new User();
        user.setUserId(1);
        Attendance attendance = new Attendance();
        attendance.setIsAttending(true);
        attendance.setAttendanceDate(LocalDate.now());
        attendance.setUser(user);
        attendance.setIsAuthorized(true);
        Attendance attendanceDB = userCon.markAttendance(attendance, userEmail, userPW).getBody();
        assertEquals(1, attendanceDB.getAttendanceId());
        assertTrue(attendanceDB.getIsAuthorized());

        attendance.setIsAuthorized(false);
        attendanceDB = userCon.markAttendance(attendance, userEmail, userPW).getBody();
        assertFalse(attendanceDB.getIsAuthorized());
    }

    //Database must be re-made after each run test to function properly
    @Test
    public void testArrivalDuplicateArrival() {
        User user = new User(userEmail, userPW);
        user.setUserId(2);

        Arrival arrival = userCon.reserveArrival(user, 1, userEmail, userPW).getBody();
        assertTrue(arrival.getTimeSlot().getTimeSlotId() == 1);
        assertTrue(arrival.getArrivalId() == 1);
        assertTrue(arrival.getUser().getUserId() == 2);

        HttpStatus status = userCon.reserveArrival(user, 1, userEmail, userPW).getStatusCode();
        assertEquals(HttpStatus.IM_USED, status);
    }

    //Database must be re-made after each run test to function properly
    @Test
    public void testDepartureDuplicateDeparture() {
        User user = new User(userEmail, userPW);
        user.setUserId(2);

        Departure departure = userCon.reserveDeparture(user, 2, userEmail, userPW).getBody();
        assertTrue(departure.getDepartureId() == 1);
        assertTrue(departure.getTimeSlot().getTimeSlotId() == 2);
        assertTrue(departure.getUser().getUserId() == 2);

        HttpStatus status = userCon.reserveDeparture(user, 2, userEmail, userPW).getStatusCode();
        assertEquals(HttpStatus.IM_USED, status);
    }
}