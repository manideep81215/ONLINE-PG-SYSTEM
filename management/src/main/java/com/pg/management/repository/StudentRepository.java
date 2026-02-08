package com.pg.management.repository;

import com.pg.management.dto.StudentListDTO;
import com.pg.management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // =============================
    // BASIC QUERIES
    // =============================

    List<Student> findByActive(Boolean active);

    Optional<Student> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByAadharNumber(Long aadharNumber);

    // =============================
    // ROOM-BASED QUERIES
    // =============================

    // After Room.id is PK
    List<Student> findByRoom_Id(Long roomId);

    // =============================
    // DTO QUERIES (WARDEN DASHBOARD)
    // =============================

    @Query("""
        SELECT new com.pg.management.dto.StudentListDTO(
            s.studentId,
            s.name,
            r.roomNumber
        )
        FROM Student s
        LEFT JOIN s.room r
    """)
    List<StudentListDTO> findAllForList();

    @Query("""
        SELECT new com.pg.management.dto.StudentListDTO(
            s.studentId,
            s.name,
            r.roomNumber
        )
        FROM Student s
        LEFT JOIN s.room r
    """)
    List<StudentListDTO> findAllForWardenList();
}
