package com.Gen10.Elephant.Controller;

import com.Gen10.Elephant.service.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    ServiceLayer service;

}
