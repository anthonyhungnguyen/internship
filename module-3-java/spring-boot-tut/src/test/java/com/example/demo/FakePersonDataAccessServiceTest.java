package com.example.demo;


import com.example.demo.dao.FakePersonDataAccessService;
import com.example.demo.model.Person;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class FakePersonDataAccessServiceTest {
    private FakePersonDataAccessService underTest;

    @Before
    public void setUp() {
        underTest = new FakePersonDataAccessService();
    }

    @Test
    public void performCRUD() {
        UUID idOne = UUID.randomUUID();
        Person personOne = new Person(idOne, "James Bone");

        UUID idTwo = UUID.randomUUID();
        Person personTwo = new Person(idTwo, "Anna Smith");

        underTest.insertPerson(idOne, personOne);
        underTest.insertPerson(idTwo, personTwo);

        assertThat(underTest.selectPersonById(idOne)).isPresent().hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personOne));

        assertThat(underTest.selectPersonById(idTwo)).isPresent().hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personTwo));

        List<Person> people = underTest.selectAllPeople();
        assertThat(people).hasSize(2).usingFieldByFieldElementComparator().containsExactlyInAnyOrder(personOne, personTwo);

        Person personUpdate = new Person(idOne, "Jake Black");

        assertThat(underTest.updatePersonById(idOne, personUpdate)).isEqualTo(1);

        assertThat(underTest.selectPersonById(
                idOne
        )).isPresent().hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personUpdate));

        assertThat(underTest.deletePersonById(idOne)).isEqualTo(1);

        assertThat(underTest.selectPersonById(idOne)).isEmpty();

        assertThat(underTest.selectAllPeople()).hasSize(1).usingFieldByFieldElementComparator().containsExactlyInAnyOrder(personTwo);

    }

    @Test
    public void willReturn0IfNoPersonFoundToDelete() {
        UUID id = UUID.randomUUID();

    }
}
