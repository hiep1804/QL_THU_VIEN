package com.example.sr.dto;

public class ChatInputDTO {
    private String nd;
    private int nguoi_gui;
    private int nguoi_nhan;
    private String loai;

    public ChatInputDTO() {
    }

    public ChatInputDTO(String nd, int nguoi_gui, int nguoi_nhan, String loai) {
        this.nd = nd;
        this.nguoi_gui = nguoi_gui;
        this.nguoi_nhan = nguoi_nhan;
        this.loai = loai;
    }

    public String getNd() {
        return nd;
    }

    public void setNd(String nd) {
        this.nd = nd;
    }

    public int getNguoi_gui() {
        return nguoi_gui;
    }

    public void setNguoi_gui(int nguoi_gui) {
        this.nguoi_gui = nguoi_gui;
    }

    public int getNguoi_nhan() {
        return nguoi_nhan;
    }

    public void setNguoi_nhan(int nguoi_nhan) {
        this.nguoi_nhan = nguoi_nhan;
    }

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }

    @Override
    public String toString() {
        return "ChatInputDTO{" +
                "nd='" + nd + '\'' +
                ", nguoi_gui=" + nguoi_gui +
                ", nguoi_nhan=" + nguoi_nhan +
                ", loai='" + loai + '\'' +
                '}';
    }
}
