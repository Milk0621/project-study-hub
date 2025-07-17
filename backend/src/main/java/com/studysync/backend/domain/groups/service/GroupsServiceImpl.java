package com.studysync.backend.domain.groups.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studysync.backend.domain.groupmembers.dao.GroupMembersDAO;
import com.studysync.backend.domain.groupmembers.model.GroupMembers;
import com.studysync.backend.domain.groups.dao.GroupsDAO;
import com.studysync.backend.domain.groups.model.Groups;

@Service
public class GroupsServiceImpl implements GroupsService{
	
	private final GroupsDAO groupsDAO;
	private final GroupMembersDAO groupMembersDAO;
	
	@Autowired
	public GroupsServiceImpl(GroupsDAO groupsDAO, GroupMembersDAO groupMembersDAO) {
		this.groupsDAO = groupsDAO;
		this.groupMembersDAO = groupMembersDAO;
	}

	@Transactional
	@Override
	public int registerGroup(Groups groups) {
		int result = groupsDAO.insertGroup(groups);
		if(result > 0) {
			System.out.println("group id: " + groups.getId());
			System.out.println("group creator: " + groups.getCreateUser());
			GroupMembers gm = new GroupMembers(groups.getId(), groups.getCreateUser());
			groupMembersDAO.insertGroupMem(gm);
		}
		return result;
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
	public List<Groups> searchGroups(String search, String category) {
		return groupsDAO.searchGroups(search, category);
	}

	@Override
	public List<Groups> getMyGroups(String userId) {
		return groupsDAO.selectUserGroups(userId);
	}
	
}
