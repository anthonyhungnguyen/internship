package com.example.demo.model;

import lombok.Data;

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

    @NotNull
    private String user_id;

    @NotNull
    private int app_id;

    private double total_amount;

    public String getUser_id() {
        return user_id;
    }
}
