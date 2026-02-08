package com.pg.management.controller;

import com.pg.management.dto.NoticeRequest;
import com.pg.management.model.Notice;
import com.pg.management.service.NoticeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // WARDEN → POST notice
    @PostMapping
    public ResponseEntity<Notice> createNotice(
            @RequestBody NoticeRequest request
    ) {
        return ResponseEntity.ok(
                noticeService.createNotice(request)
        );
    }

    // STUDENT → GET notices
    @GetMapping
    public ResponseEntity<List<Notice>> getNotices() {
        return ResponseEntity.ok(
                noticeService.getAllNotices()
        );
    }
}
