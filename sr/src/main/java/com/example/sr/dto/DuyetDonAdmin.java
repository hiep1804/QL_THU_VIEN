package com.example.sr.dto;

import java.time.LocalDateTime;

public class DuyetDonAdmin {
    private int i;
    private int id;
    private String noiDung;
    private LocalDateTime date;

    public DuyetDonAdmin(int id, String noiDung, LocalDateTime date) {
        this.id = id;
        this.noiDung = noiDung;
        this.date = date;
    }

    public DuyetDonAdmin() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
    }
}
