package com.example.demo.api;

import com.example.demo.model.UserPayApp;
import com.example.demo.model.UserRFM;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("api/user")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "rfm/{id}")
    public UserRFM getUserRFMByUserId(@PathVariable("id") String id) {
        return userService.getUserRFMByUserId(id);
    }

    @GetMapping(path = "payapp/{id}")
    public List<UserPayApp> getUserPayAppByUserId(@PathVariable("id") String id) {
        return userService.getUserPayAppByUserId(id);
    }


}
