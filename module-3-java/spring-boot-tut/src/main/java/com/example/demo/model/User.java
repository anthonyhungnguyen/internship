package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The type User.
 */
@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue
    private String id;
}
