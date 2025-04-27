package com.example.sr.service;

import com.example.sr.model.Sach;
import com.example.sr.repository.SachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SachService {
    @Autowired
    private SachRepository sachRepository;
    public boolean themSach(Sach sach){
        try{
            sachRepository.save(sach);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
    public Sach findByFull(Sach sach){
        return sachRepository.findByFull(sach.getName(),sach.getDanhMuc(),sach.getTacGia());
    }
    public List<Sach> findAll(){
        return sachRepository.findAll();
    }
    public Sach findById(int id){
        return sachRepository.findById(id);
    }
    public void delete(Sach sach){
        sachRepository.delete(sach);
    }
}
