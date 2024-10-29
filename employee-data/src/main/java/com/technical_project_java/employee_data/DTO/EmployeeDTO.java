package com.technical_project_java.employee_data.DTO;

import com.technical_project_java.employee_data.models.enums.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class EmployeeDTO {

    private Long id;
    private String nik;
    private String fullName;
    private Integer age;
    private String birthDate;
    private String gender;
    private String address;
    private String country;
}
