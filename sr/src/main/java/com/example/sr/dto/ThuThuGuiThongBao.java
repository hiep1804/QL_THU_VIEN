package com.example.sr.dto;

public class ThuThuGuiThongBao {
    private String header;
    private String nd;
    private String id_nguoi_nhan;

    public ThuThuGuiThongBao() {
    }

    public ThuThuGuiThongBao(String header, String nd, String id_nguoi_nhan) {
        this.header = header;
        this.nd = nd;
        this.id_nguoi_nhan = id_nguoi_nhan;
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

    public String getId_nguoi_nhan() {
        return id_nguoi_nhan;
    }

    public void setId_nguoi_nhan(String id_nguoi_nhan) {
        this.id_nguoi_nhan = id_nguoi_nhan;
    }
}
