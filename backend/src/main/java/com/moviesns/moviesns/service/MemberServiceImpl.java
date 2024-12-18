package com.moviesns.moviesns.service;

import com.moviesns.moviesns.entity.Member;
import com.moviesns.moviesns.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    public MemberServiceImpl (MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String userId,String password) throws UsernameNotFoundException {
        Member member = memberRepository.findByUserInfo(userId,password);
        if ( member == null) {
            throw new UsernameNotFoundException("User not found: " + userId);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(member.getUserId())
                .password(member.getPassword())
                .roles(member.getRole())
                .build();
    }
}
