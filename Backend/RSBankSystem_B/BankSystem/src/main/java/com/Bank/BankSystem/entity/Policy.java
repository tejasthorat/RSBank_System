package com.Bank.BankSystem.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String policyName;

    @Column
    private Date policyDate;

    @Column
    private Date uploadDate;

    @Lob
    private byte[] policyData;

    @Column
    private String filePath;

    @Column(nullable = false)
    private String policyType;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public Date getPolicyDate() {
        return policyDate;
    }

    public void setPolicyDate(Date policyDate) {
        this.policyDate = policyDate;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public byte[] getPolicyData() {
        return policyData;
    }

    public void setPolicyData(byte[] policyData) {
        this.policyData = policyData;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }
}
