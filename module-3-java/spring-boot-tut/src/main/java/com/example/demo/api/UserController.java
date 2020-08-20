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

/**
 * The type User controller.
 */
@RequestMapping("api/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Gets user rfm by user id.
     *
     * @param id the id
     * @return the user rfm by user id
     * @throws Exception the exception when user not found
     */
    @GetMapping(path = "rfm/{id}")
    public UserRFM getUserRFMByUserId(@NotBlank @PathVariable("id") String id) throws Exception {
        User foundUser = userService.getUserById(id);
        if (foundUser == null) {
            throw new Exception("User Not Found");
        } else {
            return userService.getUserRFMByUserId(id);
        }

    }

    /**
     * Gets user pay app by user id.
     *
     * @param id the id
     * @return the user pay app by user id
     * @throws Exception the exception when user not found
     */
    @GetMapping(path = "payapp/{id}")
    public List<UserPayApp> getUserPayAppByUserId(@NotBlank @PathVariable("id") String id) throws Exception {
        User foundUser = userService.getUserById(id);
        if (foundUser == null) {
            throw new Exception("User Not Found");
        } else {
            return userService.getUserPayAppByUserId(id);
        }
    }

    /**
     * Gets user transfer by user id.
     *
     * @param id        the id
     * @param startDate the start date
     * @param endDate   the end date
     * @return the user transfer by user id
     * @throws Exception the exception when user not found
     */
    @GetMapping(path = "transfer/{id}")
    public List<UserTransfer> getUserTransferByUserId(@NotBlank @PathVariable("id") String id,
                                                      @NotBlank @RequestParam("startDate") String startDate, @NotBlank @RequestParam("endDate") String endDate)
            throws Exception {
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
