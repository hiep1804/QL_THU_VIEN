package com.example.sr.dto;

import java.time.LocalDateTime;

public class YeuCauDTO {
    private int id;
    private LocalDateTime date;
    private String noiDung;

    public YeuCauDTO() {
    }

    public YeuCauDTO(LocalDateTime date, String noiDung) {
        this.date = date;
        this.noiDung = noiDung;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public YeuCauDTO(int id, LocalDateTime date, String noiDung) {
        this.id = id;
        this.date = date;
        this.noiDung = noiDung;
    }
}
