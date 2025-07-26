package com.studysync.backend.domain.groups.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studysync.backend.domain.groupmembers.dao.GroupMembersDAO;
import com.studysync.backend.domain.groupmembers.model.GroupMembers;
import com.studysync.backend.domain.groups.dao.GroupsDAO;
import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.dto.GroupPageResponse;
import com.studysync.backend.dto.GroupPasswordCheckDTO;

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
	public Groups getGroupById(int id) {
		return groupsDAO.selectOneGroup(id);
	}

	@Override
	public int updateGroup(Groups groups) {
		return groupsDAO.updateGroup(groups);
	}

	@Override
	public boolean checkGroupPassword(Long groupId, String inputPassword) {
		GroupPasswordCheckDTO group = groupsDAO.selectGroupPasswordInfo(groupId);
		if (group == null) return false;
		
		if (group.getIsPrivate() == 0) return true;	// 공개 그룹은 통과
		return inputPassword.equals(group.getPassword()); // 비밀번호 비교
	}
	
	@Override
	public GroupPageResponse getGroups(String search, String category, int page, int size) {
		int offset = (page - 1) * size;
		List<Groups> groups = groupsDAO.getGroups(search, category, size, offset);
		int totalCount = groupsDAO.countGroups(search, category);
		int totalPages = (int) Math.ceil((double)totalCount/size);
		return new GroupPageResponse(groups, totalPages, page);
	}

	@Override
	public int countGroups(String search, String category) {
		return groupsDAO.countGroups(search, category);
	}
	
	@Override
	public List<Groups> getMyGroups(String userId) {
		return groupsDAO.selectUserGroups(userId);
	}

	@Override
	public void increaseViewCount(Long id) {
		groupsDAO.increaseViewCount(id);
	}

	
}
