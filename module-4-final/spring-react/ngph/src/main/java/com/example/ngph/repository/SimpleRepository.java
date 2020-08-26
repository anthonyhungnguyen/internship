package com.example.ngph.repository;

import com.example.ngph.model.ErrorMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimpleRepository extends JpaRepository<ErrorMessage, Long> {
}
