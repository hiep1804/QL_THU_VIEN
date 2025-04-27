package com.example.sr.dto;

import java.time.LocalDateTime;

public class ThongBaoOutputDTO {
    private int id;
    private String header;
    private String nd;
    private LocalDateTime time;
    private int userId;

    public ThongBaoOutputDTO(int id, String header, String nd, LocalDateTime time, int userId) {
        this.id = id;
        this.header = header;
        this.nd = nd;
        this.time = time;
        this.userId = userId;
    }

    public ThongBaoOutputDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
