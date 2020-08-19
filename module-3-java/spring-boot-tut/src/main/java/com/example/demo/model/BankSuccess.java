package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "bank_success")
public class BankSuccess {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "bank_code")
    private String bankCode;

    @Column(name = "recorded_date")
    private Date recordedDate;

    @Column(name = "success_trans")
    private int successTrans;

    @Column(name = "total_trans")
    private int totalTrans;

    @Column(name = "success_rate")
    private double successRate;

}
