package com.example.sr.service;

import com.example.sr.dto.UserDTO;
import com.example.sr.model.User;
import com.example.sr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User getUserByName(String name) {
        return userRepository.findByName(name);
    }
    public User getUserBySdtAndPassword(String sdt) {
        return userRepository.findBySdtAndPassword(sdt);
    }
    public boolean themUser(User user) {
        //System.out.println(userRepository.findBySdt(user.getSdt()).toString());
        if(userRepository.findBySdt(user.getSdt()).isPresent()) {
            return false;
        }
        userRepository.save(user);
        return true;
    }
    public boolean suaUser(UserDTO user) {
        userRepository.save(User.getUser(user));
        return true;
    }
    public User getById(Integer id) {
        if(!userRepository.findById(id).isPresent()) {
            return null;
        }
        return userRepository.findById(id).get();
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
