package com.pg.management.scheduler;

import com.pg.management.repository.NoticeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NoticeCleanupScheduler {

    private final NoticeRepository noticeRepository;

    public NoticeCleanupScheduler(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    // Runs every 1 hour
    @Scheduled(cron = "0 0 * * * *")
    public void deleteOldNotices() {

        LocalDateTime cutoffTime = LocalDateTime.now().minusDays(1);

        noticeRepository.deleteByCreatedAtBefore(cutoffTime);

        System.out.println("🧹 Old notices cleaned up");
    }
}
