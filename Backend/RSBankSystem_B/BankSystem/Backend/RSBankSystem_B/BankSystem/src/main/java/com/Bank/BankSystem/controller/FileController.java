package com.Bank.BankSystem.controller;

import com.Bank.BankSystem.entity.FileEntity;
import com.Bank.BankSystem.service.FileService;
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
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // Upload File
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("circularNumber") String circularNumber,
            @RequestParam("circularDate") String circularDate,
            @RequestParam("circularType") String circularType,
            @RequestParam("storeInDatabase") boolean storeInDatabase) {
        try {
            String message = fileService.uploadFile(file, circularNumber, circularDate, circularType, storeInDatabase);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed!");
        }
    }

    // Get All Files
    @GetMapping("/all")
    public ResponseEntity<List<FileEntity>> getAllFiles() {
        return ResponseEntity.ok(fileService.getAllFiles());
    }

    // View File
    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewFile(@PathVariable Long id) {
        Optional<FileEntity> fileOptional = fileService.getFileById(id);

        if (fileOptional.isPresent()) {
            FileEntity fileEntity = fileOptional.get();
            byte[] fileData = fileEntity.getPdfData();

            if (fileData == null) {
                try {
                    Path filePath = Paths.get(fileEntity.getFilePath());
                    fileData = Files.readAllBytes(filePath);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                    .body(fileData);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Search Files
    @GetMapping("/search")
    public ResponseEntity<List<FileEntity>> searchFiles(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String circularNumber,
            @RequestParam(required = false) String circularType,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate) {
        return ResponseEntity.ok(fileService.searchFiles(title, circularNumber, circularType, fromDate, toDate));
    }
}
