package com.example.sr.controller;

import com.example.sr.config.JwtUtil;
import com.example.sr.dto.LoginRequest;
import com.example.sr.dto.RegisterRequest;
import com.example.sr.dto.UserDTO;
import com.example.sr.model.User;
import com.example.sr.repository.UserRepository;
import com.example.sr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/")
public class AuthController {
    private final JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @Autowired
    private UserRepository userRepository;

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst().orElse("ROLE_SINH_VIEN");  // Nếu không có role, mặc định là USER
        role="ROLE_"+role.toUpperCase();
        String token = jwtUtil.generateToken(userDetails.getUsername(), role.toUpperCase());
        User u=userService.getUserBySdtAndPassword(userDetails.getUsername());
        UserDTO ug=new UserDTO(u.getId(),u.getSdt(),u.getPassword(),u.getName(),u.getAvt(),u.getRole());
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(ug);
    }

    @GetMapping("")
    public ResponseEntity<?> getCurrentUser() {
        try{
            return ResponseEntity.ok(userRepository.findBySdt("0862762737"));
        }
        catch(Exception e){
            return ResponseEntity.ok(e.getMessage());
        }

    }
    
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        User user = new User();
        user.setAvt("/images/avtMD.png");
        user.setRole("sinh_vien");
        user.setSdt(registerRequest.getSdt());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setName(registerRequest.getName());
        user.setYeuCau(new ArrayList<>());
        String role = user.getRole().toUpperCase();
        String token= jwtUtil.generateToken(user.getSdt(), role);
        if(userService.themUser(user)){
            UserDTO u=new UserDTO(user.getId(),user.getSdt(),user.getPassword(),user.getName(),user.getAvt(),user.getRole());
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION,"Bearer "+token).body(u);
        }
        else{
            return ResponseEntity.badRequest().body("Không có sách này");
        }
    }
}

