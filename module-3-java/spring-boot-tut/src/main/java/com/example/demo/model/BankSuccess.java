package com.example.demo.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Data
@Table(name = "bank_success")
public class BankSuccess {

    @Id
    @GeneratedValue
    private int id;

    private String bank_code;

//    @ManyToOne
//    @JoinColumn(name = "bank_code")
//    private Bank bank_code;

    private Date recorded_date;
    private int success_trans;
    private int total_trans;
    private double success_rate;

    public String getBank_code() {
        return bank_code;
    }
}
