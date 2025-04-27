package com.example.sr.repository;

import com.example.sr.model.MuonTra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MuonTraRepo extends JpaRepository<MuonTra, Integer> {
    @Query("select mt from MuonTra mt where mt.user.id=:userId and mt.sach.id=:sachId and mt.trangThai=:tt")
    public List<MuonTra> getMuonTra(@Param("userId") int sachId, @Param("sachId") int userId,@Param("tt") String trangThai);
    @Query("select mt from MuonTra mt where mt.user.id=:userId")
    public List<MuonTra> getMuonTraByUserId(@Param("userId") int userId);
}
