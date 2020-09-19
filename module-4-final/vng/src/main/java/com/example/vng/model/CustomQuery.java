package com.example.vng.model;

import lombok.*;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomQuery {
    private String query;
    private Map<String, Object> bindVars;
    private Map<String, Object> options;
}
