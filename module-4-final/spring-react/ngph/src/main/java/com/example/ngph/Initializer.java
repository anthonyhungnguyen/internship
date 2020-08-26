package com.example.ngph;

import com.example.ngph.model.Event;
import com.example.ngph.model.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.ngph.repository.GroupRepository;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {
    private final GroupRepository repository;
    @Autowired
    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("A", "B", "C", "D").forEach(n -> repository.save(new Group(n)));
        Group A = repository.findByName("A");
        Event e = Event.builder().title("Full Stack Reactive").description(
                "Reactive with Spring Boot + React").date(Instant.now()).build();
        A.setEvents(Collections.singleton(e));
        repository.save(A);
        repository.findAll().forEach(System.out::println);
    }
}
