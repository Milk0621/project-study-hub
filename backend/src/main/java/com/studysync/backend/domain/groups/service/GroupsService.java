package com.studysync.backend.domain.groups.service;

import java.util.List;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupsService {
	// 그룹 생성
	int registerGroup(Groups groups);
	// 그룹 전체 조회
	List<Groups> getGroupList();
	// 그룹 단건 조회
	Groups getGroupById(int id);
	// 그룹 수정
	int updateGroup(Groups groups);
	// 그룹 검색
	List<Groups> searchGroups(String search, String category);
	// 내가 속한 그룹
	List<Groups> getMyGroups(String userId);
	// 조회수
	void increaseViewCount(Long id);
}
