package com.example.sr.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="sach")
public class Sach {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="sl")
    private int sl;
    @Column(name="danh_muc")
    private String danhMuc;
    @Column(name="tac_gia")
    private String tacGia;
    @Column(name="avt")
    private String avt;
    @OneToMany(mappedBy = "sach")
    private List<DanhGia> danhGia;
    @OneToMany(mappedBy = "sach")
    private List<MuonTra> muonTra;

    public List<MuonTra> getMuonTra() {
        if (muonTra == null) {
            return new ArrayList<>();
        }
        return muonTra;
    }

    public void setMuonTra(List<MuonTra> muonTra) {
        this.muonTra = muonTra;
    }

    public List<DanhGia> getDanhGia() {
        if(danhGia==null){
            return new ArrayList<>();
        }
        return danhGia;
    }

    public void setDanhGia(List<DanhGia> danhGia) {
        this.danhGia = danhGia;
    }

    public Sach() {
    }

    public Sach(int id, String name, int sl, String danhMuc, String tacGia, String avt) {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Sach sach = (Sach) o;
        return id == sach.id && sl == sach.sl && Objects.equals(name, sach.name) && Objects.equals(danhMuc, sach.danhMuc) && Objects.equals(tacGia, sach.tacGia) && Objects.equals(avt, sach.avt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, sl, danhMuc, tacGia, avt);
    }

    @Override
    public String toString() {
        return "Sach{" +
                "avt='" + avt + '\'' +
                ", tacGia='" + tacGia + '\'' +
                ", danhMuc='" + danhMuc + '\'' +
                ", sl=" + sl +
                ", name='" + name + '\'' +
                ", id=" + id +
                '}';
    }
}
