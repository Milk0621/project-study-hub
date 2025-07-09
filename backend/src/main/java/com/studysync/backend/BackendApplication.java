package com.studysync.backend;

import io.github.cdimascio.dotenv.Dotenv;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.studysync.backend.dao")
public class BackendApplication {
	
	public static void main(String[] args) {
		// .env 로드
		Dotenv dotenv = Dotenv.configure().load();
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		
		SpringApplication.run(BackendApplication.class, args);
	}

}
