package com.studysync.backend.domain.users.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.users.model.Groups;
import com.studysync.backend.domain.users.model.Users;
import com.studysync.backend.domain.users.service.UserFacade;
import com.studysync.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final JwtUtil jwtUtil;
	
	private final UserFacade userFacade;
	
	@Autowired
	public UsersController(UserFacade userFacade, JwtUtil jwtUtil) {
		this.userFacade = userFacade;
		this.jwtUtil = jwtUtil;
	}

	//회원가입
	@PostMapping
	public ResponseEntity<String> register(@RequestBody Users user){
		int result = userFacade.registerUser(user);
		return result > 0
				? ResponseEntity.ok("회원가입 성공")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
	}
	
	// 닉네임 변경
	@PatchMapping("/nickname")
	public ResponseEntity<?> changeNickname(@RequestBody Map<String, String> req, HttpServletRequest request){
		String id = (String) request.getAttribute("userId");
		String nickname = req.get("nickname");
		try {
			userFacade.changeNickname(id, nickname);			
			return ResponseEntity.ok().body("닉네임 변경 성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("닉네임 변경 실패");
		}
	}
	
	//로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users user){
		Users loginUser = userFacade.login(user.getId(), user.getPw());
		
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
	
	@GetMapping("/me")
	public ResponseEntity<?> getUserInfo(HttpServletRequest request){
		String userId = (String) request.getAttribute("userId"); //필터에서 넣어준 값
		Users user = userFacade.findUserById(userId);
		return ResponseEntity.ok(user);
	}
	
	
	// 내 그룹 조회
	@GetMapping("/me/groups")
	public ResponseEntity<?> getMyGroups(@RequestParam String userId) {
		List<Groups> groups = userFacade.getMyGroups(userId);
		return ResponseEntity.ok(groups);
	}
	
	//즐겨찾기한 ID 조회
	@GetMapping("/scrapIds")
	public ResponseEntity<?> getScrappedGroupIds(HttpServletRequest request){
		String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(token);
        List<Long> scrapGroupIds = userFacade.getScrappedGroupIds(userId);
        return ResponseEntity.ok(scrapGroupIds);
	}
	
	//즐겨찾기한 그룹 조회(마이페이지)
	@GetMapping("/scrapList")
	public ResponseEntity<?> getScrapGroupList(HttpServletRequest request){
		String token = request.getHeader("Authorization").replace("Bearer ", "");
		String userId = jwtUtil.getUserIdFromToken(token);
		List<Groups> scrapGroupList = userFacade.getScrapGroupList(userId);
		return ResponseEntity.ok(scrapGroupList);
	}
	
}
