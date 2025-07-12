package com.studysync.backend.domain.groups.dao;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupsDAO {
	// 그룹 생성
	int insertGroup(Groups groups);
}
