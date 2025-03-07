package com.Bank.BankSystem.service;

import com.Bank.BankSystem.entity.Policy;
import com.Bank.BankSystem.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    private final String UPLOAD_DIR = "C:\\Users\\ADMIN\\Downloads\\pdf_policy_files";

    public String uploadPolicy(MultipartFile file, String policyName, String policyDateStr, String policyType, boolean storeInDatabase) throws IOException {
        Policy policy = new Policy();
        policy.setPolicyName(policyName);
        policy.setPolicyDate(parseDate(policyDateStr));
        policy.setUploadDate(new Date(System.currentTimeMillis()));
        policy.setPolicyType(policyType);

        if (storeInDatabase) {
            policy.setPolicyData(file.getBytes());
        } else {
            Path path = Path.of(UPLOAD_DIR, file.getOriginalFilename());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            policy.setFilePath(path.toString());
        }

        policyRepository.save(policy);
        return "Policy uploaded successfully!";
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(Long id) {
        return policyRepository.findById(id);
    }

    public List<Policy> searchPolicies(String policyName, String policyType, String fromDateStr, String toDateStr) {
        Date fromDate = parseDate(fromDateStr);
        Date toDate = parseDate(toDateStr);

        return policyRepository.searchPolicies(
                (policyName != null && !policyName.equals("all")) ? policyName : null,
                (policyType != null && !policyType.equals("all")) ? policyType : null,
                fromDate,
                toDate);
    }

    private Date parseDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) return null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return new Date(sdf.parse(dateStr).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
