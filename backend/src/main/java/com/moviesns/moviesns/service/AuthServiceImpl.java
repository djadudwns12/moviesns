package com.moviesns.moviesns.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.moviesns.moviesns.entity.Member;
import com.moviesns.moviesns.repository.MemberRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service

public class AuthServiceImpl implements AuthService{
    @Autowired
    private MemberRepository userRepository;

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    private static final String SECRET_KEY = "1234";

    public String authenticate(String userId, String password) {
        Member user = userRepository.findByUserId(userId); // userId로 조회

//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
        if (user != null) {
            return generateToken(userId);
        }
        return null;
    }

    private String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1일 유효
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
}
