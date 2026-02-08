package com.pg.management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wardens")
public class Warden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wardenId;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;   // 🔐 added

    private String phone;

    @Column(nullable = false)
    private String blockAssigned;

    // Constructors
    public Warden() {}

    public Warden(String name, String email, String password, String blockAssigned) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.blockAssigned = blockAssigned;
    }

    // Getters & Setters
    public Long getWardenId() {
        return wardenId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // 🔐 Password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBlockAssigned() {
        return blockAssigned;
    }

    public void setBlockAssigned(String blockAssigned) {
        this.blockAssigned = blockAssigned;
    }
}
