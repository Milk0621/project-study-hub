package com.studysync.backend.domain.groups.dao.groups.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groups.dao.groups.GroupsDAO;
import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.dto.GroupPasswordCheckDTO;

@Repository
public class MybatisGroupsDAO implements GroupsDAO{
	
	private GroupsDAO mapper;
	
	public MybatisGroupsDAO(SqlSession sqlSession) {
		mapper = sqlSession.getMapper(GroupsDAO.class);
	}

	@Override
	public int insertGroup(Groups groups) {
		return mapper.insertGroup(groups);
	}

	@Override
	public Groups selectOneGroup(int id) {
		return mapper.selectOneGroup(id);
	}

	@Override
	public GroupPasswordCheckDTO selectGroupPasswordInfo(Long groupId) {
		return mapper.selectGroupPasswordInfo(groupId);
	}

	@Override
	public List<Groups> getGroups(String search, String category, int limit, int offset) {
		return mapper.getGroups(search, category, limit, offset);
	}

	@Override
	public int countGroups(String search, String category) {
		return mapper.countGroups(search, category);
	}
	
	@Override
	public List<Groups> selectUserGroups(String userId) {
		return mapper.selectUserGroups(userId);
	}

	@Override
	public void increaseViewCount(Long id) {
		mapper.increaseViewCount(id);
	}

	@Override
	public int updateGroup(int id, Groups updateGroup) {
		return mapper.updateGroup(id, updateGroup);
	}
	
}
