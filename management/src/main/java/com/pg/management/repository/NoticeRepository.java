package com.pg.management.repository;

import com.pg.management.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    void deleteByCreatedAtBefore(LocalDateTime time);
}
