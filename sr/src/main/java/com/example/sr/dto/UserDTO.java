package com.example.sr.dto;

public class UserDTO {
    private int id;
    private String sdt;
    private String password;
    private String name;
    private String avt;
    private String role;

    public UserDTO(int id, String sdt, String password, String name, String avt, String role) {
        this.id = id;
        this.sdt = sdt;
        this.password = password;
        this.name = name;
        this.avt = avt;
        this.role = role;
    }

    public UserDTO() {
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

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", sdt='" + sdt + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", avt='" + avt + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
