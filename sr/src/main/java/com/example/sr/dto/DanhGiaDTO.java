package com.example.sr.dto;

import java.time.LocalDateTime;

public class DanhGiaDTO {
    private int id_nguoi;
    private int id_sach;
    private String name;
    private String nd;
    private LocalDateTime time;

    public DanhGiaDTO() {
    }

    public DanhGiaDTO(int id_nguoi, int id_sach, String name, String nd, LocalDateTime time) {
        this.id_nguoi = id_nguoi;
        this.id_sach = id_sach;
        this.name = name;
        this.nd = nd;
        this.time = time;
    }

    public int getId_sach() {
        return id_sach;
    }

    public void setId_sach(int id_sach) {
        this.id_sach = id_sach;
    }

    public int getId_nguoi() {
        return id_nguoi;
    }

    public void setId_nguoi(int id_nguoi) {
        this.id_nguoi = id_nguoi;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNd() {
        return nd;
    }

    public void setNd(String nd) {
        this.nd = nd;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
