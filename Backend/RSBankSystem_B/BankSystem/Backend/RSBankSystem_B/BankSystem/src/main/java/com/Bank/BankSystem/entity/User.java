package com.Bank.BankSystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String name;
    private String password;
    private String role;
    private String department;
    private String branch;

    // Adding the new userId field
    @Column(unique = true, nullable = false)
    private String userId;

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
    public String getUserId() {
        return userId;
    }
    public String getDepartment() {
        return department;
    }
    public String getBranch() {
        return branch;
    }
    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setBranch(String branch) {
        this.branch = branch;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
