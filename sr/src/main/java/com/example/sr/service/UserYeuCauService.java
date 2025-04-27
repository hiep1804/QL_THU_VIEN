package com.example.sr.service;

import com.example.sr.model.UserYeuCau;
import com.example.sr.model.YeuCau;
import com.example.sr.repository.UserYeuCauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserYeuCauService {
    @Autowired
    private UserYeuCauRepository userYeuCauRepository;
    public void insertYeuCau(UserYeuCau yeuCau) {
        userYeuCauRepository.save(yeuCau);
    }
    public UserYeuCau getYeuCauThuThu(Integer id,String loai,String trangThai) {
        return userYeuCauRepository.findByYeuCauThuThu(id, loai, trangThai);
    }
    public List<UserYeuCau> getDanhSachDon(String loai,String trangThai) {
        return userYeuCauRepository.getDanhSachDon(loai, trangThai);
    }
    public UserYeuCau getDanhSachDon(Integer id) {
        return userYeuCauRepository.getDanhSachDon(id);
    }
    public UserYeuCau getUserYeuCau(int id) {
        return userYeuCauRepository.getYeuCauByYCId(id);
    }
}
