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
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // =============================
    // AUTH
    // =============================
    // POST /api/students/login
    @PostMapping("/login")
    public StudentLoginResponse login(@RequestBody StudentLoginRequest request) {
        return studentService.login(request);
    }

    // =============================
    // WARDEN DASHBOARD
    // =============================
    // GET /api/students/warden-list
    @GetMapping("/warden-list")
    public List<StudentListDTO> getStudentsForWarden() {
        return studentService.getStudentsForWardenList();
    }

    // =============================
    // STUDENT CRUD
    // =============================

    // GET /api/students
    @GetMapping
    public List<Student> getStudents(@RequestParam(required = false) Boolean active) {
        return studentService.getAllStudents(active);
    }

    // GET /api/students/{id}
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // POST /api/students
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    // PUT /api/students/{id}
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // DELETE /api/students/{id}
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    // =============================
    // ROOM MANAGEMENT
    // =============================

    // PUT /api/students/{id}/assign-room/{roomId}
    @PutMapping("/{id}/assign-room/{roomId}")
    public Student assignRoom(@PathVariable Long id,
                              @PathVariable Long roomId) {
        return studentService.assignRoom(id, roomId);
    }

    // GET /api/students/{id}/room
    @GetMapping("/{id}/room")
    public Room getRoomByStudent(@PathVariable Long id) {
        return studentService.getRoomByStudentId(id);
    }

    // PUT /api/students/{id}/remove-room
    @PutMapping("/{id}/remove-room")
    public Student removeRoom(@PathVariable Long id) {
        return studentService.removeRoom(id);
    }
}
