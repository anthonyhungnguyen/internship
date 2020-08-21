package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.example.demo.model.ErrorMessage;

/**
 * The type Api exception handler.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

	/**
	 * Handle all messages error message.
	 *
	 * @param ex
	 *            the ex
	 * @param request
	 *            the request
	 * @return the error message
	 */
	@ExceptionHandler(Exception.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorMessage handleAllMessages(Exception ex, WebRequest request) {
		return new ErrorMessage(404, ex.getLocalizedMessage());
	}
}