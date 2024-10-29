package com.technical_project_java.employee_data.controllers;

import com.technical_project_java.employee_data.DTO.EmployeeDTO;
import com.technical_project_java.employee_data.config.ApiResponse;
import com.technical_project_java.employee_data.exception.NotFoundException;
import com.technical_project_java.employee_data.models.Employee;
import com.technical_project_java.employee_data.services.Impl.EmployeeServiceImpl;
import org.modelmapper.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "api/v1/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeService;

    @PostMapping(consumes = "application/json;charset=UTF-8")
    public ResponseEntity<ApiResponse<EmployeeDTO>> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.createEmployee(employeeDTO)));
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(
                    false,
                    "Validation Error: " + e.getMessage(),
                    400,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.updateEmployee(id, employeeDTO)));
        }catch (ValidationException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(
                    false,
                    "Validation Error: " + e.getMessage(),
                    400,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error with Message : " + e.getMessage(),
                    500,
                    null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    204,
                    null));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                    false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getAllEmployees() {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.getAllEmployee()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @GetMapping("/nik/{nik}")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getEmployeeByNIK(@PathVariable String nik) {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.getEmployeeByNIK(nik)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                    false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getEmployeeById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.getEmployeeById(id)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                    false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getEmployeeByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    employeeService.getEmployeeByName(name)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                    false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            // Handle other unexpected exceptions (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }

    @GetMapping("/find-by-nik-and-name")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getEmployeeByNIKAndName(
            @RequestParam(required = false) String nik,
            @RequestParam(required = false) String name) {
        try {
            List<EmployeeDTO> result;

            if (nik != null && name != null) {
                result = employeeService.getEmployeeByNIKAndName(nik, name);
            } else if (nik != null) {
                result = employeeService.getEmployeeByNIK(nik);
            } else if (name != null) {
                result = employeeService.getEmployeeByName(name);
            } else {
                result = employeeService.getAllEmployee();
            }

            return ResponseEntity.ok(new ApiResponse<>(
                    true,
                    "Success",
                    200,
                    result));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(
                    false,
                    "Employee Not Found with Error : " + e.getMessage(),
                    404,
                    null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
                    false,
                    "Internal Server Error",
                    500,
                    null));
        }
    }
}
