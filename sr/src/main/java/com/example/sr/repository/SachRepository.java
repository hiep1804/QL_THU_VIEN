package com.example.sr.repository;

import com.example.sr.model.Sach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SachRepository extends JpaRepository<Sach, Integer> {
    @Query("select s from Sach s where s.name=:name and s.danhMuc=:danh_muc and s.tacGia=:tac_gia")
    Sach findByFull(@Param("name") String name, @Param("danh_muc") String danh_muc, @Param("tac_gia") String tac_gia);
    @Query("select s from Sach s where s.id=:id")
    Sach findById(@Param("id") int id);
}
