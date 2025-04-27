package com.example.sr.model;

import jakarta.persistence.*;

@Entity
@Table(name="user_yc")
public class UserYeuCau {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    @JoinColumn(name="id_nguoi")
    private User user;
    @ManyToOne
    @JoinColumn(name="id_yc")
    private YeuCau yeuCau;
    @Column(name="loai")
    private String loai;
    @Column(name="trang_thai")
    private String trangThai;
    public UserYeuCau(int id, User user, YeuCau yeuCau, String loai,String trangThai) {
        this.id = id;
        this.user = user;
        this.yeuCau = yeuCau;
        this.loai = loai;
        this.trangThai = trangThai;
    }

    public UserYeuCau(User user, YeuCau yeuCau, String loai,String trangThai) {
        this.user = user;
        this.yeuCau = yeuCau;
        this.loai = loai;
        this.trangThai = trangThai;
    }

    public UserYeuCau() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public YeuCau getYeuCau() {
        return yeuCau;
    }

    public void setYeuCau(YeuCau yeuCau) {
        this.yeuCau = yeuCau;
    }

    public String getLoai() {
        return loai;
    }

    public void setLoai(String loai) {
        this.loai = loai;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}
