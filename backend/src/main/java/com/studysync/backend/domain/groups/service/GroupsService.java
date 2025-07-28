package com.studysync.backend.domain.groups.service;

import java.util.List;

import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.dto.GroupPageResponse;

public interface GroupsService {
	// 그룹 생성
	int registerGroup(Groups groups);
	// 그룹 단건 조회
	Groups getGroupById(int id);
	// 그룹 비밀번호 확인
	boolean checkGroupPassword(Long groupId, String inputPassword);
	// 그룹 목록
	GroupPageResponse getGroups(String search, String category, int limit, int offset);
	// 그룹 수 
	int countGroups(String search, String category);
	// 내가 속한 그룹
	List<Groups> getMyGroups(String userId);
	// 조회수
	void increaseViewCount(Long id);
	// 글 수정
	int updateGroup(int id, Groups updateGroup);
}
