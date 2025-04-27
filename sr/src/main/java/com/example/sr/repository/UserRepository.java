package com.example.sr.repository;

import com.example.sr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
    @Query("select u from User u where u.sdt = :sdt")
    User findBySdtAndPassword(@Param("sdt") String sdt);
    Optional<User> findBySdt(String sdt);;
}
