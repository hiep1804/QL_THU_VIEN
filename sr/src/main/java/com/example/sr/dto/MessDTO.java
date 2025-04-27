package com.example.sr.dto;

import java.time.LocalDateTime;

public class MessDTO {
    private int id_gui;
    private int id_nhan;
    private String nd;
    private LocalDateTime time;
    private String loai;

    public MessDTO() {
    }

    public MessDTO(int id_gui, int id_nhan, String nd, LocalDateTime time, String loai) {
        this.id_gui = id_gui;
        this.id_nhan = id_nhan;
        this.nd = nd;
        this.time = time;
        this.loai = loai;
    }

    public int getId_gui() {
        return id_gui;
    }

    public void setId_gui(int id_gui) {
        this.id_gui = id_gui;
    }

    public int getId_nhan() {
        return id_nhan;
    }

    public void setId_nhan(int id_nhan) {
        this.id_nhan = id_nhan;
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

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }


}
