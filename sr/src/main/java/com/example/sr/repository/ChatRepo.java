package com.example.sr.repository;

import com.example.sr.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer> {
    @Query("select c from Chat c where c.nguoiGui.id=:id or c.nguoiNhan.id=:id")
    public List<Chat> findChatByIdNguoi(@Param("id") int id);
    @Query("select c from Chat c where (c.nguoiNhan.id=:id1 and c.nguoiGui.id=:id2) or (c.nguoiNhan.id=:id2 and c.nguoiGui.id=:id1) order by c.time")
    public List<Chat> findMess(@Param("id1") int id1, @Param("id2") int id2);
}
