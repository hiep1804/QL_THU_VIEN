package com.example.sr.dto;

public class TimKiemDTO {
    private int id;
    private String name;

    public TimKiemDTO() {
    }

    public TimKiemDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
