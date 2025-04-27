package com.example.sr.dto;

public class SachDTO {
    private int id;
    private String name;
    private int sl;
    private String danhMuc;
    private String tacGia;
    private String avt;

    public SachDTO() {
    }

    public SachDTO(int id, String name, int sl, String danhMuc, String tacGia, String avt) {
        this.id = id;
        this.name = name;
        this.sl = sl;
        this.danhMuc = danhMuc;
        this.tacGia = tacGia;
        this.avt = avt;
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

    public int getSl() {
        return sl;
    }

    public void setSl(int sl) {
        this.sl = sl;
    }

    public String getDanhMuc() {
        return danhMuc;
    }

    public void setDanhMuc(String danhMuc) {
        this.danhMuc = danhMuc;
    }

    public String getTacGia() {
        return tacGia;
    }

    public void setTacGia(String tacGia) {
        this.tacGia = tacGia;
    }

    public String getAvt() {
        return avt;
    }

    public void setAvt(String avt) {
        this.avt = avt;
    }
}
