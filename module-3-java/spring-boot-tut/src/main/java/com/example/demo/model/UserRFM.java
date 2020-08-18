package com.example.demo.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Data
@Table(name = "user_rfm")
public class UserRFM {
    @Id
    private int id;

    private String user_id;
    private Date recorded_date;
    private int recency;
    private int frequency;
    private double monetary;
    private int r_score;
    private int f_score;
    private int m_score;
    private String rfm_score;


    public String getUser_id() {
        return user_id;
    }
}
