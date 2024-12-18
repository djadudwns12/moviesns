package com.moviesns.moviesns.controller;

import java.util.Map;

import com.moviesns.moviesns.config.JwtUtil;
import com.moviesns.moviesns.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviesns.moviesns.dto.LoginRequest;
import com.moviesns.moviesns.dto.LoginResponse;
import com.moviesns.moviesns.service.MovieService;

@Slf4j
@Controller
@CrossOrigin(origins = "http://localhost:3000") // CORS 허용 설정
public class HomeController {

    @Autowired
    private MovieService mService;

    @Autowired
    private MemberService memberService;
    // jwt인증하는 부분 의존성 주입입
    @Autowired
    private JwtUtil jwtUtil;


    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/")
        public String index() {
        System.out.println("gogogogogoggoog");
        return "index";
    }
    @GetMapping("/movieAPI")
    public ResponseEntity<?> getExample() {

        // TMDB API 키 (자신의 키로 대체하세요)
        String API_KEY = "be729279e957729564c182759c414c67";

        // API URL 구성
        String BASE_URL = "https://api.themoviedb.org/3";
        String ENDPOINT = "/movie/now_playing";
        String LANGUAGE = "ko-KR";
        String URL = BASE_URL+ENDPOINT+"?api_key="+API_KEY+"&language="+LANGUAGE;

        try {
            String url = URL;
            String response = restTemplate.getForObject(url, String.class);

            // System.out.println(response);

            // JSON으로 반환
            Map<String, Object> responseJson = objectMapper.readValue(response, Map.class);
            return ResponseEntity.ok(responseJson);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while processing GET request");
        }
    }

    @GetMapping("/serviceTest")
        public void serviceTest() throws Exception {
        mService.getList();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest.getUserId());
        System.out.println(loginRequest.getPassword());
//        memberService.loadUserByUsername()

        UserDetails loginMember =  memberService.loadUserByUsername(loginRequest.getUserId(),loginRequest.getPassword());

// 간단한 로그인 검증 (예: 사용자가 "user", 비밀번호 "password"인지 확인)
        if (loginMember != null ) {
            String token = jwtUtil.generateToken(loginRequest.getUserId());

            // 로그인 성공시 token 반환
            log.info(token);

            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    

}
