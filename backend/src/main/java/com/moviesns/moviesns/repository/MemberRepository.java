package com.moviesns.moviesns.repository;

import com.moviesns.moviesns.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,String> {
    Member findByUserId(String userId); // userId로 사용자 검색
}
