package com.example.sr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="danh_gia")
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="nd")
    private String nd;
    @Column(name="time")
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name="id_nguoi")
    private User user;
    @ManyToOne
    @JoinColumn(name="id_sach")
    private Sach sach;

    public DanhGia() {
    }

    public DanhGia(String nd, LocalDateTime time, User user, Sach sach) {
        this.nd = nd;
        this.time = time;
        this.user = user;
        this.sach = sach;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Sach getSach() {
        return sach;
    }

    public void setSach(Sach sach) {
        this.sach = sach;
    }
}
