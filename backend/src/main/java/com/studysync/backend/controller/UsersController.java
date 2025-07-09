package com.studysync.backend.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.dao.UsersDAO;
import com.studysync.backend.model.Users;
import com.studysync.backend.service.UsersService;

@RestController
@RequestMapping("/api/users")
public class UsersController {
	
	private final UsersService usersService;
	
	@Autowired
	public UsersController(UsersService usersService) {
		this.usersService = usersService;
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
	public ResponseEntity<Users> login(@RequestBody Users user){
		Users loginUser = usersService.login(user.getId(), user.getPw());
		return loginUser != null
				? ResponseEntity.ok(loginUser)
				: ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}
	
}
