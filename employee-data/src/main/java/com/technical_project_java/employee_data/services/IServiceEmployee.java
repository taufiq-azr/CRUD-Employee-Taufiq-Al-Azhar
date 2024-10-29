package com.technical_project_java.employee_data.services;

import com.technical_project_java.employee_data.DTO.EmployeeDTO;

import java.util.List;

public interface IServiceEmployee {

    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

    void deleteEmployee(Long id);

    List<EmployeeDTO> getEmployeeByNIK(String nik);

    EmployeeDTO getEmployeeById(Long id);

    List<EmployeeDTO> getEmployeeByName(String name);

    List<EmployeeDTO> getEmployeeByNIKAndName(String nik, String name);

    List<EmployeeDTO> getAllEmployee();

}
