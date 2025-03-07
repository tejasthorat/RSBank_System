package com.Bank.BankSystem.service;

import com.Bank.BankSystem.entity.FileEntity;
import com.Bank.BankSystem.repository.FileRepository;
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
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    private final String UPLOAD_DIR = "C:\\Users\\ADMIN\\Downloads\\pdf_files"; // ✅ Change as needed

    // ✅ Upload File
    public String uploadFile(MultipartFile file, String circularNumber, String circularDateStr, String circularType, boolean storeInDatabase) throws IOException {
        FileEntity fileEntity = new FileEntity();

        fileEntity.setCircularNumber(circularNumber); // Circular Number
        fileEntity.setTitle(file.getOriginalFilename()); // File Name as Title
        fileEntity.setCircularDate(parseDate(circularDateStr)); // Convert String to SQL Date
        fileEntity.setUploadDate(new Date(System.currentTimeMillis())); // Current Timestamp
        fileEntity.setCircularType(circularType); // Set the circular type

        // ✅ Store file in DB or File System
        if (storeInDatabase) {
            fileEntity.setPdfData(file.getBytes());
        } else {
            Path path = Path.of(UPLOAD_DIR, file.getOriginalFilename());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            fileEntity.setFilePath(path.toString());
        }

        fileRepository.save(fileEntity);
        return "File uploaded successfully!";
    }

    // ✅ Get All Files
    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    // ✅ Get File By ID
    public Optional<FileEntity> getFileById(Long id) {
        return fileRepository.findById(id);
    }

    // ✅ Search Files with multiple criteria
    public List<FileEntity> searchFiles(String title, String circularNumber, String circularType, String fromDateStr, String toDateStr) {
        Date fromDate = parseDate(fromDateStr); // Convert from date to SQL Date
        Date toDate = parseDate(toDateStr);     // Convert to date to SQL Date
        return fileRepository.searchFiles(
                (title != null && !title.equals("all")) ? title : null,
                (circularNumber != null && !circularNumber.equals("all")) ? circularNumber : null,
                (circularType != null && !circularType.equals("all")) ? circularType : null,
                fromDate,
                toDate);
    }


    // ✅ Convert String to java.sql.Date
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
