package com.example.sr.controller;

import com.example.sr.dto.*;
import com.example.sr.model.*;
import com.example.sr.repository.UserRepository;
import com.example.sr.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;

@RestController
@RequestMapping("/sinh-vien")
@CrossOrigin("http://localhost:3000")
public class SinhVien {
    private static final String UPLOAD_DIR = "C:/Users/hn235/OneDrive/Desktop/react/my-app/public/images/";
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private YeuCauService yeuCauService;
    @Autowired
    private UserYeuCauService userYeuCauService;
    @Autowired
    private ThongBaoService thongBaoService;
    @Autowired
    private SachService sachService;
    @Autowired
    private DanhGiaService danhGiaService;
    @Autowired
    private MuonTraService muonTraService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private ChatService chatService;

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

    @PostMapping("/xin-lam-thu-thu")
    public ResponseEntity<String> updateXinLamThu(@RequestBody YeuCauUserDTO yeuCauUserDTO) {
        User u=userService.getUserBySdtAndPassword(yeuCauUserDTO.getId());
        YeuCau yc=new YeuCau();
        yc.setNoiDung(yeuCauUserDTO.getNoiDung());
        yc.setDate(LocalDateTime.now());
        UserYeuCau thu=userYeuCauService.getYeuCauThuThu(u.getId(),"xin_lam_thu_thu","moi_xin");
        if(thu!=null){
            YeuCau c=thu.getYeuCau();
            LocalDateTime dt=LocalDateTime.now();
            if(dt.isBefore(c.getDate().plusDays(30))&&thu.getTrangThai().equals("moi_xin")){
                int d=30-dt.getDayOfYear()+c.getDate().getDayOfYear();
                return ResponseEntity.badRequest().body("Bạn vẫn chưa thể gửi được! Hãy chờ "+d+" ngày!");
            }
            else{
                yeuCauService.insertYeuCau(yc);
                YeuCau y=yeuCauService.getYeuCauByNoiDungAndDate(yc.getDate(),yc.getNoiDung());
                UserYeuCau userYeuCau=new UserYeuCau(u,yc,"xin_lam_thu_thu","moi_xin");
                userYeuCauService.insertYeuCau(userYeuCau);
                return ResponseEntity.ok("Đã thêm thành công");
            }
        }
        else{
            yeuCauService.insertYeuCau(yc);
            YeuCau y=yeuCauService.getYeuCauByNoiDungAndDate(yc.getDate(),yc.getNoiDung());
            UserYeuCau userYeuCau=new UserYeuCau(u,yc,"xin_lam_thu_thu","moi_xin");
            userYeuCauService.insertYeuCau(userYeuCau);
            return ResponseEntity.ok("Đã thêm thành công");
        }
    }

    @PostMapping("/thong-bao")
    public ResponseEntity<?> getAllTB(@RequestBody Map<String, Integer> payload) {
        List<ThongBao> getThongBaoByUserId=thongBaoService.getThongBaoByUserId(payload.get("id"));
        List<ThongBaoOutputDTO> tb=new ArrayList<>();
        for(ThongBao t:getThongBaoByUserId) {
            tb.add(new ThongBaoOutputDTO(t.getId(),t.getHeader(),t.getNd(),t.getTime(),t.getUser().getId()));
        }
        Collections.reverse(tb);
        return ResponseEntity.ok(tb);
    }

    @GetMapping("/sach")
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

