package com.studysync.backend.domain.groupscrap.service;

import java.util.List;

public interface GroupScrapService {
	void unScrap(String userId, Long groupId);
	void addScrap(String userId, Long groupId);
	List<Long> getScrappedGroupIds(String userId);
}
