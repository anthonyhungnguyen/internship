package com.example.demo.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "user_pay_app")
public class UserPayApp {
    @Id
    private int id;

    @Column(name = "user_id")
    @NotNull
    private String userId;

    @Column(name = "app_id")
    @NotNull
    private int appId;

    @Column(name = "total_amount")
    private double totalAmount;

}
