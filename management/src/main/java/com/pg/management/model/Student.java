    package com.pg.management.model;
    
    import jakarta.persistence.*;
    
    @Entity
    @Table(name = "students")
    public class Student {
    
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long studentId;
    
        @Column(nullable = false)
        private String name;
    
        @Column(unique = true, nullable = false)
        private Long aadharNumber;
    
        @Column(unique = true, nullable = false)
        private String email;
    
        private String phone;
    
        // ✅ NEW: password (hashed)
        @Column(nullable = false)
        private String password;
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "room_id")
        private Room room;
    
        @Column(nullable = false)
        private Boolean active = true;
    
        public Student() {}
    
        // getters & setters
    
        public void setStudentId(Long studentId) {
            this.studentId = studentId;
        }
    
        public Boolean getActive() {
            return active;
        }
    
        public Long getStudentId() {
            return studentId;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public Long getAadharNumber() {
            return aadharNumber;
        }
    
        public void setAadharNumber(Long aadharNumber) {
            this.aadharNumber = aadharNumber;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public String getPhone() {
            return phone;
        }
    
        public void setPhone(String phone) {
            this.phone = phone;
        }
    
        // 🔴 password getter/setter
        public String getPassword() {
            return password;
        }
    
        public void setPassword(String password) {
            this.password = password;
        }
    
        public Room getRoom() {
            return room;
        }
    
        public void setRoom(Room room) {
            this.room = room;
        }
    
        public Boolean isActive() {
            return active;
        }
    
        public void setActive(Boolean active) {
            this.active = active;
        }
    }
