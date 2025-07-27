package com.studysync.backend.domain.users.service.scrap;

import java.util.List;

import com.studysync.backend.domain.users.model.Groups;

public interface GroupScrapService {
	List<Long> getScrappedGroupIds(String userId);
	List<Groups> getScrapGroupList(String userId);
}
