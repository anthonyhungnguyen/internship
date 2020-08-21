package com.example.demo.model;

import java.util.Date;

import javax.persistence.*;

import lombok.Data;

/**
 * The type Bank success.
 */
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
