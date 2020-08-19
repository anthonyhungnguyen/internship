package com.example.demo.repository;

import com.example.demo.model.UserTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface UserTransferRepository extends JpaRepository<UserTransfer, String> {
    List<UserTransfer> findAllBySenderAndReqDateBetween(String id, Date startDate, Date endDate);

}
