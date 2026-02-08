package com.pg.management.service;

import com.pg.management.dto.StudentListDTO;
import com.pg.management.dto.StudentLoginRequest;
import com.pg.management.dto.StudentLoginResponse;
import com.pg.management.model.Room;
import com.pg.management.model.Student;
import com.pg.management.repository.RoomRepository;
import com.pg.management.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepo;
    private final RoomRepository roomRepo;

    public StudentService(StudentRepository studentRepo, RoomRepository roomRepo) {
        this.studentRepo = studentRepo;
        this.roomRepo = roomRepo;
    }

    public List<Student> getAllStudents(Boolean active) {
        return active == null
                ? studentRepo.findAll()
                : studentRepo.findByActive(active);
    }

    public Student getStudentById(Long id) {
        return studentRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found with id " + id)
                );
    }

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public Student createStudent(Student student) {
        student.setActive(true);

        // ✅ HASH PASSWORD
        student.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepo.save(student);
    }


    public Student updateStudent(Long id, Student updated) {
        Student student = getStudentById(id);
        student.setName(updated.getName());
        student.setEmail(updated.getEmail());
        student.setPhone(updated.getPhone());
        return studentRepo.save(student);
    }

    // Soft delete
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        student.setActive(false);
        studentRepo.save(student);
    }

    // ----------------------------
    // ASSIGN ROOM (Student-side)
    // ----------------------------
    public Student assignRoom(Long studentId, Long roomId) {
        Student student = getStudentById(studentId);

        Room newRoom = roomRepo.findById(roomId)
                .orElseThrow(() ->
                        new RuntimeException("Room not found with id " + roomId)
                );

        // Capacity check
        if (newRoom.getOccupiedBeds() >= newRoom.getCapacity()) {
            throw new RuntimeException("Room is full");
        }

        // Remove from old room
        if (student.getRoom() != null) {
            Room oldRoom = student.getRoom();
            oldRoom.setOccupiedBeds(oldRoom.getOccupiedBeds() - 1);
            roomRepo.save(oldRoom);
        }

        // Assign new room
        student.setRoom(newRoom);
        newRoom.setOccupiedBeds(newRoom.getOccupiedBeds() + 1);

        roomRepo.save(newRoom);
        return studentRepo.save(student);
    }

    // ----------------------------
    // REMOVE ROOM
    // ----------------------------
    public Student removeRoom(Long studentId) {
        Student student = getStudentById(studentId);
        Room room = student.getRoom();

        if (room != null) {
            room.setOccupiedBeds(room.getOccupiedBeds() - 1);
            roomRepo.save(room);
            student.setRoom(null);
        }

        return studentRepo.save(student);
    }

    public Room getRoomByStudentId(Long studentId) {
        return getStudentById(studentId).getRoom();
    }

    // Used by RoomController
    public List<Student> getStudentsByRoomId(Long roomId) {
        return studentRepo.findByRoom_Id(roomId);
    }

    // Used by Warden dashboard
    public List<StudentListDTO> getStudentsForWardenList() {
        return studentRepo.findAllForWardenList();
    }
    public StudentLoginResponse login(StudentLoginRequest request) {

        Student student = studentRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new StudentLoginResponse(student.getStudentId());
    }

}
