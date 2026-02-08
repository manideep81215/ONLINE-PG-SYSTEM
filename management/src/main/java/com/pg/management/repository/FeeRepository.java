package com.pg.management.repository;

import com.pg.management.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeeRepository extends JpaRepository<Fee, Long> {

    Optional<Fee> findByStudentIdAndMonthAndYear(
            Long studentId, int month, int year
    );

    List<Fee> findByStudentId(Long studentId);
}