    @GetMapping("/data-sach")
    public ResponseEntity<?> selectDataSach(@RequestParam String id){
        int i=Integer.parseInt(id);
        Sach s=sachService.findById(i);
        SachDTO dto=new SachDTO(s.getId(),s.getName(),s.getSl(),s.getDanhMuc(),s.getTacGia(),s.getAvt());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/muon-sach")
    public ResponseEntity<?> selectMuonSach(@RequestParam String id, @RequestParam String id_nguoi) throws JsonProcessingException {
        int i=Integer.parseInt(id);
        Sach s=sachService.findById(i);
        User u=userService.getById(Integer.parseInt(id_nguoi));
        if(s.getSl()>0) {
            YeuCau yc=new YeuCau();
            yc.setDate(LocalDateTime.now());
            yc.setNoiDung(s.getId()+"");
            yeuCauService.insertYeuCau(yc);
            YeuCau y=yeuCauService.getYeuCauByNoiDungAndDate(yc.getDate(),yc.getNoiDung());
            UserYeuCau uyc=new UserYeuCau();
            uyc.setYeuCau(y);
            uyc.setUser(u);
            uyc.setTrangThai("moi_xin");
            uyc.setLoai("muon_sach");
            userYeuCauService.insertYeuCau(uyc);
            UserYeuCau yc2=userYeuCauService.getUserYeuCau(y.getId());
            DuyetDonThuThu sd=new DuyetDonThuThu(yc2.getId(),yc2.getUser().getId(),yc2.getYeuCau().getNoiDung(),yc2.getYeuCau().getDate(), yc2.getLoai());
            String json=objectMapper.writeValueAsString(sd);
            template.convertAndSend("/topic/gui-yeu-cau",json);
            return ResponseEntity.ok("Yêu cầu mượn sách thành công");
        }
        else   return ResponseEntity.badRequest().body("Sách này đã hết");
    }

    @GetMapping("/tra-sach")
    public ResponseEntity<?> selectTraSach(@RequestParam String id, @RequestParam String id_nguoi) throws JsonProcessingException {
        int i=Integer.parseInt(id);
        Sach s=sachService.findById(i);
        User u=userService.getById(Integer.parseInt(id_nguoi));
        List<MuonTra> mts=muonTraService.getMuonTraByIdSachAndIdNguoi(u.getId(),s.getId(),"chua_tra");
        if(mts!=null) {
            YeuCau yc=new YeuCau();
            yc.setDate(LocalDateTime.now());
            yc.setNoiDung(s.getId()+"");
            yeuCauService.insertYeuCau(yc);
            YeuCau y=yeuCauService.getYeuCauByNoiDungAndDate(yc.getDate(),yc.getNoiDung());
            UserYeuCau uyc=new UserYeuCau();
            uyc.setYeuCau(y);
            uyc.setUser(u);
            uyc.setTrangThai("moi_xin");
            uyc.setLoai("tra_sach");
            userYeuCauService.insertYeuCau(uyc);
            UserYeuCau yc2=userYeuCauService.getUserYeuCau(y.getId());
            DuyetDonThuThu sd=new DuyetDonThuThu(yc2.getId(),yc2.getUser().getId(),yc2.getYeuCau().getNoiDung(),yc2.getYeuCau().getDate(), yc2.getLoai());
            String json=objectMapper.writeValueAsString(sd);
            template.convertAndSend("/topic/gui-yeu-cau",json);
            return ResponseEntity.ok("Yêu cầu trả sách thành công");
        }
        else   return ResponseEntity.badRequest().body("Bạn chưa mượn sách này");
    }

    @PostMapping("/comment-sach")
    public ResponseEntity<?> selectCommentSach(@RequestBody Map<String, Object> id){
        Integer iD = Integer.parseInt((String)id.get("id")) ;
        List<DanhGia> danhGias=danhGiaService.getAllDanhGia();
        Sach s=sachService.findById(iD);
        List<DanhGiaDTO> danhGiaDTOS=new ArrayList<>();
        if(danhGias.size()>0) {
            for (DanhGia danhGia : danhGias) {
                if(danhGia.getSach().getId()==s.getId()) {
                    DanhGiaDTO danhGiaDTO=new DanhGiaDTO(danhGia.getUser().getId(),danhGia.getSach().getId(),danhGia.getUser().getName(),danhGia.getNd(),danhGia.getTime());
                    danhGiaDTOS.add(danhGiaDTO);
                }
            }
        }
        Collections.reverse(danhGiaDTOS);
        return ResponseEntity.ok(danhGiaDTOS);
    }

    @MessageMapping("/nhan-danh-gia")
    @SendTo("/topic/danh-gia")
    public DanhGiaDTO getDanhGia(DanhGiaInputDto dg){
        Sach s=sachService.findById(dg.getId_sach());
        User u=userService.getById(dg.getId_nguoi());
        LocalDateTime ldt=LocalDateTime.now();
        DanhGia danhGia=new DanhGia(dg.getNd(),ldt,u,s);
        danhGiaService.addDanhGia(danhGia);;
        DanhGiaDTO danhGiaDTO=new DanhGiaDTO(danhGia.getUser().getId(),danhGia.getSach().getId(),danhGia.getUser().getName(),danhGia.getNd(),danhGia.getTime());
        return danhGiaDTO;
    }

    @PostMapping("/lich-su")
    public ResponseEntity<?> selectLichSu(@RequestBody Map<String, Object> i){
        int id= (Integer)i.get("id");
        List<MuonTra> mt=muonTraService.getMuonTraByIdNguoi(id);
        List<LichSuDTO> ls=new ArrayList<>();
        for(MuonTra muonTra:mt) {
            ls.add(new LichSuDTO(muonTra.getSach().getName(),muonTra.getNgayMuon(),muonTra.getNgayTra(),muonTra.getTrangThai()));
        }
        Collections.reverse(ls);
        return ResponseEntity.ok(ls);
    }

    @PostMapping("/chat/{id}")
    public ResponseEntity<?> selectChat(@PathVariable Integer id){
        List<Chat> userAll=chatService.findByIdNguoi(id);
        List<UserChatDTO> userChatDTOS=new ArrayList<>();
        User u=userService.getById(id);
        if(userAll.size()>0) {
            List<User> users=new ArrayList<>();
            for (int i=userAll.size()-1;i>=0;i--) {
                if(userAll.get(i).getNguoiGui().getId()==id) {
                    if(!users.contains(userAll.get(i).getNguoiNhan())) {
                        users.add(userAll.get(i).getNguoiNhan());
                    }
                }
                else{
                    if(!users.contains(userAll.get(i).getNguoiGui())) {
                        users.add(userAll.get(i).getNguoiGui());
                    }
                }
            }
            for(User user:users) {
                System.out.println(user.getName());
                userChatDTOS.add(new UserChatDTO(id,u.getName(),u.getAvt(),user.getId(),user.getName(),user.getAvt()));
            }
        }
        return ResponseEntity.ok(userChatDTOS);
    }

    @PostMapping("/mess/{id1}/{id2}")
    public ResponseEntity<?> selectMess(@PathVariable Integer id1,@PathVariable Integer id2){
        List<Chat> chats=chatService.findMess(id1,id2);
        for(Chat chat:chats){
            System.out.println(chat);
        }
        List<MessDTO> messDTOS=new ArrayList<>();
        LocalDateTime ldt=null;
        LocalDateTime now=LocalDateTime.now();
        if(chats.size()>0) {
            for (Chat chat : chats) {
                if(chat.getNguoiGui().getId()==id1) {
                    messDTOS.add(new MessDTO(id1,id2,chat.getNd(),chat.getTime(),chat.getLoai()));
                }
                else{
                    messDTOS.add(new MessDTO(id2,id1,chat.getNd(),chat.getTime(),chat.getLoai()));
                }
            }
        }
        return ResponseEntity.ok(messDTOS);
    }

    @MessageMapping("/nhan-tin-nhan")
    @SendTo("/topic/chat")
    public MessDTO getNhanTinNhan(ChatInputDTO chatInputDTO) throws Exception{
        Chat c=new Chat();
        User u1=userService.getById(chatInputDTO.getNguoi_gui());
        User u2=userService.getById(chatInputDTO.getNguoi_nhan());
        c.setNguoiGui(u1);
        c.setNguoiNhan(u2);
        c.setLoai(chatInputDTO.getLoai());
        c.setNd(chatInputDTO.getNd());
        c.setTime(LocalDateTime.now());
        chatService.save(c);
        UserChatDTO user=new UserChatDTO(u1.getId(),u1.getName(),u1.getAvt(),u2.getId(),u2.getName(),u2.getAvt());
        String json=objectMapper.writeValueAsString(user);
        template.convertAndSend("/topic/user",json);
        MessDTO messDTO=new MessDTO();
        messDTO.setNd(c.getNd());
        messDTO.setTime(c.getTime());
        messDTO.setLoai(c.getLoai());
        messDTO.setId_gui(c.getNguoiGui().getId());
        messDTO.setId_nhan(c.getNguoiNhan().getId());
        return messDTO;
    }

    @PostMapping("/upload/images")
    public ResponseEntity<String> handleFileUpload(@RequestPart("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty or missing");
        }

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            return ResponseEntity.ok("/images/" + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Lỗi lưu file: " + e.getMessage());
        }
    }
    
    @PostMapping("/chat/user/{id}")
    public ResponseEntity<?> selectChatUser(@PathVariable Integer id,@RequestBody Map<String,Object> map){
        String tk=(String)map.get("tk");
        System.out.println(tk);
        List<User> users=userService.getUsers();
        List<TimKiemDTO> timKiemDTOS=new ArrayList<>();
        if(tk==null||tk.trim().equals("")) {
            return ResponseEntity.ok(timKiemDTOS);
        }
        for (User user : users) {
            int i=0;
            String name=user.getName();
            for (int j=0;j<name.length();j++) {
                if(name.charAt(j)==tk.charAt(i)){
                    i++;
                }
                if(i==tk.length()){
                    break;
                }
            }
            if(i==tk.length()&&user.getId()!=id){
                timKiemDTOS.add(new TimKiemDTO(user.getId(),name));
            }
        }
        return ResponseEntity.ok(timKiemDTOS);
    }
}
