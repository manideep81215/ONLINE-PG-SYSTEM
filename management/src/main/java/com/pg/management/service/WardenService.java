package com.pg.management.service;

import com.pg.management.model.Room;
import com.pg.management.model.Student;
import com.pg.management.model.Warden;
import com.pg.management.repository.RoomRepository;
import com.pg.management.repository.StudentRepository;
import com.pg.management.repository.WardenRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WardenService {

    private final WardenRepository wardenRepo;
    private final StudentRepository studentRepo;
    private final RoomRepository roomRepo;

    public WardenService(
            WardenRepository wardenRepo,
            StudentRepository studentRepo,
            RoomRepository roomRepo
    ) {
        this.wardenRepo = wardenRepo;
        this.studentRepo = studentRepo;
        this.roomRepo = roomRepo;
    }

    // ----------------------------
    // GET all wardens
    // ----------------------------
    public List<Warden> getAllWardens() {
        return wardenRepo.findAll();
    }

    // ----------------------------
    // CREATE warden
    // ----------------------------
    public Warden createWarden(Warden warden) {
        return wardenRepo.save(warden);
    }

    // ----------------------------
    // ASSIGN room to student
    // ----------------------------
    public Student assignRoomToStudent(
            Long wardenId,
            Long studentId,
            Long roomNumber
    ) {

        // 1️⃣ Warden
        Warden warden = wardenRepo.findById(wardenId)
                .orElseThrow(() -> new RuntimeException("Warden not found"));

        // 2️⃣ Student
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 3️⃣ Room — ✅ FIND BY ROOM NUMBER (FIX)
        Room room = roomRepo.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // 4️⃣ Block authorization
        if (!room.getBlock().equalsIgnoreCase(warden.getBlockAssigned())) {
            throw new RuntimeException(
                    "Warden not allowed to assign rooms outside their block"
            );
        }

        // 5️⃣ Capacity check
        if (room.getOccupiedBeds() >= room.getCapacity()) {
            throw new RuntimeException("Room is already full");
        }

        // 6️⃣ Remove student from old room
        if (student.getRoom() != null) {
            Room oldRoom = student.getRoom();
            oldRoom.setOccupiedBeds(oldRoom.getOccupiedBeds() - 1);
            roomRepo.save(oldRoom);
        }

        // 7️⃣ Assign new room
        student.setRoom(room);
        room.setOccupiedBeds(room.getOccupiedBeds() + 1);

        roomRepo.save(room);
        return studentRepo.save(student);
    }
    @PostConstruct
    public void debugRooms() {
        roomRepo.findAll().forEach(r ->
                System.out.println("ROOM FROM APP = " + r.getRoomNumber())
        );
    }
    public Student deassignRoomFromStudent(Long wardenId, Long studentId) {

        // 1️⃣ Validate warden
        Warden warden = wardenRepo.findById(wardenId)
                .orElseThrow(() -> new RuntimeException("Warden not found"));

        // 2️⃣ Validate student
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 3️⃣ Check if room assigned
        if (student.getRoom() == null) {
            throw new RuntimeException("Student has no room assigned");
        }

        Room room = student.getRoom();

        // 4️⃣ Decrease occupied beds safely
        if (room.getOccupiedBeds() > 0) {
            room.setOccupiedBeds(room.getOccupiedBeds() - 1);
        }

        // 5️⃣ Remove room from student
        student.setRoom(null);

        // 6️⃣ Save updates
        roomRepo.save(room);
        return studentRepo.save(student);
    }

    public void deleteStudent(Long wardenId, Long studentId) {

    // 1. Validate warden exists
    Warden warden = wardenRepo.findById(wardenId)
            .orElseThrow(() -> new RuntimeException("Warden not found"));

    // 2. Fetch student
    Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    // 3. If student has a room, update room occupancy
    Room room = student.getRoom();
    if (room != null) {
        room.setOccupiedBeds(room.getOccupiedBeds() - 1);
        student.setRoom(null);
        roomRepo.save(room);
    }

    // 4. Delete student
    studentRepo.delete(student);
}


}
