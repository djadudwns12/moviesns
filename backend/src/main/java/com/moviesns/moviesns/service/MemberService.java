package com.moviesns.moviesns.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface MemberService extends UserDetailsService {
    @Override
    UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException;
}
