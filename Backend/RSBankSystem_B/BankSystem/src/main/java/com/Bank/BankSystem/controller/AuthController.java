package com.Bank.BankSystem.controller;

import com.Bank.BankSystem.entity.User;
import com.Bank.BankSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // Validate if userId is provided
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            return "User ID cannot be null or empty!";
        }
        return userService.register(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        return userService.login(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userService.getUsersByRole(role);
    }

    @GetMapping("/users/department/{department}")
    public List<User> getUsersByDepartment(@PathVariable String department) {
        return userService.getUsersByDepartment(department);
    }

    @GetMapping("/users/branch/{branch}")
    public List<User> getUsersByBranch(@PathVariable String branch) {
        return userService.getUsersByBranch(branch);
    }

    // Endpoint to update user details
    @PutMapping("/updateUser/{userId}")
    public String updateUser(@PathVariable String userId, @RequestBody User updatedUser) {
        return userService.updateUser(userId, updatedUser);
    }

}
