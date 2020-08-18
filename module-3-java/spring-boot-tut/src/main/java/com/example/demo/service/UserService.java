package com.example.demo.service;

import com.example.demo.dao.UserPayAppDao;
import com.example.demo.dao.UserRFMDao;
import com.example.demo.model.UserPayApp;
import com.example.demo.model.UserRFM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRFMDao userRFMDao;
    private final UserPayAppDao userPayAppDao;

    @Autowired
    public UserService(UserRFMDao userRFMDao, UserPayAppDao userPayAppDao) {
        this.userRFMDao = userRFMDao;
        this.userPayAppDao = userPayAppDao;
    }

    public List<UserPayApp> getUserPayAppByUserId(String id) {
        return userPayAppDao.getUserPayAppByUserId(id);
    }

    public UserRFM getUserRFMByUserId(String id) {
        return userRFMDao.getUserRFMByUserId(id);
    }
}
