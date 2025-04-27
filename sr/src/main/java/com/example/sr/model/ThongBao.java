package com.example.sr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tb")
public class ThongBao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="header")
    private String header;
    @Column(name="nd")
    private String nd;
    @Column(name="time")
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name="id_nguoi")
    private User user;

    public ThongBao() {
    }

    public ThongBao(int id, String header, String nd, LocalDateTime time, User user) {
        this.id = id;
        this.header = header;
        this.nd = nd;
        this.time = time;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ThongBao{" +
                "id=" + id +
                ", header='" + header + '\'' +
                ", nd='" + nd + '\'' +
                ", time=" + time +
                '}';
    }
}
