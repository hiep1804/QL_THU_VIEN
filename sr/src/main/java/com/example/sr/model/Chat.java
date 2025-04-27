package com.example.sr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nd")
    private String nd;
    @Column(name = "time")
    private LocalDateTime time;
    @Column(name="loai")
    private String loai;
    @ManyToOne
    @JoinColumn(name = "id_gui")
    private User nguoiGui;
    @ManyToOne
    @JoinColumn(name = "id_nhan")
    private User nguoiNhan;

    public Chat() {
    }

    public Chat(String nd, LocalDateTime time, String loai, User nguoiGui, User nguoiNhan) {
        this.nd = nd;
        this.time = time;
        this.loai = loai;
        this.nguoiGui = nguoiGui;
        this.nguoiNhan = nguoiNhan;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public User getNguoiGui() {
        return nguoiGui;
    }

    public void setNguoiGui(User nguoiGui) {
        this.nguoiGui = nguoiGui;
    }

    public User getNguoiNhan() {
        return nguoiNhan;
    }

    public void setNguoiNhan(User nguoiNhan) {
        this.nguoiNhan = nguoiNhan;
    }

    @Override
    public String toString() {
        return "Chat{" +
                "loai='" + loai + '\'' +
                ", time=" + time +
                ", nd='" + nd + '\'' +
                ", id=" + id +
                '}';
    }
}
