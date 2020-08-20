package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * The type User pay app.
 */
@Entity
@Data
@Table(name = "user_pay_app")
public class UserPayApp {
    @Id
    @GeneratedValue
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
