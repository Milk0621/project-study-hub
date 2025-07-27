package com.studysync.backend.domain.users.service.groups;

import java.util.List;

import com.studysync.backend.domain.users.model.Groups;

public interface GroupsService {
	// 내가 속한 그룹
	List<Groups> getMyGroups(String userId);
}
