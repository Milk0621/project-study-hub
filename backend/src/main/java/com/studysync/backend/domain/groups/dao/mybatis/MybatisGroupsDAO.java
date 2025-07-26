package com.studysync.backend.domain.groups.dao.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.groups.dao.GroupsDAO;
import com.studysync.backend.domain.groups.model.Groups;

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
	public int updateGroup(Groups groups) {
		return mapper.updateGroup(groups);
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

	
}
