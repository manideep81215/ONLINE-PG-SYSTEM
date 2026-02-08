package com.pg.management.service;

import com.pg.management.model.Room;
import com.pg.management.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepo;

    public RoomService(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    // ✅ Room ID → Room Number
    public Long getRoomNumberById(Long roomId) {
        return roomRepo.findById(roomId)
                .map(Room::getRoomNumber)
                .orElseThrow(() ->
                        new RuntimeException("Room not found with id " + roomId)
                );
    }

    // ✅ Room Number → Room
    public Room getRoomByRoomNumber(Long roomNumber) {
        return roomRepo.findByRoomNumber(roomNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Room not found with room number " + roomNumber
                        )
                );
    }

    // ✅ Available rooms (computed automatically)
    public List<Room> getAvailableRooms() {
        return roomRepo.findAll()
                .stream()
                .filter(Room::isAvailable)
                .toList();
    }
}
