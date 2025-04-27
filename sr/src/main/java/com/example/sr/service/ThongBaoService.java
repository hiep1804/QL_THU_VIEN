package com.example.sr.service;

import com.example.sr.model.ThongBao;
import com.example.sr.repository.ThongBaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ThongBaoService {
    @Autowired
    private ThongBaoRepository thongBaoRepository;
    public ThongBao getThongBaoByTime(LocalDateTime time) {
        return thongBaoRepository.getThongBaoByTime(time);
    }
    public void save(ThongBao thongBao) {
        thongBaoRepository.save(thongBao);
    }
    public List<ThongBao> getThongBaoByUserId(Integer id) {
        return thongBaoRepository.getThongBaoByUserId(id);
    }
}
