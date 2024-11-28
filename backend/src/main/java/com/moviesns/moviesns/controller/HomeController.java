package com.moviesns.moviesns.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviesns.moviesns.service.MovieService;


@Controller
@CrossOrigin(origins = "http://localhost:3000") // CORS 허용 설정
public class HomeController {

    @Autowired
    private MovieService mService;

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
    

}
