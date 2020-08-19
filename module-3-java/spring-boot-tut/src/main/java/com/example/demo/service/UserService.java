package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserPayAppRepository;
import com.example.demo.repository.UserRFMRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserTransferRepository;
import com.example.demo.model.UserPayApp;
import com.example.demo.model.UserRFM;
import com.example.demo.model.UserTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private final UserRFMRepository userRFMRepository;
    private final UserPayAppRepository userPayAppRepository;
    private final UserTransferRepository userTransferRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRFMRepository userRFMRepository, UserPayAppRepository userPayAppRepository, UserTransferRepository userTransferRepository, UserRepository userRepository) {
        this.userRFMRepository = userRFMRepository;
        this.userPayAppRepository = userPayAppRepository;
        this.userTransferRepository = userTransferRepository;
        this.userRepository = userRepository;
    }

    public List<UserPayApp> getUserPayAppByUserId(String id) {
        return userPayAppRepository.findAllByUserId(id);
    }

    public UserRFM getUserRFMByUserId(String id) {
        return userRFMRepository.findByUserId(id);
    }

    public List<UserTransfer> getUserTransferByUserId(String id, Date startDate, Date endDate) {
        return userTransferRepository.findAllBySenderAndReqDateBetween(id, startDate, endDate);
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }
}
