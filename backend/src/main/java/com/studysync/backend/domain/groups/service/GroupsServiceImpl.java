package com.studysync.backend.domain.groups.service;

import java.util.List;

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

	@Override
	public List<Groups> getGroupList() {
		return groupsDAO.selectAllGroups();
	}

	@Override
	public Groups getGroupById(int id) {
		return groupsDAO.selectOneGroup(id);
	}

	@Override
	public int updateGroup(Groups groups) {
		return groupsDAO.updateGroup(groups);
	}

	@Override
	public List<Groups> getMyGroupListById(String id) {
		return groupsDAO.selectMyGroups(id);
	}

	@Override
	public List<Groups> searchGroups(String search, String category) {
		return groupsDAO.searchGroups(search, category);
	}
	
}
