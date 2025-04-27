package com.example.sr.repository;

import com.example.sr.model.YeuCau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface YeuCauRepository extends JpaRepository<YeuCau, Integer> {
    @Query("select y from YeuCau y where y.date=:date and y.noiDung=:noiDung")
    public YeuCau getYeuCauByDateAndNoiDung(@Param("date") LocalDateTime date,@Param("noiDung") String noiDung);
}
