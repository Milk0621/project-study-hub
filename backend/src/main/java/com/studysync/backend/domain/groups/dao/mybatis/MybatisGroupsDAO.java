package com.studysync.backend.domain.groups.dao.mybatis;

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
	
}
