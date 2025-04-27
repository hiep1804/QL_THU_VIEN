package com.example.sr.service;

import com.example.sr.model.YeuCau;
import com.example.sr.repository.YeuCauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class YeuCauService {
    @Autowired
    private YeuCauRepository yeuCauRepository;
    public void insertYeuCau(YeuCau yeuCau) {
        this.yeuCauRepository.save(yeuCau);
    }
    public YeuCau getYeuCauByNoiDungAndDate(LocalDateTime date, String noiDung) {
        return yeuCauRepository.getYeuCauByDateAndNoiDung(date,noiDung);
    }
}
