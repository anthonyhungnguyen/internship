package com.example.demo.repository;

import com.example.demo.model.UserTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * The interface User transfer repository.
 */
@Repository
public interface UserTransferRepository extends JpaRepository<UserTransfer, String> {
    /**
     * Find all by sender and req date between list.
     *
     * @param id        the id
     * @param startDate the start date
     * @param endDate   the end date
     * @return the list
     */
    List<UserTransfer> findAllBySenderAndReqDateBetween(String id, Date startDate, Date endDate);

}
