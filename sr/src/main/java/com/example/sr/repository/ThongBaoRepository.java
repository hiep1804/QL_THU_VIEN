package com.example.sr.repository;

import com.example.sr.model.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ThongBaoRepository  extends JpaRepository<ThongBao, Integer> {
    @Query("select t from ThongBao t where t.time=:time")
    public ThongBao getThongBaoByTime(@Param("time") LocalDateTime time);
    @Query("select t from ThongBao t where t.user.id=:id")
    public List<ThongBao> getThongBaoByUserId(@Param("id") Integer id);
}
