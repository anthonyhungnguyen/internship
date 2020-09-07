package com.example.vng.utilities;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class TimestampConverter {
    private final ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
    public String convertTimestamp(String timestamp) {
        return LocalDateTime.ofInstant(Instant.ofEpochSecond(Long.parseLong(timestamp)), zoneId).toString();
    }
}
