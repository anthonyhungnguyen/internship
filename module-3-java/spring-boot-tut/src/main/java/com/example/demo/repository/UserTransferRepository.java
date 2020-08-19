package com.example.demo.dao;

import com.example.demo.model.UserTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface UserTransferDao extends JpaRepository<UserTransfer, String> {
    @Query("SELECT t FROM UserTransfer t WHERE t.sender = :id AND t.req_date BETWEEN :startDate AND :endDate")
    List<UserTransfer> getAllUserTransferByUserId(String id, Date startDate, Date endDate);
}
