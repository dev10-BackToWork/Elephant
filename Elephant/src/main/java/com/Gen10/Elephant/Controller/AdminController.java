package com.Gen10.Elephant.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminController {
    
    private final ServiceLayer service;
    
    public AdminController(ServiceLayer service){
        this.service = service;
    }
}
