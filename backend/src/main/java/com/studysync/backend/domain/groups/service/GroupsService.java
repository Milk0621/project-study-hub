package com.studysync.backend.domain.groups.service;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupsService {
	//그룹 생성
	int registerGroup(Groups groups);
	
}
