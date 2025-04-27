package com.example.sr.service;

import com.example.sr.model.Chat;
import com.example.sr.repository.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatRepo chatRepo;
    public List<Chat> findByIdNguoi(int id) {
        return chatRepo.findChatByIdNguoi(id);
    }
    public List<Chat> findMess(int id1, int id2) {
        return chatRepo.findMess(id1,id2);
    }
    public void save(Chat chat) {
        chatRepo.save(chat);
    }
}
