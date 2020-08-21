package com.example.demo.model;

import lombok.Data;

/**
 * The type Error message.
 */
@Data
public class ErrorMessage {
	private int statusCode;
	private String message;

	/**
	 * Instantiates a new Error message.
	 *
	 * @param statusCode
	 *            the status code
	 * @param message
	 *            the message
	 */
	public ErrorMessage(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
}
