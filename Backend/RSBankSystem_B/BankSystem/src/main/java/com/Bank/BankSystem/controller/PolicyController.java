package com.Bank.BankSystem.controller;

import com.Bank.BankSystem.entity.Policy;
import com.Bank.BankSystem.service.PolicyService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    // ✅ Upload Policy
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPolicy(
            @RequestParam("file") MultipartFile file,
            @RequestParam("policyName") String policyName,
            @RequestParam("policyDate") String policyDate,
            @RequestParam("policyType") String policyType,
            @RequestParam("storeInDatabase") boolean storeInDatabase) {
        try {
            String message = policyService.uploadPolicy(file, policyName, policyDate, policyType, storeInDatabase);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Policy upload failed!");
        }
    }

    // ✅ Get All Policies
    @GetMapping("/all")
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // ✅ View Policy by ID
    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewPolicy(@PathVariable Long id) {
        Optional<Policy> policyOptional = policyService.getPolicyById(id);

        if (policyOptional.isPresent()) {
            Policy policy = policyOptional.get();
            byte[] policyData = policy.getPolicyData();

            if (policyData == null) {
                try {
                    Path filePath = Paths.get(policy.getFilePath());
                    policyData = Files.readAllBytes(filePath);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                    .body(policyData);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // ✅ Search Policies
    @GetMapping("/search")
    public ResponseEntity<List<Policy>> searchPolicies(
            @RequestParam(required = false) String policyName,
            @RequestParam(required = false) String policyType,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate) {
        return ResponseEntity.ok(policyService.searchPolicies(policyName, policyType, fromDate, toDate));
    }
}
