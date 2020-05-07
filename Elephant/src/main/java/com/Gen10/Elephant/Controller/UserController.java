package com.Gen10.Elephant.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final ServiceLayer service;
    
    public UserController(ServiceLayer service){
        this.service = service;
    }
    
}
