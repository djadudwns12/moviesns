package com.moviesns.moviesns.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Member")
@Builder
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter // @Setter는 주로 jpa에서는 사용x 필요시 직접만들어서 사용하는경우가 많다.
@ToString
public class Member {

    @Id
    private String userId;
    // 나머지 컬럼
    private String password;
    private String userName;
    private String phoneNum;

    private String role; // 사용자 권한 (예: "ROLE_USER", "ROLE_ADMIN")





}
