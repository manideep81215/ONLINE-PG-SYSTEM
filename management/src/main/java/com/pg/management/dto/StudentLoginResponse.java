package com.pg.management.dto;

public class StudentLoginResponse {

    private Long studentId;
    private String role = "STUDENT";

    public StudentLoginResponse(Long studentId) {
        this.studentId = studentId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getRole() {
        return role;
    }
}
