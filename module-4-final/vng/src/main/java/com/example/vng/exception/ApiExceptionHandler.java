package com.example.vng.exception;

import com.example.vng.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleNotFound(Exception ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }
}
