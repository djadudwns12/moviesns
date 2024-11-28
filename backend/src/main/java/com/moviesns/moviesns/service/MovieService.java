package com.moviesns.moviesns.service;

import com.moviesns.moviesns.dto.MemberDTO;

import java.util.List;

public interface MovieService {


    List<MemberDTO> getList() throws Exception;
}