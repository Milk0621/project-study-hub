package com.studysync.backend.domain.groupscrap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.groupscrap.service.GroupScrapService;
import com.studysync.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/groupScrap")
public class GroupScrapController {
	
	private final GroupScrapService groupScrapService;
	private final JwtUtil jwtUtil;
	
	public GroupScrapController(GroupScrapService groupScrapService, JwtUtil jwtUtil) {
		this.groupScrapService = groupScrapService;
		this.jwtUtil = jwtUtil;
	}
	
	@PostMapping("/{groupId}")
    public ResponseEntity<?> addScrap(@PathVariable Long groupId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(token);

        groupScrapService.addScrap(userId, groupId);
        return ResponseEntity.ok().build();
    }
	
	@DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteScrap(@PathVariable Long groupId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(token);

        groupScrapService.unScrap(userId, groupId);
        return ResponseEntity.ok().build();
    }
}
