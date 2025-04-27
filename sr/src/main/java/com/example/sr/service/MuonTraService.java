package com.example.sr.service;

import com.example.sr.model.MuonTra;
import com.example.sr.repository.MuonTraRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuonTraService {
    @Autowired
    private MuonTraRepo muonTraRepo;
    public void save(MuonTra muonTra) {
        muonTraRepo.save(muonTra);
    }
    public List<MuonTra> getMuonTraByIdSachAndIdNguoi(int nguoi, int sachId,String trangThai) {
        return muonTraRepo.getMuonTra(nguoi,sachId,trangThai);
    }

    public List<MuonTra> getMuonTraByIdNguoi(int id) {
        return muonTraRepo.getMuonTraByUserId(id);
    }
}
