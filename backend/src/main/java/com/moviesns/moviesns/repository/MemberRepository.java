package com.moviesns.moviesns.repository;

import com.moviesns.moviesns.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,String> {

    @Query("SELECT m FROM Member m where m.userId = :userId and m.password = :password")
    Member findByUserInfo(@Param("userId") String userId,@Param("password") String password); // userId로 사용자 검색
}
