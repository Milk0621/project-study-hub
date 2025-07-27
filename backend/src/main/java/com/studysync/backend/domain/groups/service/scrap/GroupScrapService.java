package com.studysync.backend.domain.groups.service.scrap;

public interface GroupScrapService {
	void unScrap(String userId, Long groupId);
	void addScrap(String userId, Long groupId);
}
