package com.studysync.backend.domain.groupscrap.service;

import java.util.List;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupScrapService {
	void unScrap(String userId, Long groupId);
	void addScrap(String userId, Long groupId);
	List<Long> getScrappedGroupIds(String userId);
	List<Groups> getScrapGroupList(String userId);
}
