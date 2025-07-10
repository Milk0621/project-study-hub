package com.studysync.backend.domain.users.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.users.model.Users;
import com.studysync.backend.domain.users.service.UsersService;
import com.studysync.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final JwtUtil jwtUtil;
	
	private final UsersService usersService;
	
	@Autowired
	public UsersController(UsersService usersService, JwtUtil jwtUtil) {
		this.usersService = usersService;
		this.jwtUtil = jwtUtil;
	}

	//회원가입
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Users user){
		int result = usersService.register(user);
		return result > 0
				? ResponseEntity.ok("회원가입 성공")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
	}
	
	//로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users user){
		Users loginUser = usersService.login(user.getId(), user.getPw());
		
		if(loginUser != null) {
			String token = jwtUtil.generateToken(loginUser.getId());
			
			//사용자 정보 + 토큰
			Map<String, Object> response = new HashMap<>();
			response.put("id", loginUser.getId());
			response.put("nickname", loginUser.getNickname());
			response.put("email", loginUser.getEmail());
			response.put("token", token);
			
			return ResponseEntity.ok(response);
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
		}
	}
	
	@GetMapping("/info")
	public ResponseEntity<?> getUserInfo(HttpServletRequest request){
		String authHeader = request.getHeader("Authorization");
		
		if(authHeader != null && authHeader.startsWith("Bearer ")){
			String token = authHeader.substring(7); // "Bearer " 제거
			String id = jwtUtil.getUserIdFromToken(token); //토큰에서 사용자 ID 꺼내오기
			
			Users user = usersService.findById(id); // DB에서 사용자 정보 조회
			if(user != null) {
				return ResponseEntity.ok(user); //사용자 정보 응답
			}
		}
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰");
	}
	
}
