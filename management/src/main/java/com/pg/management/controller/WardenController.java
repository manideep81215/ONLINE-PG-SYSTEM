package com.pg.management.controller;

import com.pg.management.dto.AssignRoomRequest;
import com.pg.management.model.Student;
import com.pg.management.model.Warden;
import com.pg.management.service.WardenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wardens")

public class WardenController {

    private final WardenService wardenService;

    public WardenController(WardenService wardenService) {
        this.wardenService = wardenService;
    }

    @GetMapping
    public List<Warden> getAllWardens() {
        return wardenService.getAllWardens();
    }

    @PostMapping
    public Warden createWarden(@RequestBody Warden warden) {
        return wardenService.createWarden(warden);
    }

    // ✅ THIS IS THE ONLY ASSIGN ROOM METHOD
    @PutMapping("/{wardenId}/assign-room")
    public Student assignRoomToStudent(
            @PathVariable Long wardenId,
            @RequestBody AssignRoomRequest request
    ) {
        return wardenService.assignRoomToStudent(
                wardenId,
                request.getStudentId(),
                request.getRoomNumber()
        );
    }
    // ✅ DEASSIGN ROOM
    @PutMapping("/{wardenId}/deassign-room")
    public Student deassignRoomFromStudent(
            @PathVariable Long wardenId,
            @RequestBody AssignRoomRequest request
    ) {
        return wardenService.deassignRoomFromStudent(
                wardenId,
                request.getStudentId()
        );
    }

}
