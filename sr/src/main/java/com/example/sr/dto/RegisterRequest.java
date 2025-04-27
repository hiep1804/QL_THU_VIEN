package com.example.sr.dto;

public class RegisterRequest {
    private String sdt;
    private String password;
    private String name;

    public RegisterRequest(String sdt, String password, String name) {
        this.sdt = sdt;
        this.password = password;
        this.name = name;
    }

    public RegisterRequest() {
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

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "sdt='" + sdt + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
