//package com.pg.management.config;
//
//import com.pg.management.model.Warden;
//import com.pg.management.repository.WardenRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    CommandLineRunner initWardens(WardenRepository wardenRepository) {
//        return args -> {
//
//            // prevent duplicate insert on restart
//            if (wardenRepository.findByEmail("warden1@pg.com").isPresent()) {
//                return;
//            }
//
//            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//
//            Warden warden = new Warden();
//            warden.setName("Madhu");
//            warden.setEmail("Madhu@gmail.com");
//            warden.setPassword(encoder.encode("Madhu"));
//            warden.setBlockAssigned("B");
//
//            wardenRepository.save(warden);
//
//            System.out.println("✅ Default warden created");
//        };
//    }
//}
