package com.studysync.backend.domain.groups.service.scrap;

import java.util.List;

import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.domain.groups.dao.scrap.GroupScrapDAO;

@Service
public class GroupScrapServiceImpl implements GroupScrapService{

	private final GroupScrapDAO groupScrapDAO;
	
	public GroupScrapServiceImpl(GroupScrapDAO groupScrapDAO) {
		this.groupScrapDAO = groupScrapDAO;
	}

	@Override
	public void unScrap(String userId, Long groupId) {
		groupScrapDAO.deleteScrap(userId, groupId);
	}

	@Override
	public void addScrap(String userId, Long groupId) {
		groupScrapDAO.addScrap(userId, groupId);
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
