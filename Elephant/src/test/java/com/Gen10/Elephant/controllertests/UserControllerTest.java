package com.Gen10.Elephant.controllertests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import com.Gen10.Elephant.Controller.UserController;
import com.Gen10.Elephant.dto.Attendance;
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
}