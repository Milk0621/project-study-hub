package com.studysync.backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.studysync.backend.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
// OncePerRequestFilter는 요청당 한번만 실행되는 필터를 의미.
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization"); // 헤더에서 토큰 꺼내기 Authorization: Bearer ...
		
		if(authHeader != null && authHeader.startsWith("Bearer ")){
			String token = authHeader.substring(7); // "Bearer " 제거
			
			if(jwtUtil.validateToken(token)) { // 토큰 유효성 검증
				String userId = jwtUtil.getUserIdFromToken(token); // 토큰 안에서 userId를 꺼냄
				request.setAttribute("userId", userId); // 컨트롤러에서 꺼내서 사용
			}
		}
		
		filterChain.doFilter(request, response); // 다음 필터나 컨트롤러로 넘기기
	}
	
}
