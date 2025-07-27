package com.studysync.backend.domain.users.dao.groups.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.studysync.backend.domain.users.dao.groups.GroupsDAO;
import com.studysync.backend.domain.users.model.Groups;

@Repository("groupsDAOForUser")
public class MybatisGroupsDAO implements GroupsDAO{
	
	private GroupsDAO mapper;
	
	public MybatisGroupsDAO(SqlSession sqlSession) {
		mapper = sqlSession.getMapper(GroupsDAO.class);
	}

	@Override
	public List<Groups> selectUserGroups(String userId) {
		return mapper.selectUserGroups(userId);
	}
	
}
