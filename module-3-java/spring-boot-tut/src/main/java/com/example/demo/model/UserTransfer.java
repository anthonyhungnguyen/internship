package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user_transfer")
public class UserTransfer {
    @Id
    @GeneratedValue
    private String id;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "trans_id")
    private String transId;

    @Column(name = "req_date")
    private Date reqDate;

    @Column(name = "amount")
    private double amount;

}
