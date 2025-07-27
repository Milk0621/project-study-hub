package com.studysync.backend.domain.users.dao.scrap;

import java.util.List;

import com.studysync.backend.domain.users.model.Groups;

public interface GroupScrapDAO {
	List<Long> selectScrapIds(String userId);
	List<Groups> selectScrapList(String userId);
}
