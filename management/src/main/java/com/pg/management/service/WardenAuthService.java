package com.pg.management.service;

import com.pg.management.dto.WardenLoginRequest;
import com.pg.management.dto.WardenLoginResponse;
import com.pg.management.model.Warden;
import com.pg.management.repository.WardenRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class WardenAuthService {

    private final WardenRepository wardenRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public WardenAuthService(WardenRepository wardenRepository) {
        this.wardenRepository = wardenRepository;
    }

    public WardenLoginResponse login(WardenLoginRequest request) {

        Warden warden = wardenRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(request.getPassword(), warden.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new WardenLoginResponse(
                warden.getWardenId(),
                warden.getName(),
                warden.getEmail(),
                warden.getBlockAssigned()
        );
    }
}
