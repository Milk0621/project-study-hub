package com.studysync.backend.domain.users.service.groups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studysync.backend.domain.users.dao.groups.GroupsDAO;
import com.studysync.backend.domain.users.model.Groups;

@Service("userGroupsServiceImpl")
public class GroupsServiceImpl implements GroupsService{
	
	private final GroupsDAO groupsDAO;
	
	@Autowired
	public GroupsServiceImpl(GroupsDAO groupsDAO) {
		this.groupsDAO = groupsDAO;
	}

	@Override
	public List<Groups> getMyGroups(String userId) {
		return groupsDAO.selectUserGroups(userId);
	}

}
