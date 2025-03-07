package com.Bank.BankSystem.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String circularNumber;

    @Column
    private Date circularDate;

    @Column
    private Date uploadDate;

    @Lob
    private byte[] pdfData; // Store file content if stored in DB

    @Column
    private String filePath; // Path if stored in filesystem

    @Column(nullable = false)
    private String circularType; // Added field for circular type

    //  Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCircularNumber() { return circularNumber; }
    public void setCircularNumber(String circularNumber) { this.circularNumber = circularNumber; }

    public Date getCircularDate() { return circularDate; }
    public void setCircularDate(Date circularDate) { this.circularDate = circularDate; }

    public Date getUploadDate() { return uploadDate; }
    public void setUploadDate(Date uploadDate) { this.uploadDate = uploadDate; }

    public byte[] getPdfData() { return pdfData; }
    public void setPdfData(byte[] pdfData) { this.pdfData = pdfData; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getCircularType() { return circularType; }
    public void setCircularType(String circularType) { this.circularType = circularType; }
}
