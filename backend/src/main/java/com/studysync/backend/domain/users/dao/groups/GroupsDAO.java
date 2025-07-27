package com.studysync.backend.domain.users.dao.groups;

import java.util.List;

import com.studysync.backend.domain.users.model.Groups;

public interface GroupsDAO {
	// 내가 속한 그룹
	List<Groups> selectUserGroups(String userId);
}