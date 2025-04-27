package com.example.sr.dto;

public class UserChatDTO {
    private int id_gui;
    private String name_gui;
    private String avt_gui;
    private int id;
    private String name;
    private String avt;

    public UserChatDTO() {
    }

    public UserChatDTO(int id_gui, String name_gui, String avt_gui, int id, String name, String avt) {
        this.id_gui = id_gui;
        this.name_gui = name_gui;
        this.avt_gui = avt_gui;
        this.id = id;
        this.name = name;
        this.avt = avt;
    }

    public String getName_gui() {
        return name_gui;
    }

    public void setName_gui(String name_gui) {
        this.name_gui = name_gui;
    }

    public String getAvt_gui() {
        return avt_gui;
    }

    public void setAvt_gui(String avt_gui) {
        this.avt_gui = avt_gui;
    }

    public int getId_gui() {
        return id_gui;
    }

    public void setId_gui(int id_gui) {
        this.id_gui = id_gui;
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

    public String getAvt() {
        return avt;
    }

    public void setAvt(String avt) {
        this.avt = avt;
    }
}
