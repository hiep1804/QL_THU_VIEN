package com.example.sr.controller;

import com.example.sr.dto.DuyetDonAdmin;
import com.example.sr.dto.ThongBaoOutputDTO;
import com.example.sr.dto.UserDTO;
import com.example.sr.model.ThongBao;
import com.example.sr.model.User;
import com.example.sr.model.UserYeuCau;
import com.example.sr.service.ThongBaoService;
import com.example.sr.service.UserService;
import com.example.sr.service.UserYeuCauService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class Admin {
    private static final String UPLOAD_DIR = "C:/Users/hn235/OneDrive/Desktop/react/my-app/public/images/";
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserYeuCauService userYeuCauService;
    @Autowired
    private ThongBaoService thongBaoService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping(value = "/profile", consumes = { "multipart/form-data" })
    public ResponseEntity<String> updateProfile(
            @RequestPart(value = "file", required = false) MultipartFile file,  // File có thể null
            @RequestPart("user") String userJson) throws IOException {

        // Chuyển user JSON thành Object
        ObjectMapper objectMapper = new ObjectMapper();
        UserDTO user = objectMapper.readValue(userJson, UserDTO.class);

        if(file!=null){
            try {
                // Tạo thư mục nếu chưa có
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Lưu file vào thư mục
                String filePath = UPLOAD_DIR + file.getOriginalFilename();
                file.transferTo(new File(filePath));
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.suaUser(user);
        return ResponseEntity.ok("Cập nhật thành công!");
    }

    @PostMapping("/duyet-don-xin-thu-thu")
    public ResponseEntity<?> updateYeuCau(){
        List<UserYeuCau> userYeuCaus=userYeuCauService.getDanhSachDon("xin_lam_thu_thu","moi_xin");
        ArrayList<DuyetDonAdmin> duyet=new ArrayList<>();
        for(UserYeuCau userYeuCau:userYeuCaus){
            DuyetDonAdmin duyetDonAdmin=new DuyetDonAdmin();
            duyetDonAdmin.setI(userYeuCau.getId());
            duyetDonAdmin.setId(userYeuCau.getUser().getId());
            duyetDonAdmin.setDate(userYeuCau.getYeuCau().getDate());
            duyetDonAdmin.setNoiDung(userYeuCau.getYeuCau().getNoiDung());
            duyet.add(duyetDonAdmin);
        }
        return ResponseEntity.ok(duyet);
    }
    
    @GetMapping("/duyet-don-xin-thu-thu/xu-li")
    public ResponseEntity<?> updateYeuCauXin(@RequestParam(value="loai") String loai,@RequestParam(value="i") int i,@RequestParam(value="id") int id ) throws JsonProcessingException {
        UserYeuCau uy=userYeuCauService.getDanhSachDon(i);
        User user=userService.getById(id);
        LocalDateTime time=LocalDateTime.now();
        ThongBao thongBao=new ThongBao();
        if(loai.equals("dy")){
            uy.setTrangThai("dong_y");
            user.setRole("thu_thu");
            userService.themUser(user);
            thongBao.setHeader("Đơn xin làm thủ thư đã được chấp nhận");
            thongBao.setNd("Chúc mừng đơn xin làm thủ thư của bạn đã được chấp nhận");
            thongBao.setTime(time);
            thongBao.setUser(user);
            thongBaoService.save(thongBao);
        }
        if(loai.equals("tc")){
            thongBao.setHeader("Đơn xin làm thủ thư bị từ chối");
            thongBao.setNd("Rất tiếc đơn xin làm thủ thư của bạn đã bị từ chối");
            thongBao.setTime(time);
            thongBao.setUser(user);
            thongBaoService.save(thongBao);
            uy.setTrangThai("tu_choi");
        }
        userYeuCauService.insertYeuCau(uy);
        ThongBao t =thongBaoService.getThongBaoByTime(time);
        ThongBaoOutputDTO tb=new ThongBaoOutputDTO(t.getId(),t.getHeader(),t.getNd(),t.getTime(),user.getId());
        String json=objectMapper.writeValueAsString(tb);
        template.convertAndSend("/topic/thong-bao",json);
        return ResponseEntity.ok("Đã thêm trạng thái thành công");
    }
}
