package com.technical_project_java.employee_data.config;

import com.technical_project_java.employee_data.DTO.EmployeeDTO;
import com.technical_project_java.employee_data.models.Employee;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.typeMap(Employee.class, EmployeeDTO.class).addMappings(mapper ->
                mapper.map(src -> src.getGender() != null ? src.getGender().getLabel() : null, EmployeeDTO::setGender)
        );

        return modelMapper;
    }
}
