package com.example.sr.service;

import com.example.sr.model.DanhGia;
import com.example.sr.repository.DanhGiaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class DanhGiaService {
    @Autowired
    private DanhGiaRepo danhGiaRepo;
    public List<DanhGia> getAllDanhGia(){
        return danhGiaRepo.findAll();
    }
    public void addDanhGia(DanhGia danhGia) {
        danhGiaRepo.save(danhGia);
    }
    public DanhGia findByTime(LocalDateTime time){
        return danhGiaRepo.getDanhGiaByTime(time);
    }
}
