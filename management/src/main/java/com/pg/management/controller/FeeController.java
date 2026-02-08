package com.pg.management.controller;

import com.pg.management.dto.FeeWithStudentDTO;
import com.pg.management.model.Fee;
import com.pg.management.service.FeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    // STUDENT → current month fee
    @GetMapping("/student/{studentId}/current")
    public Fee getCurrentFee(@PathVariable Long studentId) {
        return feeService.getCurrentMonthFee(studentId);
    }

    // STUDENT → pay current month fee
    @PostMapping("/student/{studentId}/pay")
    public Fee payFee(@PathVariable Long studentId) {
        return feeService.payCurrentMonthFee(studentId);
    }

    // WARDEN → all students / all months
//    @GetMapping
//    public List<Fee> getAllFees() {
//        return feeService.getAllFees();
//    }

    @GetMapping
    public List<FeeWithStudentDTO> getAllFees() {
        return feeService.getAllFeesWithStudentNames();
    }

}
