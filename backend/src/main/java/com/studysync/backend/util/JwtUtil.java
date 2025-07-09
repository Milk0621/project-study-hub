package com.studysync.backend.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private final String SECRET_KEY = "MySuperSecretKeyForJWTMySuperSecretKeyForJWT";
	//JWT를 서명할 때 사용하는 비밀 키. 반드시 256비트 이상 (즉, 길어야 함)
	private final long EXPIRATION_TIME = 1000 * 60 * 60; //1시간
	
	private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	//
	
	//토큰 생성
	public String generateToken(String userId) {
		return Jwts.builder()
				.setSubject(userId) //사용자 식별 정보
				.setIssuedAt(new Date()) //토큰 발급 시간
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) //만료 시간
				.signWith(key, SignatureAlgorithm.HS256) //서명 알고리즘
				.compact(); //문자열로 직렬화
	}
	
	//토큰 검증
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false; //유효하지 않음
		}
	}
	
	//토큰에서 userId 추출
	public String getUserIdFromToken(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject(); //저장했던 userId
	}
	
}
