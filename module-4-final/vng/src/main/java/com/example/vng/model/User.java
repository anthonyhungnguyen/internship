package com.example.vng.model;

import com.arangodb.springframework.annotation.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Document("users")
@Getter
@Setter
@ToString
public class User {

    @Id
    private String id;

}
