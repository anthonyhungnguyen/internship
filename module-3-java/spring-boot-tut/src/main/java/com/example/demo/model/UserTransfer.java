package com.example.demo.model;

import java.util.Date;

import javax.persistence.*;

import lombok.Data;

/**
 * The type User transfer.
 */
@Entity
@Data
@Table(name = "user_transfer")
public class UserTransfer {
	/**
	 * Auto Generated ID.
	 */
	@Id
	@GeneratedValue
	private String id;

	/**
	 * Sender ID.
	 */

	@Column(name = "sender")
	private String sender;

	/**
	 * Receiver ID.
	 */

	@Column(name = "receiver")
	private String receiver;

	/**
	 * Transfer ID.
	 */

	@Column(name = "trans_id")
	private String transId;

	/**
	 * Date Transfer.
	 */

	@Column(name = "req_date")
	private Date reqDate;

	/**
	 * Amount of Transfer Money.
	 */

	@Column(name = "amount")
	private double amount;

}
