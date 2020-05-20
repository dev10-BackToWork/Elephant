package com.Gen10.Elephant.controllertests;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import com.Gen10.Elephant.Controller.AdminController;
import com.Gen10.Elephant.Controller.UserController;
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
        user.setLocation(adminCon.getLocations(adminEmail, adminPW).getBody().get(0));
        user.setRole(adminCon.getRoles(adminEmail, adminPW).getBody().get(1));
        User createdUser = adminCon.createUser(user, adminEmail, adminPW).getBody();
        User loggedIn = userCon.login("test@test.com", "password").getBody();
        
        assertNotEquals(user, loggedIn);
        assertEquals(createdUser, loggedIn);
    }
}