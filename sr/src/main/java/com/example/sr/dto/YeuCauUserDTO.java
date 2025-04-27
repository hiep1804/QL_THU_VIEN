package com.example.sr.dto;

import com.example.sr.model.YeuCau;

public class YeuCauUserDTO {
    private String id;
    private String noiDung;

    public YeuCauUserDTO(String id, String noiDung) {
        this.id = id;
        this.noiDung = noiDung;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }
}
