package com.example.demo.api;

import com.example.demo.model.User;
import com.example.demo.model.UserPayApp;
import com.example.demo.model.UserRFM;
import com.example.demo.model.UserTransfer;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    public UserRFM getUserRFMByUserId(@NotBlank @PathVariable("id") String id) throws Exception {
        User foundUser = userService.getUserById(id);
        if (foundUser == null) {
            throw new Exception("User Not Found");
        } else {
            return userService.getUserRFMByUserId(id);
        }

    }

    @GetMapping(path = "payapp/{id}")
    public List<UserPayApp> getUserPayAppByUserId(@NotBlank @PathVariable("id") String id) throws Exception {
        User foundUser = userService.getUserById(id);
        if (foundUser == null) {
            throw new Exception("User Not Found");
        } else {
            return userService.getUserPayAppByUserId(id);
        }
    }

    @GetMapping(path = "transfer/{id}")
    public List<UserTransfer> getUserTransferByUserId(@NotBlank @PathVariable("id") String id, @NotBlank @RequestParam("startDate") String startDate, @NotBlank @RequestParam("endDate") String endDate) throws Exception {
        User foundUser = userService.getUserById(id);
        if (foundUser == null) {
            throw new Exception("User Not Found");
        } else {
            Date start = new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
            Date end = new SimpleDateFormat("yyyy-MM-dd").parse(endDate);
            return userService.getUserTransferByUserId(id, start, end);
        }
    }


}
