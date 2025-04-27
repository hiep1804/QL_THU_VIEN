package com.example.sr.dto;

public class ThongBaoDTO {
    private String loai;
    private int id;
    public ThongBaoDTO() {}
    public ThongBaoDTO(String loai, int id) {
        this.loai = loai;
        this.id = id;
    }

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
