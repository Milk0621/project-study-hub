package com.studysync.backend.domain.users.service.scrap;

import java.util.List;

import org.springframework.stereotype.Service;

import com.studysync.backend.domain.users.model.Groups;
import com.studysync.backend.domain.users.dao.scrap.GroupScrapDAO;

@Service
public class GroupScrapServiceImpl implements GroupScrapService{

	private final GroupScrapDAO groupScrapDAO;
	
	public GroupScrapServiceImpl(GroupScrapDAO groupScrapDAO) {
		this.groupScrapDAO = groupScrapDAO;
	}

	@Override
	public List<Long> getScrappedGroupIds(String userId) {
		return groupScrapDAO.selectScrapIds(userId);
	}

	@Override
	public List<Groups> getScrapGroupList(String userId) {
		return groupScrapDAO.selectScrapList(userId);
	}
	
}
