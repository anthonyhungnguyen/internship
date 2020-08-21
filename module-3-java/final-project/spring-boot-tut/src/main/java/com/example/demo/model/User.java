package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

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
