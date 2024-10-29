package com.technical_project_java.employee_data.models.enums;

public enum Gender {
    LAKI_LAKI("Laki-Laki"),
    PEREMPUAN("Perempuan");

    private final String label;

    Gender(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
