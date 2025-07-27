package com.studysync.backend.domain.groups.service.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.groups.dao.member.GroupMembersDAO;
import com.studysync.backend.domain.groups.model.GroupMembers;

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

	@Override
	public GroupMembers checkJoin(int groupId, String userId) {
		return groupMembersDAO.selectGroupMemOne(groupId, userId);
	}
	
}
