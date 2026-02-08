package com.pg.management.controller;

import com.pg.management.model.Room;
import com.pg.management.model.Student;
import com.pg.management.repository.RoomRepository;
import com.pg.management.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {

    private final RoomRepository roomRepo;
    private final StudentService studentService;

    public RoomController(RoomRepository roomRepo, StudentService studentService) {
        this.roomRepo = roomRepo;
        this.studentService = studentService;
    }

    // GET /api/rooms?available=true
    @GetMapping
    public List<Room> getRooms(@RequestParam(required = false) Boolean available) {
        return available == null
                ? roomRepo.findAll()
                : roomRepo.findByAvailable(available);
    }

    // POST /api/rooms
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepo.save(room);
    }

    // ✅ GET students by ROOM ID (PRIMARY KEY)
    // /api/rooms/{roomId}/students
    @GetMapping("/{roomId}/students")
    public List<Student> getStudentsByRoomId(@PathVariable Long roomId) {
        return studentService.getStudentsByRoomId(roomId);
    }

    // ✅ OPTIONAL: GET students by ROOM NUMBER (business key)
    // /api/rooms/number/{roomNumber}/students
    @GetMapping("/number/{roomNumber}/students")
    public List<Student> getStudentsByRoomNumber(@PathVariable Long roomNumber) {
        Room room = roomRepo.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new RuntimeException("Room not found with number " + roomNumber));

        return studentService.getStudentsByRoomId(room.getId());
    }
}
