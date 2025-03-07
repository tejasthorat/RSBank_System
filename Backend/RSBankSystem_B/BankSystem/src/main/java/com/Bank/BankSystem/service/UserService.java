package com.Bank.BankSystem.service;

import com.Bank.BankSystem.entity.User;
import com.Bank.BankSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "User already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    public Map<String, Object> login(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        Map<String, Object> response = new HashMap<>();
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            response.put("success", true);
            response.put("message", "Login successful!");
            response.put("user", existingUser.get());
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials!");
        }
        return response;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public List<User> getUsersByDepartment(String department) {
        return userRepository.findByDepartment(department);
    }

    public List<User> getUsersByBranch(String branch) {
        return userRepository.findByBranch(branch);
    }

    // Update user details including role, name, department, branch, etc.
    public String updateUser(String userId, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findByUserId(userId);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            // Update all user fields
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setDepartment(updatedUser.getDepartment());
            existingUser.setBranch(updatedUser.getBranch());
            existingUser.setUserId(updatedUser.getUserId());  // Set userId manually if needed

            // Save updated user
            userRepository.save(existingUser);

            return "User updated successfully!";
        } else {
            return "User not found!";
        }
    }

}
