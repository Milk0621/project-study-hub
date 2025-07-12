package com.studysync.backend.domain.groups.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groups.dao.GroupsDAO;
import com.studysync.backend.domain.groups.model.Groups;

@Service
public class GroupsServiceImpl implements GroupsService{
	
	private final GroupsDAO groupsDAO;
	
	@Autowired
	public GroupsServiceImpl(GroupsDAO groupsDAO) {
		this.groupsDAO = groupsDAO;
	}

	@Override
	public int registerGroup(Groups groups) {
		return groupsDAO.insertGroup(groups);
	}
	
}
