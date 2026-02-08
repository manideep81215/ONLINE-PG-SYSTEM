package com.pg.management.dto;

public class WardenLoginResponse {

    private Long wardenId;
    private String name;
    private String email;
    private String blockAssigned;
    private String role = "WARDEN";

    public WardenLoginResponse(Long wardenId, String name, String email, String blockAssigned) {
        this.wardenId = wardenId;
        this.name = name;
        this.email = email;
        this.blockAssigned = blockAssigned;
    }

    public Long getWardenId() {
        return wardenId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getBlockAssigned() {
        return blockAssigned;
    }

    public String getRole() {
        return role;
    }
}
