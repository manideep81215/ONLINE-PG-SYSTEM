package com.pg.management.repository;

import com.pg.management.model.Warden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WardenRepository extends JpaRepository<Warden, Long> {
    Optional<Warden> findByEmail(String email);
}
