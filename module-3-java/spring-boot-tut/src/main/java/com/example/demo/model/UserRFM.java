package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * The type User rfm.
 */
@Entity
@Data
@Table(name = "user_rfm")
public class UserRFM {

    @Id
    private int id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "recorded_date")
    private Date recordedDate;

    @Column(name = "recency")
    private int recency;

    @Column(name = "frequency")
    private int frequency;

    @Column(name = "monetary")
    private double monetary;

    @Column(name = "r_score")
    private int rScore;

    @Column(name = "f_score")
    private int fScore;

    @Column(name = "m_score")
    private int mScore;

    @Column(name = "rfm_score")
    private String rfmScore;
}
