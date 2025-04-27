package com.example.sr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="yeu_cau")
public class YeuCau {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="nd")
    private String noiDung;
    @Column(name="time")
    private LocalDateTime date;
    @OneToMany(mappedBy = "yeuCau")
    private List<UserYeuCau> user;

    public YeuCau() {

    }

    public List<UserYeuCau> getUser() {
        if(user == null) {
            user = new ArrayList<>();
        }
        return user;
    }

    public void setUser(List<UserYeuCau> user) {
        this.user = user;
    }

    public YeuCau(String noiDung, LocalDateTime date) {
        this.noiDung = noiDung;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "YeuCau{" +
                "id=" + id +
                ", noiDung='" + noiDung + '\'' +
                ", date=" + date +
                ", user=" + user +
                '}';
    }
}
