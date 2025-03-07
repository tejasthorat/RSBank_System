package com.Bank.BankSystem.repository;

import com.Bank.BankSystem.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Query("SELECT p FROM Policy p WHERE " +
            "(:policyName IS NULL OR LOWER(p.policyName) LIKE LOWER(CONCAT('%', :policyName, '%'))) " +
            "AND (:policyType IS NULL OR LOWER(p.policyType) = LOWER(:policyType)) " +
            "AND (:fromDate IS NULL OR p.policyDate >= :fromDate) " +
            "AND (:toDate IS NULL OR p.policyDate <= :toDate)")
    List<Policy> searchPolicies(@Param("policyName") String policyName,
                                @Param("policyType") String policyType,
                                @Param("fromDate") Date fromDate,
                                @Param("toDate") Date toDate);
}
