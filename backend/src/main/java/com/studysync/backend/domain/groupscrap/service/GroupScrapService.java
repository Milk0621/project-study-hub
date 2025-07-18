package com.studysync.backend.domain.groupscrap.service;

public interface GroupScrapService {
	void unScrap(String userId, Long groupId);
	void addScrap(String userId, Long groupId);
}
