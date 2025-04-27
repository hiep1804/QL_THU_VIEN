package com.example.sr.dto;

import java.time.LocalDateTime;

public class DuyetDonThuThu {
    private int i;
    private int id;
    private String noiDung;
    private LocalDateTime date;
    private String loai;

    public DuyetDonThuThu() {
    }

    public DuyetDonThuThu(int i, int id, String noiDung, LocalDateTime date, String loai) {
        this.i = i;
        this.id = id;
        this.noiDung = noiDung;
        this.date = date;
        this.loai = loai;
    }

    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
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

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }
}
