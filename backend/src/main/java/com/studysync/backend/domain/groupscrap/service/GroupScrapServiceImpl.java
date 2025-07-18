package com.studysync.backend.domain.groupscrap.service;

import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groupscrap.dao.GroupScrapDAO;

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
	
}
