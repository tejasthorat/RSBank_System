package com.Bank.BankSystem.repository;

import com.Bank.BankSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(String userId); // This will work with String type userId
    List<User> findByRole(String role);
    List<User> findByDepartment(String department);
    List<User> findByBranch(String branch);
}
