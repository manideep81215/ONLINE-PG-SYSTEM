package com.pg.management.controller;

import com.pg.management.dto.StudentListDTO;
import com.pg.management.dto.StudentLoginRequest;
import com.pg.management.dto.StudentLoginResponse;
import com.pg.management.model.Room;
import com.pg.management.model.Student;
import com.pg.management.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // -----------------------------
    // ✅ WARDEN DASHBOARD LIST
    // -----------------------------
    @GetMapping("/warden-list")
    public List<StudentListDTO> getStudentsForWarden() {
        return studentService.getStudentsForWardenList();
    }
    @PostMapping("/login")
    public StudentLoginResponse login(@RequestBody StudentLoginRequest request) {
        return studentService.login(request);
    }

    // -----------------------------
    // EXISTING APIs
    // -----------------------------

    // GET /students?active=true
    @GetMapping
    public List<Student> getStudents(@RequestParam(required = false) Boolean active) {
        return studentService.getAllStudents(active);
    }

    // 🔴 IMPORTANT FIX HERE
    @GetMapping("/{id:\\d+}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id:\\d+}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id:\\d+}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/{id:\\d+}/assign-room/{roomId}")
    public Student assignRoom(@PathVariable Long id,
                              @PathVariable Long roomId) {
        return studentService.assignRoom(id, roomId);
    }

    @GetMapping("/{id:\\d+}/room")
    public Room getRoomByStudent(@PathVariable Long id) {
        return studentService.getRoomByStudentId(id);
    }

    @PutMapping("/{id:\\d+}/remove-room")
    public Student removeRoom(@PathVariable Long id) {
        return studentService.removeRoom(id);
    }

}
