package com.example.sr.repository;

import com.example.sr.model.UserYeuCau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserYeuCauRepository extends JpaRepository<UserYeuCau, Integer> {
    @Query("select uy from UserYeuCau uy where uy.user.id=:id and uy.loai=:loai and uy.trangThai=:trangThai")
    public UserYeuCau findByYeuCauThuThu(@Param("id") Integer id,@Param("loai") String loai, @Param("trangThai") String trangThai);
    @Query("select  uy from UserYeuCau uy where uy.loai=:loai and uy.trangThai=:trangThai")
    public List<UserYeuCau> getDanhSachDon(@Param("loai")String loai, @Param("trangThai")String trangThai);
    @Query("select uy from UserYeuCau uy where uy.id=:id")
    public UserYeuCau getDanhSachDon(@Param("id") Integer id);
    @Query("select uy from UserYeuCau uy where uy.yeuCau.id=:id")
    public UserYeuCau getYeuCauByYCId(@Param("id") Integer id);
}
