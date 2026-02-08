package com.pg.management.repository;

import com.pg.management.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByRoomNumber(Long roomNumber);
    List<Room> findByAvailable(boolean available);

    // ✔ Optional: available rooms by block
    List<Room> findByAvailableAndBlock(boolean available, String block);
}
