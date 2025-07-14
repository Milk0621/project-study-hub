package com.studysync.backend.domain.groups.dao;

import java.util.List;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupsDAO {
	// 그룹 생성
	int insertGroup(Groups groups);
	
	// 그룹 전체 조회
	List<Groups> selectAllGroups();
	
	// 그룹 단건 조회
	Groups selectOneGroups(int id);
}
