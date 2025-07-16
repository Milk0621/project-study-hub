package com.studysync.backend.domain.groupmembers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groupmembers.dao.GroupMembersDAO;
import com.studysync.backend.domain.groupmembers.model.GroupMembers;

@Service
public class GroupMembersServiceImpl implements GroupMembersService{
	
	private final GroupMembersDAO groupMembersDAO;
	
	@Autowired
	public GroupMembersServiceImpl(GroupMembersDAO groupMembersDAO) {
		this.groupMembersDAO = groupMembersDAO;
	}

	@Override
	public int joinGroup(GroupMembers groupMembers) {
		return groupMembersDAO.insertGroupMem(groupMembers);
	}
	
}
