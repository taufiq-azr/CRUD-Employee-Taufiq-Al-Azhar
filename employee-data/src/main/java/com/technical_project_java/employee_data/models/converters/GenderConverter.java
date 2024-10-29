package com.technical_project_java.employee_data.models.converters;

import com.technical_project_java.employee_data.models.enums.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {
    @Override
    public String convertToDatabaseColumn(Gender gender) {
        return gender != null ? gender.getLabel() : null;
    }

    @Override
    public Gender convertToEntityAttribute(String label) {
        if (label == null) {
            return null;
        }
        for (Gender gender : Gender.values()) {
            if (gender.getLabel().equalsIgnoreCase(label)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Unknown label: " + label);
    }
}

