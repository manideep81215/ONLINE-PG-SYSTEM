package com.pg.management.controller;

import com.pg.management.dto.ComplaintRequest;
import com.pg.management.model.Complaint;
import com.pg.management.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // STUDENT → POST complaint
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(
            @RequestBody ComplaintRequest request
    ) {
        return ResponseEntity.ok(
                complaintService.createComplaint(request)
        );
    }

    // WARDEN → GET all complaints
    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(
                complaintService.updateStatus(id, status)
        );
    }

}
