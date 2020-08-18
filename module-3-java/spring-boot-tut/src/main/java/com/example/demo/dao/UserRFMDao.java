package com.example.demo.dao;

import com.example.demo.model.UserRFM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRFMDao extends JpaRepository<UserRFM, String> {
//    @Query("SELECT u FROM user_pay_app u WHERE u.user_id = :id")
//    public UserRFM getUserRFMByUserId(String id);
}
