package com.pg.management.controller;

import com.pg.management.dto.WardenLoginRequest;
import com.pg.management.dto.WardenLoginResponse;
import com.pg.management.service.WardenAuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final WardenAuthService authService;

    public AuthController(WardenAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/warden/login")
    public WardenLoginResponse login(@RequestBody WardenLoginRequest request) {
        return authService.login(request);
    }
}
