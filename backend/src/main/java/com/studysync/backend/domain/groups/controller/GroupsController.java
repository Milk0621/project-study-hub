package com.studysync.backend.domain.groups.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.groups.model.GroupMembers;
import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.domain.groups.service.GroupFacade;
import com.studysync.backend.dto.GroupPageResponse;
import com.studysync.backend.dto.GroupPasswordCheckRequest;
import com.studysync.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/groups")
public class GroupsController {

    private final JwtUtil jwtUtil;
	
    private GroupFacade groupFacade;
	
	@Autowired
	public GroupsController(GroupFacade groupFacade, JwtUtil jwtUtil) {
		this.groupFacade = groupFacade;
		this.jwtUtil = jwtUtil;
	}
	
	// 그룹 등록
	@PostMapping
	public ResponseEntity<?> registerGroup(@RequestBody Groups groups) {
		int result = groupFacade.registerGroup(groups);
		return result > 0
				? ResponseEntity.ok("그룹 생성 완료")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("그룹 생성 실패");
	}
	
	// 그룹 목록 조회
	@GetMapping
	public ResponseEntity<?> searchGroups(
			@RequestParam(required = false) String search, 
			@RequestParam(required = false) String category, 
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "5") int size
			){
		System.out.println("search: " + search + ", category: " + category + ", page: " + page + ", size: " + size);
		GroupPageResponse result = groupFacade.getGroups(search, category, page, size);
		return ResponseEntity.ok(result);
	}
	
	// 그룹 상세 조회
	@GetMapping("/{id}")
	public ResponseEntity<?> getGroupById(@PathVariable int id) {
		//@RequestParam는 쿼리 파라미터 형식에 사용
		//@PathVariable은 경로 파라미터 형식에 사용
		return ResponseEntity.ok(groupFacade.getGroupById(id));
	}
	
	// 조회수 증가
	@PutMapping("/{id}/views")
	public ResponseEntity<?> increaseViewCount(@PathVariable Long id){
		try {
			groupFacade.increaseViewCount(id);
			return ResponseEntity.ok().body("조회수 증가 완료");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회수 증가 실패");
		}
	}
	
	// 그룹 비밀번호 확인
	@PostMapping("/{id}/check-password")
	public ResponseEntity<?> checkPassword(@PathVariable Long id, @RequestBody GroupPasswordCheckRequest request) {
		boolean result = groupFacade.checkGroupPassword(request.getGroupId(), request.getPassword());
		return ResponseEntity.ok(result);
	}
	
	// 즐겨찾기 추가
	@PostMapping("/{groupId}/scrap")
    public ResponseEntity<?> addScrap(@PathVariable Long groupId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(token);

        groupFacade.addScrap(userId, groupId);
        return ResponseEntity.ok().build();
    }
	
	// 즐겨찾기 삭제
	@DeleteMapping("/{groupId}/scrap")
    public ResponseEntity<?> deleteScrap(@PathVariable Long groupId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(token);

        groupFacade.unScrap(userId, groupId);
        return ResponseEntity.ok().build();
    }
	
	// 그룹 참여
	@PostMapping("/{groupId}/join")
	public ResponseEntity<?> joinGroup(@PathVariable Long groupId, @RequestBody GroupMembers groupMembers) {
		int result = groupFacade.joinGroup(groupMembers);
		return result > 0
				? ResponseEntity.ok("그룹 참여 완료")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("그룹 참여 실패");
	}
	
	// 그룹 참여 여부
	@GetMapping("/{groupId}/is-joined")
	public ResponseEntity<?> checkJoin(@RequestParam int groupId, @RequestParam String userId){
		GroupMembers result = groupFacade.checkJoin(groupId, userId);
		if(result != null) {
			return ResponseEntity.ok("그룹 참여 되어있음");
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("그룹에 참여되어 있지 않음");
		}
	}
}
