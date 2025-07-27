package com.studysync.backend.domain.groups;

import java.util.List;

import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groups.model.GroupMembers;
import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.domain.groups.service.GroupsService;
import com.studysync.backend.domain.groups.service.member.GroupMembersService;
import com.studysync.backend.domain.groups.service.scrap.GroupScrapService;
import com.studysync.backend.dto.GroupPageResponse;

@Service
public class GroupFacade {
	private final GroupsService groupsService;
    private final GroupScrapService groupScrapService;
    private final GroupMembersService groupMembersService;
	
    public GroupFacade(GroupsService groupsService, GroupScrapService groupScrapService, GroupMembersService groupMembersService) {
		this.groupsService = groupsService;
		this.groupScrapService = groupScrapService;
		this.groupMembersService = groupMembersService;		
	}
    
    // GroupsService
    // 그룹 생성
    public int registerGroup(Groups group) {
        return groupsService.registerGroup(group);
    }
    
    // 그룹 단건 조회
    public Groups getGroupById(int id) {
        return groupsService.getGroupById(id);
    }
    
    // 그룹 비밀번호 확인
    public boolean checkGroupPassword(Long groupId, String inputPassword) {
        return groupsService.checkGroupPassword(groupId, inputPassword);
    }
    
    // 그룹 목록
    public GroupPageResponse getGroups(String search, String category, int limit, int offset) {
        return groupsService.getGroups(search, category, limit, offset);
    }
    
	// 그룹 수 
    public int countGroups(String search, String category) {
        return groupsService.countGroups(search, category);
    }

	// 내가 속한 그룹
    public List<Groups> getMyGroups(String userId) {
        return groupsService.getMyGroups(userId);
    }

	// 조회수
    public void increaseViewCount(Long id) {
        groupsService.increaseViewCount(id);
    }
    
    // GroupScrapService
    // 즐겨찾기 추가
    public void addScrap(String userId, Long groupId) {
        groupScrapService.addScrap(userId, groupId);
    }
    
    // 즐겨찾기 삭제
    public void unScrap(String userId, Long groupId) {
        groupScrapService.unScrap(userId, groupId);
    }
    
    // GroupMembersService
    public int joinGroup(GroupMembers groupMembers) {
    	return groupMembersService.joinGroup(groupMembers);
    }
    
    public GroupMembers checkJoin(int groupId, String userId) {
    	return groupMembersService.checkJoin(groupId, userId);
    }
    
}

