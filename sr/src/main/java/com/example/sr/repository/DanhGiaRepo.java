package com.example.sr.repository;

import com.example.sr.model.DanhGia;
import com.example.sr.model.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DanhGiaRepo extends JpaRepository<DanhGia,Integer> {
    @Query("select dg from DanhGia dg where dg.time=:time")
    public DanhGia getDanhGiaByTime(@Param("time") LocalDateTime time);
}
