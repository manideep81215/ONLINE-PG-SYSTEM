package com.pg.management.service;

import com.pg.management.dto.FeeWithStudentDTO;
import com.pg.management.model.Fee;
import com.pg.management.model.Student;
import com.pg.management.repository.FeeRepository;
import com.pg.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeeService {
    @Autowired
    private StudentRepository studentRepository;

    private final FeeRepository feeRepository;

    public FeeService(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    // 🔹 get or create current month fee
    public Fee getCurrentMonthFee(Long studentId) {

        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int year = today.getYear();

        return feeRepository
                .findByStudentIdAndMonthAndYear(studentId, month, year)
                .orElseGet(() -> {
                    Fee fee = new Fee();
                    fee.setStudentId(studentId);
                    fee.setMonth(month);
                    fee.setYear(year);
                    fee.setAmount(5000);
                    fee.setStatus("DUE");
                    fee.setDueDate(LocalDate.of(year, month, 10)); // example
                    return feeRepository.save(fee);
                });
    }

    // 🔹 pay fee
    public Fee payCurrentMonthFee(Long studentId) {
        Fee fee = getCurrentMonthFee(studentId);
        fee.setStatus("PAID");
        fee.setPaidAt(LocalDateTime.now());
        return feeRepository.save(fee);
    }

    // 🔹 warden view
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }
    public List<Fee> getAllFeesWithCurrentMonth() {

        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int year = today.getYear();

        List<Student> students = studentRepository.findAll(); // REQUIRED

        for (Student student : students) {
            feeRepository.findByStudentIdAndMonthAndYear(
                    student.getStudentId(), month, year
            ).orElseGet(() -> {
                Fee fee = new Fee();
                fee.setStudentId(student.getStudentId());
                fee.setMonth(month);
                fee.setYear(year);
                fee.setAmount(5000);
                fee.setStatus("DUE");
                fee.setDueDate(LocalDate.of(year, month, 10));
                return feeRepository.save(fee);
            });
        }

        return feeRepository.findAll();
    }
    public List<FeeWithStudentDTO> getAllFeesWithStudentNames() {

        List<Fee> fees = feeRepository.findAll();
        List<FeeWithStudentDTO> result = new ArrayList<>();

        for (Fee fee : fees) {

            Student student = studentRepository
                    .findById(fee.getStudentId())
                    .orElse(null);

            FeeWithStudentDTO dto = new FeeWithStudentDTO();
            dto.setMonth(fee.getMonth());
            dto.setYear(fee.getYear());
            dto.setAmount(fee.getAmount());
            dto.setStatus(fee.getStatus());
            dto.setPaidAt(fee.getPaidAt());

            if (student != null) {
                // 🔴 CHANGE THIS FIELD BASED ON YOUR ENTITY
                dto.setStudentName(student.getName());
            } else {
                dto.setStudentName("Unknown Student");
            }

            result.add(dto);
        }

        return result;
    }


}
