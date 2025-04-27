package com.example.sr.dto;

public class DanhGiaInputDto {
    private int id_nguoi;
    private int id_sach;
    private String nd;

    public DanhGiaInputDto() {
    }

    public int getId_nguoi() {
        return id_nguoi;
    }

    public void setId_nguoi(int id_nguoi) {
        this.id_nguoi = id_nguoi;
    }

    public int getId_sach() {
        return id_sach;
    }

    public void setId_sach(int id_sach) {
        this.id_sach = id_sach;
    }

    public String getNd() {
        return nd;
    }

    public void setNd(String nd) {
        this.nd = nd;
    }

    public DanhGiaInputDto(int id_nguoi, int id_sach, String nd) {
        this.id_nguoi = id_nguoi;
        this.id_sach = id_sach;
        this.nd = nd;
    }
}
