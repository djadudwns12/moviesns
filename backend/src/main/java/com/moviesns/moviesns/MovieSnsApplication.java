package com.moviesns.moviesns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // AuditingEntityListener.class를 활성화
public class MovieSnsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieSnsApplication.class, args);
	}

}
