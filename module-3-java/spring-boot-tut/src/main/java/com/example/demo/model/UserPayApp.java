package com.example.demo.model;

import javax.persistence.*;

import lombok.Data;

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
	private String userId;

	@Column(name = "app_id")
	private int appId;

	@Column(name = "total_amount")
	private double totalAmount;

}
