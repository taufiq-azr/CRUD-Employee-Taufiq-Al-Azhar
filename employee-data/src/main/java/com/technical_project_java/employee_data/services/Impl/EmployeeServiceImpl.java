package com.technical_project_java.employee_data.services.Impl;

import com.technical_project_java.employee_data.DTO.EmployeeDTO;
import com.technical_project_java.employee_data.exception.NotFoundException;
import com.technical_project_java.employee_data.models.Employee;
import com.technical_project_java.employee_data.models.converters.GenderConverter;
import com.technical_project_java.employee_data.models.enums.Gender;
import com.technical_project_java.employee_data.repository.EmployeeRepository;
import com.technical_project_java.employee_data.services.IServiceEmployee;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements IServiceEmployee {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

    private EmployeeDTO convertToEmployeeDTO(Employee employee) {
        EmployeeDTO employeeDTO = modelMapper.map(employee, EmployeeDTO.class);

        // Set formatted birthDate
        if (employee.getBirthDate() != null) {
            employeeDTO.setBirthDate(dateFormat.format(employee.getBirthDate()));
        }

        if (employee.getGender() != null) {
            employeeDTO.setGender(employee.getGender().getLabel());
        } else {
            employeeDTO.setGender(null);
        }

        return employeeDTO;
    }

    // Convert DTO to Entity
    private Employee convertToEntity(EmployeeDTO employeeDTO) throws ParseException {
        Employee employee = modelMapper.map(employeeDTO, Employee.class);

        if (employeeDTO.getBirthDate() != null && !employeeDTO.getBirthDate().isEmpty()) {
            Date birthDate = dateFormat.parse(employeeDTO.getBirthDate());
            employee.setBirthDate(birthDate);
        }
        if (employeeDTO.getGender() != null && !employeeDTO.getGender().isEmpty()) {
            GenderConverter genderConverter = new GenderConverter();
            Gender gender = genderConverter.convertToEntityAttribute(employeeDTO.getGender());
            employee.setGender(gender);
        }

        return employee;
    }


    @Override
    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        try {
            Employee employee = convertToEntity(employeeDTO);
            Employee savedEmployee = employeeRepository.save(employee);
            return convertToEmployeeDTO(savedEmployee);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format", e);
        }
    }

    @Override
    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee with id " + id + " not found"));

        // Cek apakah NIK yang baru sudah ada di database
        if (employeeDTO.getNik() != null && !employeeDTO.getNik().equals(employee.getNik())) {
            if (employeeRepository.existsByNik(employeeDTO.getNik())) {
                throw new IllegalArgumentException("NIK already exists");
            }
        }

        try {
            employee.setNik(employeeDTO.getNik());
            employee.setFullName(employeeDTO.getFullName());
            employee.setAge(employeeDTO.getAge());

            if (employeeDTO.getBirthDate() != null && !employeeDTO.getBirthDate().isEmpty()) {
                employee.setBirthDate(dateFormat.parse(employeeDTO.getBirthDate()));
            }

            if (employeeDTO.getGender() != null) {
                // Use the GenderConverter to convert label to Gender enum
                GenderConverter genderConverter = new GenderConverter();
                employee.setGender(genderConverter.convertToEntityAttribute(employeeDTO.getGender()));
            }

            employee.setAddress(employeeDTO.getAddress());
            employee.setCountry(employeeDTO.getCountry());

            Employee updatedEmployee = employeeRepository.save(employee);
            return convertToEmployeeDTO(updatedEmployee);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format", e);
        }
    }


    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee with id " + id + " not found"));

        employeeRepository.delete(employee);
    }

    @Override
    public List<EmployeeDTO> getEmployeeByNIK(String nik) {
        List<Employee> employee = employeeRepository.findByNik(nik);

        if (employee == null) {
            throw new NotFoundException("Employee with nik " + nik + " not found" );
        } else {
            return employee.stream().map(this::convertToEmployeeDTO).collect(Collectors.toList());
        }
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Employee with id " + id + " not found")
        );

        return convertToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getEmployeeByName(String partialName) {
        List<Employee> employees = employeeRepository.findByFullNameContainingIgnoreCase(partialName);

        if (employees.isEmpty()) {
            throw new NotFoundException("Employee with name " + partialName + " not found");
        } else {
            return employees
                    .stream()
                    .map(this::convertToEmployeeDTO)
                    .collect(Collectors.toList());
        }
    }

    @Override
    public List<EmployeeDTO> getEmployeeByNIKAndName(String nik, String name) {
        List<Employee> employees = employeeRepository.findByNikAndFullNameContainingIgnoreCase(nik, name);

        if (employees.isEmpty()) {
            throw new NotFoundException("Employee not found with NIK: " + nik + " and Name part: " + name);
        }

        return employees.stream()
                .map(this::convertToEmployeeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToEmployeeDTO)
                .collect(Collectors.toList());
    }


}
