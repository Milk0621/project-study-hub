package com.studysync.backend.domain.groupmembers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studysync.backend.domain.groupmembers.model.GroupMembers;
import com.studysync.backend.domain.groupmembers.service.GroupMembersService;

@RestController
@RequestMapping("/api/groupMembers")
public class GroupMembersController {
	
	private final GroupMembersService groupMemberService;
	
	@Autowired
	public GroupMembersController(GroupMembersService groupMemberService) {
		this.groupMemberService = groupMemberService;
	}

	@PostMapping("/join")
	public ResponseEntity<?> joinGroup(@RequestBody GroupMembers groupMembers) {
		int result = groupMemberService.joinGroup(groupMembers);
		return result > 0
				? ResponseEntity.ok("그룹 참여 완료")
				: ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("그룹 참여 실패");
	}
}
