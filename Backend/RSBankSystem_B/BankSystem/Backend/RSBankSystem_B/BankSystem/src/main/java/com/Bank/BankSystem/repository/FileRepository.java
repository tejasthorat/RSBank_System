package com.Bank.BankSystem.repository;

import com.Bank.BankSystem.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findByTitleContainingIgnoreCase(String title);

    List<FileEntity> findByCircularNumberContainingIgnoreCase(String circularNumber);

    @Query("SELECT f FROM FileEntity f WHERE " +
            "(:title IS NULL OR LOWER(f.title) LIKE LOWER(CONCAT('%', :title, '%'))) " +
            "AND (:circularNumber IS NULL OR LOWER(f.circularNumber) LIKE LOWER(CONCAT('%', :circularNumber, '%'))) " +
            "AND ((" +
            "     :circularType = 'Other' AND f.circularType NOT IN ('Loan', 'Account', 'Admin','Computer', 'RBI','Audit')" +
            ") OR (:circularType IS NULL OR :circularType = '' OR LOWER(f.circularType) = LOWER(:circularType))) " +
            "AND (:fromDate IS NULL OR f.circularDate >= :fromDate) " +
            "AND (:toDate IS NULL OR f.circularDate <= :toDate)")

    List<FileEntity> searchFiles(@Param("title") String title,
                                 @Param("circularNumber") String circularNumber,
                                 @Param("circularType") String circularType,
                                 @Param("fromDate") Date fromDate,
                                 @Param("toDate") Date toDate);


}
