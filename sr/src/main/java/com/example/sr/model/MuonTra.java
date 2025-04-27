package com.example.sr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="muon_tra")
public class MuonTra {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="ngay_muon")
    private LocalDateTime ngayMuon;
    @Column(name="ngay_tra")
    private LocalDateTime ngayTra;
    @Column(name = "trang_thai")
    private String trangThai;
    @ManyToOne
    @JoinColumn(name="id_nguoi")
    private User user;
    @ManyToOne
    @JoinColumn(name = "id_sach")
    private Sach sach;

    public MuonTra() {
    }

    public MuonTra(String trangThai, User user, Sach sach) {
        this.trangThai = trangThai;
        this.user = user;
        this.sach = sach;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getNgayMuon() {
        return ngayMuon;
    }

    public void setNgayMuon(LocalDateTime ngayMuon) {
        this.ngayMuon = ngayMuon;
    }

    public LocalDateTime getNgayTra() {
        return ngayTra;
    }

    public void setNgayTra(LocalDateTime ngayTra) {
        this.ngayTra = ngayTra;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
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
