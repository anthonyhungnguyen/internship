package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.UserPayApp;
import com.example.demo.model.UserRFM;
import com.example.demo.model.UserTransfer;
import com.example.demo.repository.UserPayAppRepository;
import com.example.demo.repository.UserRFMRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * The type User service.
 */
@Service
public class UserService {

    @Autowired
    private UserRFMRepository userRFMRepository;

    @Autowired
    private UserPayAppRepository userPayAppRepository;

    @Autowired
    private UserTransferRepository userTransferRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Gets user pay app by user id.
     *
     * @param id the id
     * @return the user pay app by user id
     */
    public List<UserPayApp> getUserPayAppByUserId(final String id) {
        return userPayAppRepository.findAllByUserId(id);
    }

    /**
     * Gets user rfm by user id.
     *
     * @param id the id
     * @return the user rfm by user id
     */
    public UserRFM getUserRFMByUserId(final String id) {
        return userRFMRepository.findByUserId(id);
    }

    /**
     * Gets user transfer by user id.
     *
     * @param id        the id
     * @param startDate the start date
     * @param endDate   the end date
     * @return the user transfer by user id
     */
    public List<UserTransfer> getUserTransferByUserId(final String id, final Date startDate, final Date endDate) {
        return userTransferRepository.findAllBySenderAndReqDateBetween(id, startDate, endDate);
    }

    /**
     * Gets user by id.
     *
     * @param id the id
     * @return the user by id
     */
    public User getUserById(final String id) {
        return userRepository.findById(id).orElse(null);
    }
}
