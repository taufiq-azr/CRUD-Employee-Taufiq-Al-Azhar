package com.technical_project_java.employee_data.repository;

import com.technical_project_java.employee_data.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByNik(String nik);

    List<Employee> findByNikAndFullNameContainingIgnoreCase(String nik, String fullName);

    List<Employee> findByFullNameContainingIgnoreCase(String partialName);

    boolean existsByNik(String nik);
}
