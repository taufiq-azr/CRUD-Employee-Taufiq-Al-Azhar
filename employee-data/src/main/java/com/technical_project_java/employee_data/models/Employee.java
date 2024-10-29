package com.technical_project_java.employee_data.models;

import com.technical_project_java.employee_data.models.converters.GenderConverter;
import com.technical_project_java.employee_data.models.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nik;

    private String fullName;

    private Integer age;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Convert(converter = GenderConverter.class)
    private Gender gender;

    private String address;

    private String country;
}
