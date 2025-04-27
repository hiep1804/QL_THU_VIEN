package com.example.sr.dto;

import java.time.LocalDateTime;

public class LichSuDTO {
    private String name;
    private LocalDateTime ngayMuon;
    private LocalDateTime ngayTra;
    private String trangThai;

    public LichSuDTO() {
    }

    public LichSuDTO(String name, LocalDateTime ngayMuon, LocalDateTime ngayTra, String trangThai) {
        this.name = name;
        this.ngayMuon = ngayMuon;
        this.ngayTra = ngayTra;
        this.trangThai = trangThai;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getNgayMuon() {
        return ngayMuon;
    }

    public void setNgayMuon(LocalDateTime ngayMuon) {
        this.ngayMuon = ngayMuon;
    }

    public LocalDateTime getNgayTra() {
        return ngayTra;
    }

    public void setNgayTra(LocalDateTime ngayTra) {
        this.ngayTra = ngayTra;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}
