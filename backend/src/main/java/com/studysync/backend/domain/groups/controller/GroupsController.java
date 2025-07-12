package com.studysync.backend.domain.groups.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.domain.groups.service.GroupsService;

@RestController
@RequestMapping("/api/groups")
public class GroupsController {
	
	private final GroupsService groupsService;
	
	@Autowired
	public GroupsController(GroupsService groupsService) {
		this.groupsService = groupsService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerGroup(@RequestBody Groups groups) {
		int result = groupsService.registerGroup(groups);
		return result > 0
				? ResponseEntity.ok("그룹 생성 완료")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("그룹 생성 실패");
	}
	
}
