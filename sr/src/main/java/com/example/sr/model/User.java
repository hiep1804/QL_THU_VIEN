package com.example.sr.model;

import com.example.sr.dto.UserDTO;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="sdt")
    private String sdt;
    @Column(name="password")
    private String password;
    @Column(name="name")
    private String name;
    @Column(name="avt")
    private String avt;
    @Column(name="role")
    private String role;
    @OneToMany(mappedBy = "user")
    private List<UserYeuCau> yeuCau;
    @OneToMany(mappedBy = "user")
    private List<ThongBao> tb;
    @OneToMany(mappedBy = "user")
    private List<DanhGia> danhGia;
    @OneToMany(mappedBy = "user")
    private List<MuonTra> muonTra;
    @OneToMany(mappedBy = "nguoiGui")
    private List<Chat> nguoiGui;
    @OneToMany(mappedBy = "nguoiNhan")
    private List<Chat> nguoiNhan;

    public List<Chat> getNguoiGui() {
        if (nguoiGui == null) {
            nguoiGui = new ArrayList<>();
        }
        return nguoiGui;
    }

    public void setNguoiGui(List<Chat> nguoiGui) {
        this.nguoiGui = nguoiGui;
    }

    public List<Chat> getNguoiNhan() {
        if (nguoiNhan == null) {
            nguoiNhan = new ArrayList<>();
        }
        return nguoiNhan;
    }

    public void setNguoiNhan(List<Chat> nguoiNhan) {
        this.nguoiNhan = nguoiNhan;
    }

    public List<MuonTra> getMuonTra() {
        if (muonTra == null) {
            muonTra = new ArrayList<>();
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

    public List<ThongBao> getTb() {
        if(tb==null){
            tb = new ArrayList<>();
        }
        return tb;
    }

    public void setTb(List<ThongBao> tb) {
        this.tb = tb;
    }

    public List<UserYeuCau> getYeuCau() {
        if (yeuCau == null) {
            yeuCau = new ArrayList<>();
        }
        return yeuCau;
    }

    public void setYeuCau(List<UserYeuCau> yeuCau) {
        this.yeuCau = yeuCau;
    }

    public User() {
    }

    public User(int id, String sdt, String password, String name, String avt, String role) {
        this.id = id;
        this.sdt = sdt;
        this.password = password;
        this.name = name;
        this.avt = avt;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && Objects.equals(sdt, user.sdt) && Objects.equals(password, user.password) && Objects.equals(name, user.name) && Objects.equals(avt, user.avt) && Objects.equals(role, user.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sdt, password, name, avt, role);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", sdt='" + sdt + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", avt='" + avt + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvt() {
        return avt;
    }

    public void setAvt(String avt) {
        this.avt = avt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public static User getUser(UserDTO user) {
        return new User(user.getId(), user.getSdt(), user.getPassword(), user.getName(), user.getAvt(), user.getRole());
    }
}
