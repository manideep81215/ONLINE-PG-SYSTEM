package com.pg.management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Business identifier
    @Column(name = "room_number", nullable = false, unique = true)
    private Long roomNumber;

    @Column(nullable = false)
    private String block;

    @Column(nullable = false)
    private int capacity;

    @Column(name = "occupied_beds", nullable = false)
    private int occupiedBeds;

    // ❌ DO NOT STORE availability in DB
    // ✅ ALWAYS compute it
    @Transient
    public boolean isAvailable() {
        return occupiedBeds < capacity;
    }

    // ---------- getters & setters ----------

    public Long getId() {
        return id;
    }

    public Long getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Long roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getOccupiedBeds() {
        return occupiedBeds;
    }

    public void setOccupiedBeds(int occupiedBeds) {
        this.occupiedBeds = occupiedBeds;
    }
}
