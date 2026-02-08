package com.pg.management.dto;

public class StudentListDTO {

    private Long studentId;
    private String name;
    private Long roomNumber;

    public StudentListDTO(Long studentId, String name, Long roomNumber) {
        this.studentId = studentId;
        this.name = name;
        this.roomNumber = roomNumber;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getName() {
        return name;
    }

    public Long getRoomNumber() {
        return roomNumber;
    }
}
