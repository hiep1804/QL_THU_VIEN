package com.example.sr.controller;

import com.example.sr.dto.*;
import com.example.sr.model.*;
import com.example.sr.service.*;
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
import java.util.Map;

@RestController
@RequestMapping("/thu-thu")
@CrossOrigin("http://localhost:3000")
public class ThuThu {
    private static final String UPLOAD_DIR = "C:/Users/hn235/OneDrive/Desktop/react/my-app/public/images/";
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SachService sachService;
    @Autowired
    private ThongBaoService thongBaoService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private UserYeuCauService userYeuCauService;
    @Autowired
    private MuonTraService muonTraService;
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
    @PostMapping(value = "/sach",consumes = { "multipart/form-data" })
    public ResponseEntity<?> updateSach(
            @RequestPart(value = "file", required = false) MultipartFile file,  // File có thể null
            @RequestPart("sach") String sachJson) throws IOException{
        ObjectMapper objectMapper = new ObjectMapper();
        Sach sach=objectMapper.readValue(sachJson,Sach.class);
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
        Sach s=sachService.findByFull(sach);
        if(s!=null){
            s.setSl(s.getSl()+sach.getSl());
            sachService.themSach(s);
            return ResponseEntity.ok("Thêm sl thành công!");
        }
        sachService.themSach(sach);
        return ResponseEntity.ok("Thêm sách thành công!");
    }
    @GetMapping("/sach/data")
    public ResponseEntity<?> selectFullSach(@RequestParam String tim){
        List<Sach> sachList=sachService.findAll();
        ArrayList<SachDTO> sachList2=new ArrayList<>();
        if(tim.equals("")||tim==null) {
            for (Sach sach : sachList) {
                sachList2.add(new SachDTO(sach.getId(),sach.getName(), sach.getSl(),sach.getDanhMuc(),sach.getTacGia(),sach.getAvt()));
            }
            return ResponseEntity.ok(sachList2);
        }
        else{
            for (Sach sach : sachList) {
                String name=sach.getName();
                int i=0;
                for(int j=0;j<name.length();j++){
                    if(name.charAt(j)==tim.charAt(i)){
                        i++;
                    }
                    if(i==tim.length()){
                        break;
                    }
                }
                if(i==tim.length()){
                    sachList2.add(new SachDTO(sach.getId(),sach.getName(),sach.getSl(),sach.getDanhMuc(),sach.getTacGia(),sach.getAvt()));
                }
            }
            return ResponseEntity.ok(sachList2);
        }
    }
    @GetMapping("/sach/sua")
    public ResponseEntity<?> selectSach(@RequestParam(value = "timKiem") String timKiem){
        try{
            int id=Integer.parseInt(timKiem);
            Sach sach=sachService.findById(id);
            SachDTO s=new SachDTO(sach.getId(),sach.getName(),sach.getSl(),sach.getDanhMuc(),sach.getTacGia(),sach.getAvt());
            return ResponseEntity.ok(s);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Không có sách này"));
        }
    }
    @PostMapping(value="/sach/sua/sach",consumes = { "multipart/form-data" })
    public ResponseEntity<?> selectSach2(@RequestPart(value = "file", required = false) MultipartFile file,  // File có thể null
                                         @RequestPart("sach") String sachJson) throws IOException{
        ObjectMapper objectMapper = new ObjectMapper();
        Sach sach=objectMapper.readValue(sachJson,Sach.class);
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
        Sach s=sachService.findByFull(sach);
        sachService.themSach(sach);
        return ResponseEntity.ok("Sửa sách thành công!");
    }
    @PostMapping("/sach/xoa")
    public ResponseEntity<?> selectSach3(@RequestBody Sach sach){
        sachService.delete(sach);
        return ResponseEntity.ok("Xóa sách thành công");
    }
    @PostMapping("/gui-thong-bao")
    public ResponseEntity<?> selectGuiThongBao(@RequestBody ThuThuGuiThongBao tb) throws JsonProcessingException {
        User u=userService.getById(Integer.parseInt(tb.getId_nguoi_nhan()));
        if(u==null){
            return ResponseEntity.badRequest().body("Bạn đã không nhập đúng id");
        }
        LocalDateTime lc=LocalDateTime.now();
        ThongBao t=new ThongBao();
        t.setNd(tb.getNd());
        t.setHeader(tb.getHeader());
        t.setTime(lc);
        t.setUser(u);
        thongBaoService.save(t);
        ThongBao t1 =thongBaoService.getThongBaoByTime(lc);
        ThongBaoOutputDTO tb1=new ThongBaoOutputDTO(t1.getId(),t1.getHeader(),t1.getNd(),t1.getTime(),u.getId());
        String json=objectMapper.writeValueAsString(tb1);
        template.convertAndSend("/topic/thong-bao",json);
        return ResponseEntity.ok("Bạn đã thông báo thành công");
    }
    @PostMapping("/duyet-yeu-cau")
    public ResponseEntity<?> selectDuyet(){
        List<UserYeuCau> userYeuCaus=userYeuCauService.getDanhSachDon("muon_sach","moi_xin");
        List<UserYeuCau> userYeuCaus1=userYeuCauService.getDanhSachDon("tra_sach","moi_xin");
        userYeuCaus.addAll(userYeuCaus1);
        List<DuyetDonThuThu> duyetDonAdmins=new ArrayList<>();
        for(UserYeuCau userYeuCau:userYeuCaus){
            DuyetDonThuThu dt=new DuyetDonThuThu(userYeuCau.getId(),userYeuCau.getUser().getId(),userYeuCau.getYeuCau().getNoiDung(),userYeuCau.getYeuCau().getDate(), userYeuCau.getLoai());
            duyetDonAdmins.add(dt);
        }
        return ResponseEntity.ok(duyetDonAdmins);
    }
    @GetMapping("/duyet-yeu-cau/xu-li")
    public ResponseEntity<?> updateYeuCauXin(@RequestParam(value="loai") String loai,
                                             @RequestParam(value="i") int i,
                                             @RequestParam(value="id") int id,
                                             @RequestParam(value = "mt") String muonTra) throws JsonProcessingException {
        UserYeuCau uy=userYeuCauService.getDanhSachDon(i);
        User user=userService.getById(id);
        Sach s=sachService.findById(Integer.parseInt(uy.getYeuCau().getNoiDung()));
        LocalDateTime time=LocalDateTime.now();
        ThongBao thongBao=new ThongBao();
        if(loai.equals("dy")){
            if(muonTra.equals("muon_sach")){
                if(s.getSl()>0) {
                    MuonTra mt = new MuonTra();
                    s.setSl(s.getSl()-1);
                    mt.setSach(s);
                    mt.setUser(user);
                    mt.setNgayMuon(time);
                    mt.setTrangThai("chua_tra");
                    muonTraService.save(mt);
                    uy.setTrangThai("dong_y");
                    thongBao.setHeader("Đơn xin mượn sách của bạn đã được chấp nhận");
                    thongBao.setNd("Chúc mừng đơn xin mượn sách " + s.getName() + " đã được chấp nhận");
                    thongBao.setTime(time);
                    thongBao.setUser(user);
                    thongBaoService.save(thongBao);
                }
                else{
                    thongBao.setHeader("Đơn xin mượn sách bị từ chối");
                    thongBao.setNd("Rất tiếc sách "+s.getName()+" đã hết");
                    thongBao.setTime(time);
                    thongBao.setUser(user);
                    thongBaoService.save(thongBao);
                    uy.setTrangThai("tu_choi");
                }
            }
            if(muonTra.equals("tra_sach")){
                List<MuonTra> mts=muonTraService.getMuonTraByIdSachAndIdNguoi(user.getId(),s.getId(),"chua_tra");
                MuonTra mt=mts.get(0);
                mt.setTrangThai("da_tra");
                mt.setNgayTra(time);
                muonTraService.save(mt);
                uy.setTrangThai("dong_y");
                thongBao.setHeader("Đơn xin trả sách của bạn đã được chấp nhận");
                thongBao.setNd("Chúc mừng đơn xin trả sách " + s.getName() + " đã được chấp nhận");
                thongBao.setTime(time);
                thongBao.setUser(user);
                thongBaoService.save(thongBao);
                s.setSl(s.getSl()+1);
            }
        }
        if(loai.equals("tc")){
            if(muonTra.equals("muon_sach")) {
                thongBao.setHeader("Đơn xin mượn sách bị từ chối");
                thongBao.setNd("Rất tiếc đơn xin mượn sách "+s.getName()+" của bạn đã bị từ chối");
                thongBao.setTime(time);
                thongBao.setUser(user);
                thongBaoService.save(thongBao);
                uy.setTrangThai("tu_choi");
            }
            if(muonTra.equals("tra_sach")) {
                thongBao.setHeader("Đơn xin trả sách bị từ chối");
                thongBao.setNd("Rất tiếc đơn xin trả sách "+s.getName()+" của bạn đã bị từ chối");
                thongBao.setTime(time);
                thongBao.setUser(user);
                thongBaoService.save(thongBao);
                uy.setTrangThai("tu_choi");
            }
        }
        userYeuCauService.insertYeuCau(uy);
        System.out.println(thongBao);
        ThongBao t =thongBaoService.getThongBaoByTime(time);
        ThongBaoOutputDTO tb=new ThongBaoOutputDTO(t.getId(),t.getHeader(),t.getNd(),t.getTime(),user.getId());
        String json=objectMapper.writeValueAsString(tb);
        template.convertAndSend("/topic/thong-bao",json);
        return ResponseEntity.ok("Đã thêm trạng thái thành công");
    }
}
